<script lang="ts" setup>
defineEmits(['closeScreen'])

defineProps({
  title: {
    type: String,
    default: 'You have discovered a pro feature'
  },
  label: {
    type: String,
    default: 'Pro'
  },
  contentUrl: {
    type: String,
    default: ''
  },
  brandType: {
    type: String,
    default: ''
  },
  isPartner: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex flex-col mobileFullHeight">
    <div class="px-6 pt-6 h-full">
      <header class="flex justify-between relative mb-8">
        <div v-if="title" class="flex items-center">
          <Brandheader
            v-if="brandType && !isPartner"
            :header-type="brandType"
            class="pr-4"
          />
          <span class="font-medium text-2xl">
            {{ title }}
          </span>
        </div>
        <CloseScreenButton @click="$emit('closeScreen')" />
      </header>
      <iframe
        :src="contentUrl"
        class="w-full h-[calc(100%-120px)]"
      />
    </div>
  </div>
</template>
