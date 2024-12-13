<script lang="ts" setup>
import { TScreenTypes } from '@/types/general'
import GuideClient from '@webpros/koality-guide-client'
import { marked } from 'marked'
import { o } from 'msw/lib/SetupApi-b2f0e5ac'

const { getLanguage, translate } = useTranslator()

interface Props {
  contentId: string
  type?: TScreenTypes
  partnerShopUrl?: string
  partnerShopIframe?: boolean
  debug: boolean
  iframeButtonLabel?: string | null
  iframeUrl?: string | null
  isPartner: boolean
  brandName?: string
}

const props = withDefaults(defineProps<Props>(), {
  contentId: '',
  type: 'content',
  partnerShopUrl: '',
  partnerShopIframe: true,
  debug: false,
  iframeButtonLabel: null,
  iframeUrl: null,
  isPartner: false,
  brandName: '360 Monitoring'
})

const content = ref<string>()
const meta = ref<any>({})
const apiError = ref<any>()
const iframeIsOpen = ref(false)

const client = new GuideClient('md')

const fetchContent = async () => {
  try {
    const guide = await client.getGuide(props.contentId, getLanguage())
    const contentText = guide.getText().replaceAll('360 Monitoring', props.brandName)
    content.value = marked(contentText)
    const {buttons, cta} = guide.getMetaInformation()
    const ctaNew = cta?.[0] || null
    if (ctaNew) {
      ctaNew.label = ctaNew.label.replaceAll('360 Monitoring', props.brandName)
    }
    meta.value = {
      buttons: buttons || [],
      cta: ctaNew ?? null
    }
  } catch (err) {
    console.error(err)
    apiError.value = err
  }
}

const fetchedURL = computed(() => {
  if (props.isPartner){
    return props.partnerShopUrl?.length ? props.partnerShopUrl: false
  }
  return props.partnerShopUrl?.length
    ? props.partnerShopUrl
    : meta.value.cta.url
})

fetchContent()

const triggerIframe = () => {
  iframeIsOpen.value = true
  window.mitt.emit('tsxContentScreenEvents', {
    action: 'openIframe'
  })
}

const triggerPartnerShopPage = () => {
  window.open(fetchedURL.value, '_blank')
  window.mitt.emit('tsxContentScreenEvents', {
    action: 'openCpanelStore'
  })
}

const uniBool = (value: string | boolean) : boolean => {
  return typeof value === 'boolean'
  ? value
  : value.length > 0 && value === 'true'
}
</script>

<template>
  <div
    class="px-6 pb-6 flex-auto"
    :class="[
      iframeIsOpen ? '' : 'overflow-y-auto'
    ]"
  >
    <div v-if="!iframeIsOpen" class="markdown-body ">
      <div
        v-if="!apiError"
        class="richTextContent"
        :class="[
          `richTextContent--${type}`,
        ]"
        v-html="content"
      />
      <div v-if="apiError" class="text-error-high text-sm">
        {{ apiError }}
      </div>
    </div>
    <iframe
      v-if="iframeIsOpen && iframeUrl"
      class="w-full h-full"
      :src="iframeUrl"
      frameborder="0"
    />
  </div>
  <div
    v-if="type === 'marketing' && !iframeUrl && meta.cta"
    class="p-4"
  >
    <a
      v-if="!!fetchedURL"
      class="inline-flex items-center justify-center transition-all duration-300 cursor-pointer border-0 focus:outline-none p-3 w-full rounded mb-3 text-white bg-marketing hover:bg-marketing-hover"
      :href="fetchedURL"
      :target="meta.cta.target || '_blank'"
    >
      {{ meta.cta.label || 'Click here' }}
    </a>
    <p
      v-else
      class="px-4 py-2 text-sm rounded border border-gray-200"
    >
      {{ translate("alternativePartnerText") }}
    </p>
    <div v-if="meta.cta.subline" class="rounded border border-gray-200 py-2 px-3 text-center font-medium text-content-body">
      {{ meta.cta.subline }}
    </div>
  </div>
  <div v-if="!!iframeUrl?.length && !iframeIsOpen && !uniBool(partnerShopIframe)" class="p-4">
    <a
      class="inline-flex items-center justify-center transition-all duration-300 cursor-pointer border-0 focus:outline-none p-3 w-full rounded mb-3 text-white bg-marketing hover:bg-marketing-hover"
      @click="triggerIframe"
    >
      {{ iframeButtonLabel || meta.cta.label || 'Open here' }}
    </a>
  </div>
  <div v-if="!!iframeUrl?.length && uniBool(partnerShopIframe)" class="p-4">
    <a
      class="inline-flex items-center justify-center transition-all duration-300 cursor-pointer border-0 focus:outline-none p-3 w-full rounded mb-3 text-white bg-marketing hover:bg-marketing-hover"
      @click="triggerPartnerShopPage"
    >
      {{ iframeButtonLabel || meta.cta.label || 'Open here' }}
    </a>
  </div>
</template>

