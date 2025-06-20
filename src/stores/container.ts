import { defineStore } from 'pinia'
import type {
    Container,
    RunningContainer,
    SaveContainerInput,
} from '../shared/api/types/container'
import {
    createContainer,
    deleteContainer as apiDeleteContainer,
    listContainers,
    listRunningContainers,
} from '../shared/api/container'

export const useContainerStore = defineStore('container', {
    state: () => ({
        containers: [] as Container[],
        isLoading: false,
    }),

    actions: {
        async fetchContainers() {
            this.isLoading = true

            try {
                const result = await listContainers()

                if (result) {
                    this.containers = result
                }
            } catch (error) {
                console.error('Failed to fetch containers:', error)
            } finally {
                this.isLoading = false
            }
        },

        async addContainer(
            input: SaveContainerInput,
        ): Promise<Container | undefined> {
            try {
                const newContainer = await createContainer(input)

                if (newContainer) {
                    this.containers.unshift(newContainer) // Add to begin
                }

                return newContainer
            } catch (error) {
                console.error('Failed to create container:', error)

                return undefined
            }
        },

        async deleteContainer(id: number) {
            try {
                await apiDeleteContainer(id)
                this.containers = this.containers.filter(
                    (container) => container.ID !== id,
                )
            } catch (error) {
                console.error('Failed to delete container:', error)
            }
        },
    },
})

export const useRunningContainerStore = defineStore('runningContainers', {
    state: () => ({
        containers: [] as RunningContainer[],
        isLoading: false,
    }),

    actions: {
        async fetchRunningContainers() {
            this.isLoading = true
            try {
                const result = await listRunningContainers()
                if (result) {
                    this.containers = result
                }
            } catch (error) {
                console.error('Failed to fetch running containers:', error)
            } finally {
                this.isLoading = false
            }
        },
    },
})
