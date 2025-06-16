import api from '../api'
import type { User } from '../types/user'

export const getUser = async (): Promise<User | undefined> => {
    try {
        const response = await api.get('/user')

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}
