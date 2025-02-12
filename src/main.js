import { createApp } from 'vue'
import App from './App.vue'

import BaseButton from './components/UI/BaseButton.vue'
import BaseDialog from './components/UI/BaseDialog.vue'
import BaseCard from './components/UI/BaseCard.vue'
import TheLoading from './components/UI/TheLoading.vue'

const app = createApp(App)

app.component('base-button', BaseButton)
app.component('base-dialog', BaseDialog)
app.component('base-card', BaseCard)
app.component('the-loading', TheLoading)

app.mount('#app')
