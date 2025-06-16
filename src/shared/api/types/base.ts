export interface Base {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string | null
}

export interface Res<T> {
    message: string
    data?: T
}
