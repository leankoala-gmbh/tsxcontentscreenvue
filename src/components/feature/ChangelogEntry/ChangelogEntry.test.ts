import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChangelogEntry from './ChangelogEntry.vue'
import changeLogsResponse from '../../../mockData/changelog.mock.json'

describe('ChangelogEntry.vue', () => {
  it('should match snapshot', () => {
    const wrapper = mount(ChangelogEntry, {
      props: {
        entry: changeLogsResponse[0]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
