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
    title: 'Сегодня',
}

export const thisWeek: Post = {
    ...basePost,
    title: 'Неделя',
    created: moment().subtract(2, 'days')
}


export const thisMonth: Post = {
    ...basePost,
    title: 'Месяц',
    created: moment().subtract(2, 'weeks')
}
