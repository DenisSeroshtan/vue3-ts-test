import {mount} from '@vue/test-utils'
import ShowPost from "./ShowPost.vue"
import flushPromises from "flush-promises";
import * as dataMock from './mocks'
import {createStore, initialState} from "./store";
import {makeRouter} from "./router";

jest.mock('axios', () => ({
    get: (url: string) => ({
        data: [dataMock.todayPost, dataMock.thisWeek, dataMock.thisMonth]
    })
}))

describe('ShowPost', () => {


    it('does not render an edit when no users is logged in', async () => {
        const router = makeRouter();
        const store = createStore();
        router.push('/posts/1')
        await router.isReady()

        const wrapper = mount(ShowPost, {
            global: {
                provide: {
                    store,
                },
                plugins: [router]
            }
        })

        await flushPromises()
        expect(wrapper.find('[data-test="can-edit"').exists()).toBe(false)
    })

    it('does not render an edit link when not authorized', async () => {
        const router = makeRouter();
        const store = createStore({
            ...initialState(),
            authors: {
                ...initialState().authors,
                currentUserId: '2'
            }
        });
        router.push('/posts/1')
        await router.isReady()

        const wrapper = mount(ShowPost, {
            global: {
                provide: {
                    store,
                },
                plugins: [router]
            }
        })

        await flushPromises()
        expect(wrapper.find('[data-test="can-edit"').exists()).toBe(false)
    })

    it('does not render an edit link when authorized', async () => {
        const router = makeRouter();
        const store = createStore({
            ...initialState(),
            authors: {
                ...initialState().authors,
                currentUserId: '1'
            }
        });
        router.push('/posts/1')
        await router.isReady()

        const wrapper = mount(ShowPost, {
            global: {
                provide: {
                    store,
                },
                plugins: [router]
            }
        })

        await flushPromises()
        expect(wrapper.find('[data-test="can-edit"').exists()).toBe(true)
    })

})
