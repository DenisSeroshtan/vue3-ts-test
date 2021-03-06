import {Post} from "./types";
import moment from 'moment'

export const basePost: Post = {
    id: 1,
    title: 'Base Post',
    markdown: 'Content',
    html: '<p>Content</p>',
    authorId: 1,
    created: moment()
}

export const todayPost: Post = {
    ...basePost,
    id: 1,
    title: 'Сегодня',
}

export const thisWeek: Post = {
    ...basePost,
    id: 2,
    title: 'Неделя',
    created: moment().subtract(2, 'days')
}


export const thisMonth: Post = {
    ...basePost,
    id: 3,
    title: 'Месяц',
    created: moment().subtract(2, 'weeks')
}
