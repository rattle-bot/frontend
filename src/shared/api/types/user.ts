import type { Base } from './base'

export type Role = 'admin' | 'user'

export interface User extends Base {
    telegram_id: string
    username: string
    first_name: string
    role: Role
    active: boolean
}

export interface Token {
    access_token: string
}

export interface AuthRequest {
    check_data_string: string
    hash: string
}

export interface CreateUserInput {
    telegram_id: string
    role: Role
}
