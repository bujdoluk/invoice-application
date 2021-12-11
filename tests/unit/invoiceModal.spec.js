import { shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'

describe('HelloWorld.vue', () => {
    it('renders new invoice modal', () => {
        const wrapper = shallowMount(Home, {
            props: { msg }
        })
        expect(wrapper.text()).toMatch(msg)
    })
})

