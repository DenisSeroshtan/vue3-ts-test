import {mount} from '@vue/test-utils'
import Home from "./Home.vue"
import flushPromises from "flush-promises";
import * as dataMock from './mocks'
import {createStore} from "./store";

jest.mock('axios', () => ({
    get: (url: string) => ({
        data: [dataMock.todayPost, dataMock.thisWeek, dataMock.thisMonth]
    })
}))

describe('Timeline', () => {
    let wrapper;

    const createComponent = () => {
        wrapper = mount(Home, {
            global: {
                provide: {
                    store: createStore()
                }
            }
        })
    }

    afterEach(() => {
        wrapper = null
    })

    it('render 3 timeline', () => {
        createComponent()
        const progress = wrapper.find('[data-test="progress"]')

        expect(progress.exists()).toBe(true)
    })

    it('render 3 timeline', async () => {
        createComponent()
        await flushPromises()
        const links = wrapper.findAll('[data-test="period"]')

        expect(links).toHaveLength(3)
    })

    it('updated period when click', async () => {
        createComponent()
        await flushPromises()
        const $today = wrapper.findAll('[data-test="period"]')[0]
        expect($today.classes()).toContain('is-active')

        const $week = wrapper.findAll('[data-test="period"]')[1]
        await $week.trigger('click')

        expect($week.classes()).toContain('is-active')
        expect($today.classes()).not.toContain('is-active')

        const $month = wrapper.findAll('[data-test="period"]')[2]
        await $month.trigger('click')

        expect($month.classes()).toContain('is-active')
        expect($week.classes()).not.toContain('is-active')
    })

    it('renders today post by default', async () => {
        createComponent()
        await flushPromises()

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(1)

        const $week = wrapper.findAll('[data-test="period"]')[1]
        await $week.trigger('click')

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(2)

        const $month = wrapper.findAll('[data-test="period"]')[2]
        await $month.trigger('click')

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(3)
    })
})
