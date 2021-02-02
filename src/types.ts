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
