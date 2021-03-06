import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/reset.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router/index'
import { store } from './store'
import CKEditor from '@ckeditor/ckeditor5-vue';
import mitt from 'mitt';
import './axios'
const emitter = mitt();

//add font-awesome
library.add(fas);

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);
app.config.globalProperties.emitter = emitter;
app
    .use(router)
    .use(store)
    .use( CKEditor )
    .mount('#app')
    
