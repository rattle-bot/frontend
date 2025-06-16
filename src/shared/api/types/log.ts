import type { Base } from './base'

export type MatchType = 'include' | 'exclude'
export type EventType = 'error' | 'info' | 'warning' | 'success' | 'critical'

export interface CreateLogInput {
    pattern: string // required, min: 1
    match_type: MatchType // required
    event_type: EventType // required
}

export interface UpdateLogInput {
    pattern?: string // optional, min: 1 if provided
    match_type?: MatchType // optional
    event_type?: EventType // optional
}

export interface Log extends Base {
    pattern: string
    match_type: MatchType
    event_type: EventType
}
