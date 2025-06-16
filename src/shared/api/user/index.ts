import api from '../api'
import type { CreateUserInput, User } from '../types/user'

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

export const createUser = async (
    input: CreateUserInput,
): Promise<User | undefined> => {
    try {
        const response = await api.post('/user/new', input)

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const listUsers = async (): Promise<User[] | undefined> => {
    try {
        const response = await api.get('/user/list')

        const answer = response.data
        const data = answer.data

        return data
    } catch (error) {
        console.error(error)

        return undefined
    }
}

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`/user/${id}`)

        return true
    } catch (error) {
        console.error(error)

        return false
    }
}
