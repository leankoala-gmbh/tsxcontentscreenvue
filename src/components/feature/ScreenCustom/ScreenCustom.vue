<script lang="ts" setup>
defineEmits(['closeScreen'])

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="flex flex-col mobileFullHeight">
    <div class="px-6 pt-6 h-full">
      <header class="flex justify-between relative mb-8">
        <div v-if="title" class="flex items-center">
          <span class="font-medium text-2xl">
            {{ title }}
          </span>
        </div>
        <CloseScreenButton @click="$emit('closeScreen')" />
      </header>
      <div class="h-10 bg-red-500">
        <slot />
      </div>
    </div>
  </div>
</template>
