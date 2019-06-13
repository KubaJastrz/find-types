import 'modern-normalize';
import './styles/index.scss';

import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
