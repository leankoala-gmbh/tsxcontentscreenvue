<script lang="ts" setup>
defineEmits(['closeScreen'])

const props = defineProps({
  title: {
    type: String,
    default: 'You have discovered a pro feature'
  },
  label: {
    type: String,
    default: 'Pro'
  },
  contentId: {
    type: String,
    default: ''
  },
  iframeUrl: {
    type: String,
    default: ''
  },
  iframeButtonLabel: {
    type: String,
    default: ''
  },
  partnerShopUrl: {
    type: String,
    default: ''
  },
  isPartner : {
    type: Boolean,
    default: false
  },
  brandName: {
    type: String,
    default: ''
  }
})


</script>

<template>
  <div class="flex flex-col mobileFullHeight">
    <div class="px-6 pt-6">
      <header class="flex justify-between relative mb-8">
        <div class="flex items-center">
          <div class="rounded uppercase text-white font-medium bg-marketing text-sm px-2 py-1 mr-2">
            {{ label?.length ? label : 'Pro' }}
          </div>
          <div class="font-bold text-sm uppercase">
            {{ title?.length ? title : 'You have discovered a pro feature' }}
          </div>
        </div>
        <CloseScreenButton @click="$emit('closeScreen')" />
      </header>
    </div>
    <TSXContentScreenContent
      :content-id="contentId"
      type="marketing"
      :is-partner="isPartner"
      :partner-shop-url="partnerShopUrl"
      :iframe-button-label="iframeButtonLabel"
      :iframe-url="iframeUrl"
      :brand-name="brandName"
    />
  </div>
</template>
