import { defineStore } from 'pinia'
import type {
    Chat,
    CreateChatInput,
    UpdateChatInput,
} from '../shared/api/types/chat'
import {
    createChat,
    listChats,
    updateChat as apiUpdateChat,
    deleteChat as apiDeleteChat,
} from '../shared/api/chat'

export const useChatStore = defineStore('chat', {
    state: () => ({
        chats: [] as Chat[],
        isLoading: false,
        updatingMap: {} as Record<number, boolean>,
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

        async updateChat(
            id: number,
            input: UpdateChatInput,
        ): Promise<Chat | undefined> {
            if (this.updatingMap[id]) return // если уже обновляется

            this.updatingMap[id] = true

            try {
                const updated = await apiUpdateChat(id, input)

                if (updated) {
                    this.chats = this.chats.map((chat) =>
                        chat.ID === id ? updated : chat,
                    )
                }

                return updated
            } catch (error) {
                console.error('Failed to update chat:', error)
                return undefined
            } finally {
                this.updatingMap[id] = false
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
