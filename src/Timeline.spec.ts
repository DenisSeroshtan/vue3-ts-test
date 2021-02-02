import {mount} from '@vue/test-utils'
import Timeline from "./Timeline.vue"

describe('Timeline', () => {

    it('render 3 timeline', () => {
        const wrapper = mount(Timeline)
        const links = wrapper.findAll('[data-test="period"]')

        expect(links).toHaveLength(3)
    })

    it('updated period when click', async () => {
        const wrapper = mount(Timeline)

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
        const wrapper = mount(Timeline)

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(1)

        const $week = wrapper.findAll('[data-test="period"]')[1]
        await $week.trigger('click')

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(2)

        const $month = wrapper.findAll('[data-test="period"]')[2]
        await $month.trigger('click')

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(3)
    })
})
