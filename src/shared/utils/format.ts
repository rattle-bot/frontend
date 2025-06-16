import type { EventType } from '../api/types/log'

export const eventEmoji = (eventType: EventType): string => {
    switch (eventType) {
        case 'error':
            return '❌'
        case 'warning':
            return '⚠️'
        case 'success':
            return '✅'
        case 'info':
            return 'ℹ️'
        case 'critical':
            return '🚨'
        default:
            return '📦'
    }
}
