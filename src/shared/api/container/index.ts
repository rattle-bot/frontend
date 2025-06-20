import api from '../api'
import type { Container, RunningContainer, SaveContainerInput } from '../types/container'

export const createContainer = async (
    input: SaveContainerInput,
): Promise<Container | undefined> => {
    try {
        const response = await api.post('/container/new', input)

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const listContainers = async (): Promise<Container[] | undefined> => {
    try {
        const response = await api.get('/container/list')

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const listRunningContainers = async (): Promise<RunningContainer[] | undefined> => {
    try {
        const response = await api.get('/container/list-running')

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const updateContainer = async (
    id: number,
    input: SaveContainerInput,
): Promise<Container | undefined> => {
    try {
        const response = await api.patch(`/container/${id}`, input)

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const deleteContainer = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/container/${id}`)

        return true
    } catch (error) {
        console.error(error)

        return false
    }
}
