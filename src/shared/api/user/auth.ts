import api from '../api'
import type { AuthRequest, Token } from '../types/user'

export const postAuthTelegram = async (
    request: AuthRequest,
): Promise<Token | undefined> => {
    try {
        const response = await api.post('/auth', request)

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}
