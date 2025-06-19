import type {
    AxiosInstance,
    AxiosRequestHeaders,
    InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import { deleteCookie, getAuthToken, setAuthToken } from '../utils/cookies'
import { decodeJwtToken } from '../utils/token'
import { useUserStore } from '../../stores/user'
import { getHashCheckDataString } from '../utils/telegram'
import WebApp from '@twa-dev/sdk'

const setAuthorizationHeaders = (
    config: InternalAxiosRequestConfig,
    access_token: string,
) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${access_token}`
    } else {
        config.headers = {
            Authorization: `Bearer ${access_token}`,
        } as AxiosRequestHeaders
    }
}

const baseURL = (window as any).__RATTLE_CONFIG__?.VITE_PUBLIC_API_HOST || ''

const configureAxiosInstance = () => {
    const instance: AxiosInstance = axios.create({
        baseURL: baseURL,
    })

    instance.interceptors.request.use(
        async (
            config: InternalAxiosRequestConfig,
        ): Promise<InternalAxiosRequestConfig> => {
            const { access_token } = getAuthToken()

            if (!access_token || access_token == 'undefined') return config

            const { exp } = decodeJwtToken(access_token)

            const currentTime = Math.floor(Date.now() / 1000)

            // More than 5 sec
            if (exp > currentTime + 5) {
                setAuthorizationHeaders(config, access_token)
                return config
            }

            const userStore = useUserStore()

            if (userStore.isTokenRefreshingPending) {
                return new Promise<InternalAxiosRequestConfig>((resolve) => {
                    userStore.addRequestToQueue((token: string) => {
                        setAuthorizationHeaders(config, token)
                        resolve(config)
                    })
                })
            } else {
                userStore.pendTokenRefreshing(true)

                try {
                    const { hash, checkDataString } = getHashCheckDataString(
                        WebApp.initData,
                    )
                    const response = await fetch(
                        `${instance.defaults.baseURL}/auth`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                hash,
                                check_data_string: checkDataString,
                            }),
                        },
                    )

                    const { data } = await response.json()

                    setAuthToken(data)

                    const refreshed_access_token = data.access_token
                    setAuthorizationHeaders(config, refreshed_access_token)
                    userStore.releaseAxiosRequestsQueue(refreshed_access_token)
                } catch (error) {
                    return Promise.reject(error)
                } finally {
                    userStore.pendTokenRefreshing(false)
                    return config
                }
            }
        },
        (error) => Promise.reject(error),
    )

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config
            const userStore = useUserStore()

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true // Prevent infinite loops

                try {
                    userStore.pendTokenRefreshing(true)

                    const { hash, checkDataString } = getHashCheckDataString(
                        WebApp.initData,
                    )
                    const response = await fetch(
                        `${instance.defaults.baseURL}/auth`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                hash,
                                check_data_string: checkDataString,
                            }),
                        },
                    )

                    const { data } = await response.json()

                    setAuthToken(data)
                    setAuthorizationHeaders(originalRequest, data.access_token)
                    userStore.releaseAxiosRequestsQueue(data.access_token)

                    return instance(originalRequest) // Retry original request
                } catch (refreshError) {
                    deleteCookie('access_token')
                    return Promise.reject(refreshError)
                } finally {
                    userStore.pendTokenRefreshing(false)
                }
            }

            return Promise.reject(error)
        },
    )

    return instance
}

export default configureAxiosInstance()
