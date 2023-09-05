<script lang="ts" setup>
import { IContentConfig, TScreenTypes } from '@/types/general'
import {debugEcho}  from '~/composables/debugTools'
import mitt from 'mitt'

const props = defineProps({
  debug: {
    type: Boolean,
    default: false
  }
})

const guide = ref(null)
const isOpenGuide = ref(false)
const isActiveBackground = ref(false)
const contentId = ref('')
const contentUrl = ref('')
const language = ref('en')
const title = ref<string|undefined>('')
const label = ref<string|undefined>('')
const type = ref<TScreenTypes>('content')
const iframeButtonLabel = ref<string>('')
const brandType = ref<string|undefined>('')
const iframeUrl = ref<string>('')
const changelogUrl = ref<string>('')
const changelogEndpoints = ref<string>('')
const partnerShopUrl = ref<string|undefined>('')
const isPartner = ref(false)
const brandName = ref('360 Monitoring')

window.mitt = window.mitt || mitt()
const body = document.querySelector('body')

const { setLanguage } = useTranslator()

const openScreen = () => {
  body!.style.overflow = 'hidden'
  isActiveBackground.value = true
  setTimeout(() => {
    isOpenGuide.value = true
  }, 300)
}

const closeEvent = () => {
  const screenType = ['advisor', 'koality'].includes(type.value) ? 'advisor' : type.value
  debugEcho('contentURL', contentUrl.value)
  debugEcho('iframeURL', iframeUrl.value)
  const isCbIframe = contentUrl.value && (contentUrl.value.includes('store.plesk.com')|| iframeUrl.value.includes('store.plesk.com'))
  debugEcho('isCbIframe', isCbIframe)
  if (isCbIframe){
    window.mitt.emit('tsxContentScreenEvents', {
      action: 'closeStoreIframe',
      screen: screenType
    })
    return
  }
  window.mitt.emit('tsxContentScreenEvents', {
    action: 'closeScreen',
    screen: screenType
  })
}




const closeScreen = () => {
  isOpenGuide.value = false
  closeEvent()
  setTimeout(() => {
    isActiveBackground.value = false
    body!.style.overflow = ''
    contentId.value = ''
    contentUrl.value = ''
    title.value = ''
    label.value = ''
    language.value = 'en'
    type.value = 'advisor'
    partnerShopUrl.value = ''
    iframeButtonLabel.value = ''
    iframeUrl.value = ''
    changelogUrl.value = ''
    changelogEndpoints.value = ''
    brandType.value = ''
    isPartner.value = false
    brandName.value = '360 Monitoring'
  }, 300)
}

window.mitt.on('tsxContentScreenConfig', (payload: IContentConfig) => {
  debugEcho('payload', payload)
  contentUrl.value = payload.contentUrl || ''
  contentId.value = payload.contentId || ''
  language.value = payload.language || 'en'
  type.value = payload.type || 'advisor'
  label.value = payload.label || 'pro'
  title.value = payload.title?.length ? payload.title : undefined
  partnerShopUrl.value = payload.partnerShopUrl?.length ? payload.partnerShopUrl : undefined
  iframeUrl.value = payload.iframeUrl?.length ? payload.iframeUrl : ''
  iframeButtonLabel.value = payload.iframeButtonLabel?.length ? payload.iframeButtonLabel : ''
  changelogUrl.value = payload.changelogUrl?.length ? payload.changelogUrl : ''
  changelogEndpoints.value = payload.changelogEndpoints ? payload.changelogEndpoints : ''
  brandType.value = payload.brandType?.length ? payload.brandType : ''
  isPartner.value = payload.isPartner || false
  brandName.value = payload.brandName?.length ? payload.brandName : '360 Monitoring'
  openScreen()
  setLanguage(language.value)
})


onClickOutside(guide, event => closeScreen())
</script>

<template>
  <div class="contentScreenWrapper">
    <div
      class="screenOverlay fixed h-screen w-screen bg-trans-black-08 top-0 right-0 transition-opacity duration-300 ease-in-out backdrop-filter backdrop-blur-sm"
      :class="[isActiveBackground ? 'screenOverlay--open': '']"
      @click="$emit('closeScreen')"
    />
    <transition name="slide">
      <div
        v-if="isOpenGuide"
        ref="guide"
        class="fixed top-0 right-0 overflow-hidden bg-white rounded-lg shadow-lg guideScreen transition-all duration-300 ease-in-out z-1m outerFullHeight z-[10001]"
      >
        <ScreenChangelog
          v-if="type === 'changelog'"
          :title="title"
          :changelog-url="changelogUrl"
          :changelog-endpoints="changelogEndpoints"
          @close-screen="closeScreen"
        />
        <ScreenAdvisor
          v-if="type && ['advisor', 'koality'].includes(type)"
          :header-type="type"
          :title="title"
          :is-partner="isPartner"
          :content-id="contentId"
          :partner-shop-url="partnerShopUrl"
          :brand-name="brandName"
          @close-screen="closeScreen"
        />
        <ScreenMarketing
          v-if="type === 'marketing'"
          :title="title"
          :label="label"
          :is-partner="isPartner"
          :partner-shop-url="partnerShopUrl"
          :content-id="contentId"
          :iframe-button-label="iframeButtonLabel"
          :iframe-url="iframeUrl"
          :brand-name="brandName"
          @close-screen="closeScreen"
        />
        <ScreenContent
          v-if="type === 'content'"
          :content-url="contentUrl"
          :is-partner="isPartner"
          :title="title"
          :brand-type="brandType"
          @close-screen="closeScreen"
        />
      </div>
    </transition>
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
