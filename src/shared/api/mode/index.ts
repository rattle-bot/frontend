import api from '../api'
import type { Mode, ModeValue } from '../types/mode'

export const getMode = async (): Promise<Mode | undefined> => {
    try {
        const response = await api.get('/mode')

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const updateMode = async (payload: {
    value: ModeValue
}): Promise<Mode | undefined> => {
    try {
        const response = await api.patch('/mode', payload)

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}
