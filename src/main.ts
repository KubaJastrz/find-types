import 'modern-normalize';
import '@/styles/index.scss';

import Vue from 'vue';
import { ExternalLink } from '@/components/common';
import App from '@/components/app/App.vue';

Vue.config.productionTip = false;

Vue.component('external-link', ExternalLink);

new Vue({
    render: h => h(App),
}).$mount('#app');
