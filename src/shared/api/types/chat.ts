import type { Base } from './base'

export interface CreateChatInput {
    chat_id: string // required
    send: boolean
}

export interface UpdateChatInput {
    send: boolean
}

export interface Chat extends Base {
    chat_id: string
    send: boolean
}
