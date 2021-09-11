import {Post} from "./types";
import moment from 'moment'
import {initialState, State, createStore} from "./store";

export const mockPost: Post = {
    id: 1,
    title: 'Base Post',
    markdown: 'Content',
    html: '<p>Content</p>',
    authorId: 1,
    created: moment()
}

jest.mock('axios', () => ({
    get: () => {
        return {
            data: [mockPost]
        }
    }
}))


describe('fetchPost', () => {
    it('fetched post and updated the store', async () => {
        const expected: State = {
            ...initialState(),
            posts: {
                ...initialState().posts,
                all: {
                    1: mockPost
                },
                ids: ['1'],
                loaded: true
            }
        }

        const store = createStore()
        await store.fetchPosts()

        expect(store.getState()).toEqual(expected)
    })
})
