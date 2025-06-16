import { defineStore } from 'pinia'
import type { Chat, CreateChatInput } from '../shared/api/types/chat'
import {
    createChat,
    listChats,
    deleteChat as apiDeleteChat,
} from '../shared/api/chat'

export const useChatStore = defineStore('chat', {
    state: () => ({
        chats: [] as Chat[],
        isLoading: false,
    }),

    actions: {
        async fetchChats() {
            this.isLoading = true

            try {
                const result = await listChats()
                if (result) {
                    this.chats = result
                }
            } catch (error) {
                console.error('Failed to fetch chats:', error)
            } finally {
                this.isLoading = false
            }
        },

        async addChat(input: CreateChatInput): Promise<Chat | undefined> {
            try {
                const newChat = await createChat(input)

                if (newChat) {
                    this.chats.unshift(newChat)
                }

                return newChat
            } catch (error) {
                console.error('Failed to create chat:', error)

                return undefined
            }
        },

        async deleteChat(id: number) {
            try {
                await apiDeleteChat(id)
                this.chats = this.chats.filter((chat) => chat.ID !== id)
            } catch (error) {
                console.error('Failed to delete chat:', error)
            }
        },
    },
})
