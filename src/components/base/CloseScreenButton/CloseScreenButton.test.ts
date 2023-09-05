import { describe, it, expect} from 'vitest'
import { mount } from '@vue/test-utils'
import CloseScreenButton from './CloseScreenButton.vue'

describe('CloseScreenButton.vue', () => {
  it('should match snapshot', () => {
    const wrapper = mount(CloseScreenButton)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
