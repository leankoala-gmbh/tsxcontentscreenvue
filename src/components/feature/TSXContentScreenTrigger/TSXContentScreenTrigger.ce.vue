<script lang="ts" setup>
import { TScreenTypes } from '@/types/general'
import { log } from 'console'
import mitt from 'mitt'

const props = defineProps({
  contentId: {
    type: String,
    default: ''
  },
  contentUrl: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'en'
  },
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String as () => TScreenTypes,
    default: 'advisor'
  },
  label: {
    type: String,
    default: 'pro'
  },
  partnerShopUrl: {
    type: String,
    default: ''
  },
  iframeButtonLabel: {
    type: String,
    default: ''
  },
  iframeUrl: {
    type: String,
    default: ''
  },
  changelogUrl: {
    type: String,
    default: ''
  },
  changelogEndpoints: {
    type: String,
    default: ''
  },
  brandType: {
    type: String,
    default: ''
  },
  isPartner: {
    type: String,
    default: 'false'
  },
  brandName: {
    type: String,
    default: '360 Monitoring'
  }
})

window.mitt = window.mitt || mitt()
const trigger = () => {
  window.mitt.emit('tsxContentScreenConfig', {
    contentUrl: props.contentUrl,
    contentId: props.contentId,
    language: props.language,
    type: props.type,
    title: props.title,
    label: props.label,
    partnerShopUrl: props.partnerShopUrl,
    iframeButtonLabel: props.iframeButtonLabel,
    iframeUrl: props.iframeUrl,
    changelogUrl: props.changelogUrl,
    changelogEndpoints: props.changelogEndpoints,
    brandType: props.brandType,
    isPartner: props.isPartner.toLowerCase() === 'true',
    brandName: props.brandName
  })
}

</script>

<template>
  <div class="inline-block" @click="trigger">
    <slot />
  </div>
</template>
