import {describe, it, expect, beforeAll } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ScreenChangelog from './ScreenChangelog.vue'
import CloseScreenButton from '../../base/CloseScreenButton/CloseScreenButton.vue'
// import { setupServer } from 'msw/node'
// import { handlers } from '@/mocks/handlers'

// const server = setupServer(...handlers)

const changelogEndpoints = JSON.stringify({
  getChangelogs: 'https://stage.monitoring360.io/changelog/last',
  postChangelog: 'https://stage.monitoring360.io/changelog/read/'
})

describe('ScreenChangelog.vue', () => {
  let wrapper : any

  beforeAll(() => {
    wrapper = shallowMount(ScreenChangelog, {
      props: {
        title: 'Hello again',
        changelogUrl: 'https://google.de',
        changelogEndpoints: changelogEndpoints
      }
    })
  })

  it('testing title', () => {
    expect(wrapper.html()).toContain('<div class="font-medium text-2xl">Hello again')
  })

  it('changelog page url available', () => {
    expect(wrapper.html()).toContain('href="https://google.de"')
  })

  it('can be closed', () => {
    const closeButton = wrapper.findComponent(CloseScreenButton)
    expect(closeButton.exists()).toBe(true)
    expect(closeButton.trigger('click').then(()=> {
      expect(wrapper.emitted()).toHaveProperty('closeScreen')
    }))
  })
})
