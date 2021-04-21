<template>
  <div id="app">
    <Login @sign-up="changeComponent(1)" @sign-in="loginInfo" v-if="this.check === 0"/>
    <NewAccount @back="changeComponent(0)" v-else-if="this.check === 1"/>
    <Monitor @back="changeComponent" v-else-if="this.check === 2"/>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import NewAccount from './components/NewAccount.vue'
import Monitor from './components/Monitor.vue'


export default {
  name: 'App',
  data () {
    return {
      initData: '',
      check: 0,
      id: ''
    }
  },
  props:{
    loginID: String
  },
  components: {
    NewAccount,
    Login,
    Monitor
  },
  methods: {
    changeComponent (num) {
      this.check = num
    },
    // TODO :  우선 아이디 바인딩해서 진행?
    loginInfo(id){
      this.id = id
      console.log("정상 로그인 : ", this.id);
      this.changeComponent(2)
    }
  }
}
</script>

<style>

</style>
