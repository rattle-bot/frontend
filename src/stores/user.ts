import { defineStore } from 'pinia'
import type { CreateUserInput, User } from '../shared/api/types/user'
import {
    createUser,
    deleteUser as apiDeleteUser,
    getUser,
    listUsers,
} from '../shared/api/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        isTokenRefreshingPending: false,
        axiosRequestsQueue: [] as ((token: string) => void)[],

        users: [] as User[],
        isLoading: false,
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

        async fetchUsers() {
            this.isLoading = true

            try {
                const result = await listUsers()

                if (result) {
                    this.users = result
                }
            } catch (error) {
                console.error('Failed to fetch users:', error)
            } finally {
                this.isLoading = false
            }
        },

        async addUser(input: CreateUserInput): Promise<User | undefined> {
            try {
                const newUser = await createUser(input)

                if (newUser) {
                    this.users.unshift(newUser) // Add to begin
                }

                return newUser
            } catch (error) {
                console.error('Failed to create user:', error)

                return undefined
            }
        },

        async deleteUser(id: number) {
            try {
                await apiDeleteUser(id)
                this.users = this.users.filter((user) => user.ID !== id)
            } catch (error) {
                console.error('Failed to delete user:', error)
            }
        },
    },
})
