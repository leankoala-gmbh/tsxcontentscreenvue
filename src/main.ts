import { createApp } from 'vue'
import App from './App.vue'
import './assets/colors.css'
import './assets/index.css'

import { defineCustomElement } from 'vue'
import TSXContentScreen from './components/feature/TSXContentScreen/TSXContentScreen.ce.vue'
customElements.define('tsx-contentscreen', defineCustomElement(TSXContentScreen))

const app = createApp(App)
app.mount('#app')
