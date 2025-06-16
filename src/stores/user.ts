import { defineStore } from 'pinia'
import type { User } from '../shared/api/types/user'
import { getUser } from '../shared/api/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        isTokenRefreshingPending: false,
        axiosRequestsQueue: [] as ((token: string) => void)[],
    }),
    actions: {
        async setUser() {
            const resultUser = await getUser()

            if (resultUser) this.user = resultUser
        },
        clearUser() {
            this.user = null
        },
        pendTokenRefreshing(value: boolean) {
            this.isTokenRefreshingPending = value
        },
        addRequestToQueue(cb: (token: string) => void) {
            this.axiosRequestsQueue.push(cb)
        },
        releaseAxiosRequestsQueue(token: string) {
            while (this.axiosRequestsQueue.length) {
                this.axiosRequestsQueue.pop()!(token)
            }
        },
    },
})
