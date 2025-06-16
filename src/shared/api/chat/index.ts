import api from '../api'
import type { Chat, CreateChatInput, UpdateChatInput } from '../types/chat'

export const createChat = async (
    input: CreateChatInput,
): Promise<Chat | undefined> => {
    try {
        const response = await api.post('/chat/new', input)

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const listChats = async (): Promise<Chat[] | undefined> => {
    try {
        const response = await api.get('/chat/list')

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const updateChat = async (
    id: number,
    input: UpdateChatInput,
): Promise<Chat | undefined> => {
    try {
        const response = await api.patch(`/chat/${id}`, input)

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const deleteChat = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/chat/${id}`)

        return true
    } catch (error) {
        console.error(error)

        return false
    }
}
