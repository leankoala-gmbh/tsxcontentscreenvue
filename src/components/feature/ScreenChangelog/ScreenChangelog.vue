<script setup lang="ts">
import { IChangelogEndpoints, IChangelogList } from '@/types/general'
import axios from 'axios'

const emit = defineEmits(['closeScreen'])

const props = defineProps({
  title: {
    type: String,
    default: 'What\'s new'
  },
  changelogUrl: {
    type: String,
    default: ''
  },
  changelogEndpoints: {
    type: String,
    required: true
  }
})

const changelogData = ref<IChangelogList[]|null>(null)
const endpointData: IChangelogEndpoints = JSON.parse(props.changelogEndpoints)

const getChangelog = async () => {
  try {
    const {data} = await axios.get(endpointData.getChangelogs, {
      withCredentials: true
    })

    if (!data.includes('<!doctype html>')) {
      changelogData.value = data
      sendReadingChangelogs()
    }
  } catch (error) {
    console.error(error)
  }
}

const markAsRead =  () => {
  if (!changelogData.value?.length) return
  axios.post(endpointData.postChangelog + changelogData.value[0].id, {
    withCredentials: true
  })
}

const sendReadingChangelogs = () => {
  window.mitt.emit('tsxContentScreenEvents', {
    action: 'readingChangelogs'
  })
}

watchEffect(() => {
  if (changelogData.value?.length) {
    markAsRead()
  }
})

onMounted(() => {
  if (endpointData?.getChangelogs) {
    getChangelog()

  } else {
    throw new Error('Changelog endpoints are not defined')
  }
})
</script>

<template>
  <div class="mobileFullHeight">
    <header class="flex justify-between relative items-center py-6 bg-gray-100 mb-8 px-6">
      <div class="font-medium text-2xl">
        {{ title?.length ? title : 'What\'s new' }}
      </div>
      <div class="flex gap-4 items-center">
        <a
          class="flex gap-2 rounded items-center border border-blue-800 text-blue-800 bg-white py-2 px-3 cursor-pointer"
          :href="changelogUrl"
          target="_blank"
        >
          <span>{{ useTranslator().translate('Open changelog') }}</span>
          <svg
            class="w-4"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.875 1.5C7.875 1.03516 8.25781 0.625 8.75 0.625H12.2227C12.3594 0.625 12.4688 0.652344 12.5781 0.707031C12.6602 0.734375 12.7695 0.816406 12.8516 0.898438C13.0156 1.0625 13.0977 1.28125 13.125 1.5V5C13.125 5.49219 12.7148 5.875 12.25 5.875C11.7578 5.875 11.375 5.49219 11.375 5V3.63281L6.72656 8.25391C6.39844 8.60938 5.82422 8.60938 5.49609 8.25391C5.14062 7.92578 5.14062 7.35156 5.49609 7.02344L10.1172 2.375H8.75C8.25781 2.375 7.875 1.99219 7.875 1.5ZM0.875 3.25C0.875 2.29297 1.64062 1.5 2.625 1.5H5.25C5.71484 1.5 6.125 1.91016 6.125 2.375C6.125 2.86719 5.71484 3.25 5.25 3.25H2.625V11.125H10.5V8.5C10.5 8.03516 10.8828 7.625 11.375 7.625C11.8398 7.625 12.25 8.03516 12.25 8.5V11.125C12.25 12.1094 11.457 12.875 10.5 12.875H2.625C1.64062 12.875 0.875 12.1094 0.875 11.125V3.25Z" fill="currentColor" />
          </svg>
        </a>
        <CloseScreenButton @click="$emit('closeScreen')" />
      </div>
    </header>
    <div class="overflow-y-auto max-h-[calc(100%-130px)] pb-4">
      <main v-if="changelogData" class="px-6 flex flex-col gap-3 overflow-y-auto divide-y">
        <ChangelogEntry
          v-for="(entry, index) in changelogData"
          :key="entry.id"
          :entry="entry"
          :class="[{ 'pt-6': index !== 0 }]"
        />
      </main>
    </div>
  </div>
</template>
