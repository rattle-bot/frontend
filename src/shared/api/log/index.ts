import api from '../api'
import type { CreateLogInput, Log, UpdateLogInput } from '../types/log'

export const createLog = async (
    input: CreateLogInput,
): Promise<Log | undefined> => {
    try {
        const response = await api.post('/log/new', input)

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const listLogs = async (): Promise<Log[] | undefined> => {
    try {
        const response = await api.get('/log/list')

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const updateLog = async (
    id: number,
    input: UpdateLogInput,
): Promise<Log | undefined> => {
    try {
        const response = await api.patch(`/log/${id}`, input)

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const deleteLog = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/log/${id}`)

        return true
    } catch (error) {
        console.error(error)

        return false
    }
}
