import api from '../api'
import type { AuthRequest, Token } from '../types/user'

const standardHandleError = (error: unknown) => {
    console.error(error)
}

export const postAuthTelegram = async (
    request: AuthRequest,
    handleError = standardHandleError,
): Promise<Token | undefined> => {
    try {
        const response = await api.post('/auth', request)

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        handleError(error)

        return undefined
    }
}
