// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import App from './App.vue'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

Vue.config.productionTip = false
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  apolloProvider,
  template: '<App/>',
})

export default {
  runtimeCompiler: true
}
