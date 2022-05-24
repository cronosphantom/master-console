import Vue from 'vue'
import App from './App.vue'
import router from './Routes'
import store from './store/index'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)
const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:4005'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(Toast);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  apolloProvider,
  render: h => h(App), store
}).$mount('#app')
