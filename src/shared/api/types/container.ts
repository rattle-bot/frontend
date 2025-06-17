import type { Base } from './base'

export type ContainerType = 'name' | 'image' | 'id' | 'label'

export interface SaveContainerInput {
    type: ContainerType // required
    value: string // required, min: 1
}
export interface Container extends Base {
    type: ContainerType
    value: string
}
