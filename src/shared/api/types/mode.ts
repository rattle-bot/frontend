import type { Base } from './base'

export type ModeValue = 'blacklist' | 'whitelist'

export interface Mode extends Base {
    value: ModeValue
}
