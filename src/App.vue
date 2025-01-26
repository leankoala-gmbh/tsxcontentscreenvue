<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import TSXContentScreenTrigger from './components/feature/TSXContentScreenTrigger/TSXContentScreenTrigger.ce.vue'
import TSXContentScreen from './components/feature/TSXContentScreen/TSXContentScreen.ce.vue'

const changelogEndpoints = JSON.stringify({
  getChangelogs: 'https://stage.monitoring360.io/changelog/last',
  postChangelog: 'https://stage.monitoring360.io/changelog/read/'
})

window.mitt.on('tsxContentScreenEvents', (event) => {
  console.log('tsxContentScreenEvents', event)
})


const customEvent = () => {
  window.mitt.emit('tsxContentScreenConfig', {
    contentId: 'customer.360.business.scheduled-crawls',
    type: 'marketing',
    language: 'en',
    label: 'Business',
    title: 'You have discovered a new feature',
    partnerShopUrl: 'https://www.google.com',
    partnerShopIframe: true,
    isPartner: false,
    brandName: '360 Monitoring Stage'
})
}
</script>


<template>
  <div>
    <div @click="customEvent">
      click me
    </div>
    <div class="mb-10">
      <TSXContentScreenTrigger
        content-id="html.deadlink.404"
        title="Advisor"
      >
        Open Advisor
      </TSXContentScreenTrigger>
    </div>
    <div class="mb-10">
      <TSXContentScreenTrigger
        content-id="monitoring.content.content"
        type="koality"
        language="de"
      >
        Open kAdvisor info
      </TSXContentScreenTrigger>
    </div>
    <div class="mb-10">
      <TSXContentScreenTrigger
        content-id="monitoring.content.content"
        type="koality"
        language="de"
        is-partner="true"
      >
        Open kAdvisor info
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        content-url="https://www.google.com"
        type="content"
        language="de"
        title="Content noch mal"
        brand-type="advisor"
      >
        Open content info
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        content-id="_demo.iframe.test"
        type="marketing"
        label="viktor"
        language="de"
        iframe-button-label="Open in iframe"
        iframe-url="https://www.google.com"
      >
        Open Iframe Content
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        content-id="customer.360.pro.api-keys"
        type="marketing"
        label="viktor"
        language="de"
        iframe-button-label="Open in iframe"
        iframe-url="https://www.google.com"
        partner-shop-iframe="false"
      >
        Blah
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        content-id="customer.360.pro.api-keys"
        type="marketing"
        language="de"
        is-partner="false"
        partner-shop-url="https://www.google.com"
      >
        Open Iframe Content Marketing TRUE
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        content-id="customer.360.pro.fsc"
        type="marketing"
        language="de"
        is-partner="false"
      >
        Open Iframe Content Marketing FALSE
      </TSXContentScreenTrigger>
    </div>

    <div>
      <TSXContentScreenTrigger
        type="changelog"
        changelog-url="https://www.koality.com/api/v1/changelog"
        :changelog-endpoints="changelogEndpoints"
      >
        Open Changelog
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        type="custom"
        title="Custom blaaaah"
      >
        Custom sdsd
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        type="marketing"
        brand-name="360 Monitoring Stage"
        content-id="customer.360.business.blocklists"
        iframe-url="https://store.plesk.com/1404/?scope=checkout&cart=s8843&recommendation=360monitoring-pro,360monitoring-biz,360monitoring-ent&cfg=base_iframe_or&x-loading=block&currencies=EUR,USD,GBP,JPY&x-activation-data=NjZjNWY3YjI5NWFhZDYyNTE1MDQwOGU0&quantityrno_2=0&quantityrno_3=1&deliveryEmail=jorge.flores%2Bwhmdemo24%40webpros.com"
        is-partner="true"
        label="Business"
        language="en"
        partner-shop-iframe="true"
        partner-shop-url=""
        title="You have discovered a new feature"
      >
        Platform Test
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        content-id="customer.360.business.blocklists"
        label="Business"
        language="en"
        partner-shop-url="/purchase"
        title="You have discovered a new feature"
        type="marketing"
      >
        cPanel Test
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        content-id="customer.360.pro.api-keys"
        label="icon"
        language="en"
        partner-shop-url="/purchase"
        title="You have discovered a icon feature"
        type="marketing"
      >
        WHMCS MC Test
      </TSXContentScreenTrigger>
    </div>
    <TSXContentScreen :debug="true">
      <div class="h-10 bg-red-500">
        Custom sdsd
      </div>
    </TSXContentScreen>
  </div>
</template>

