import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createStore} from 'vuex';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHeading } from '@fortawesome/free-solid-svg-icons'

// import less from 'less';
const store = createStore({
    state(){
        return{
            varTest:"testing string",
        }
    }
})
library.add(faHeading)

const  app = createApp(App);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
