<template>
  <div id="app">
    <Login @sign-up="changeComponent(1)" @sign-in="changeComponent(2)" v-if="this.check === 0"/>
    <NewAccount @back="changeComponent(0)" v-else-if="this.check === 1"/>
    <Monitor v-else-if="this.check === 2"/>
  </div>
</template>

<script>
import Login from './components/Login'
import NewAccount from './components/NewAccount'
import Monitor from './components/Monitor'

export default {
  name: 'App',
  data () {
    return {
      initData: '',
      check: 0
    }
  },
  components: {
    NewAccount,
    Login,
    Monitor
  },
  methods: {
    changeComponent (num) {
      this.check = num
    }
  }
}
</script>

<style>

</style>
