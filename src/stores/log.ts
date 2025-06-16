import { defineStore } from 'pinia'
import type { CreateLogInput, Log } from '../shared/api/types/log'
import {
    createLog,
    listLogs,
    deleteLog as apiDeleteLog,
} from '../shared/api/log'

export const useLogStore = defineStore('log', {
    state: () => ({
        logs: [] as Log[],
        isLoading: false,
    }),

    actions: {
        async fetchLogs() {
            this.isLoading = true

            try {
                const result = await listLogs()

                if (result) {
                    this.logs = result
                }
            } catch (error) {
                console.error('Failed to fetch logs:', error)
            } finally {
                this.isLoading = false
            }
        },

        async addLog(input: CreateLogInput): Promise<Log | undefined> {
            try {
                const newLog = await createLog(input)

                if (newLog) {
                    this.logs.unshift(newLog) // Add to begin
                }

                return newLog
            } catch (error) {
                console.error('Failed to create log:', error)

                return undefined
            }
        },

        async deleteLog(id: number) {
            try {
                await apiDeleteLog(id)
                this.logs = this.logs.filter((log) => log.ID !== id)
            } catch (error) {
                console.error('Failed to delete log:', error)
            }
        },
    },
})
