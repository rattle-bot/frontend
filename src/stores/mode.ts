import { defineStore } from 'pinia'
import type { Mode, ModeValue } from '../shared/api/types/mode'
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

        async updateMode(value: ModeValue) {
            try {
                const result = await apiUpdateMode({ value })
                if (result) {
                    this.mode = result
                }
            } catch (error) {
                console.error('Failed to update mode:', error)
            }
        },
    },
})
