import type { Base } from './base'
import type { ModeValue } from './mode'

export type ContainerType = 'name' | 'image' | 'id' | 'label'

export interface SaveContainerInput {
    type: ContainerType // required
    value: string // required, min: 1
    mode: ModeValue // required
}

export interface Container extends Base {
    type: ContainerType
    value: string
    mode: ModeValue
}

export interface RunningContainer {
    id: string
    name: string
    image: string
    labels: Record<string, string>
    short_id: string
}
