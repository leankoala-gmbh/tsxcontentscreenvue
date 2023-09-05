<script lang="ts" setup>
import { a } from 'msw/lib/SetupApi-b2f0e5ac'

defineEmits(['closeScreen'])

const props = defineProps({
  title: {
    type: String,
    default: 'Advisor'
  },
  contentId: {
    type: String,
    default: ''
  },
  partnerShopUrl: {
    type: String,
    default: ''
  },
  headerType: {
    type: String,
    default: 'advisor'
  },
  isPartner: {
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
    <div class="px-6 pt-6 mb-8">
      <header class="flex justify-between relative">
        <div class="flex items-center">
          <Brandheader
            v-if="!isPartner"
            :header-type="headerType"
            class="pr-4"
          />
          <span class="font-medium text-2xl">{{ title.length ? title : 'Advisor' }}</span>
        </div>
        <CloseScreenButton @click="$emit('closeScreen')" />
      </header>
    </div>
    <TSXContentScreenContent
      :content-id="contentId"
      :is-partner="isPartner"
      type="advisor"
      :partner-shop-url="partnerShopUrl"
      :brand-name="brandName"
    />
  </div>
</template>
