import { defineStore } from 'pinia'
import type { Mode } from '../shared/api/types/mode'
import { getMode, updateMode as apiUpdateMode } from '../shared/api/mode'

export const useModeStore = defineStore('mode', {
    state: () => ({
        mode: undefined as Mode | undefined,
        isLoading: false,
    }),

    actions: {
        async fetchMode() {
            this.isLoading = true
            try {
                const result = await getMode()
                if (result) {
                    this.mode = result
                }
            } catch (error) {
                console.error('Failed to fetch mode:', error)
            } finally {
                this.isLoading = false
            }
        },

        async updateMode() {
            try {
                const result = await apiUpdateMode()
                if (result) {
                    this.mode = result
                }
            } catch (error) {
                console.error('Failed to update mode:', error)
            }
        },
    },
})
