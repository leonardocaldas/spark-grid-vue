import { createApp } from 'vue';
import App from './App.vue';
import { ArcanaDataTable } from '../src';
import mitt from "mitt";

const app = createApp(App);
const emitter = mitt()

app
    .use(ArcanaDataTable, {
        eventProxy: {
            emit: emitter.emit,
            on: emitter.on,
            off: emitter.off,
        }
    })

app.mount('#app');