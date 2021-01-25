import {mount} from '@vue/test-utils'
import Timeline from "./Timeline.vue"

describe('Timeline', () => {
    it('render 3 timeline', () => {
        const wrapper = mount(Timeline)
        const links = wrapper.findAll('a')

        expect(links).toHaveLength(3)
    })
})
