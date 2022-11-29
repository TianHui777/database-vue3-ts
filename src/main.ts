import {createApp} from "vue";
import {createPinia} from "pinia";

import App from "./App.vue";
import router from "./router";

const store = createPinia();
const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");


//



//在main.js根文件挂载axios
import axios from 'axios'

app.config.globalProperties.$http = axios;

