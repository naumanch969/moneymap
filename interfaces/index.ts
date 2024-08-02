export interface TokenCache {
    getToken: (key: string) => Promise<string | undefined | null>
    saveToken: (key: string, token: string) => Promise<void>
    clearToken?: (key: string) => void
}

export interface Category {
    id?: string,
    name: string,
    created_by: string,
    color: string,
    icon: string,
    budget: number,

    CategoryItem?: any
}

export interface CategoryItem {
    id?: string,
    name: string,
    url: string,
    image?: string,
    cost: number,
    note: string,
    category_id: string,
    created_at: Date,

}