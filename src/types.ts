import {Moment} from 'moment'

export type Period = 'сегодня'|'на этой неделе'|'в этот месяц'

export interface Post {
    id: number
    title: string
    markdown: string
    html: string
    authorId: number
    created: Moment
}

export interface User {
    id: number | string
    username: string
    password: string
}
export interface Author {
    id: number | string
    username: string
    currentUser?: string
}
