<template>
  <div id="app">
    <!-- TODO : Login 에서 이벤트 발생 -->
    <Login @sign-up="check = 1" v-if="this.check === 0"/>
    <NewAccount @back="check = 0" v-else-if="this.check === 1"/>
  </div>
</template>

<script>
import Login from './components/Login'
import NewAccount from './components/NewAccount'

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
    Login
  },
  methods: {
    // changeComponent (num) {
    //
    //
    // },
    async checkSessionRequest () {
      const response = await fetch('http://localhost:3000/notepad/check', {
        mode: 'cors',
        credentials: 'include'
      })
      if (response.status === 200) {
        const result = await response.text()
        if (result === 'False') {
          alert('비정상 접근입니다. 다시 로그인 해주세요.')
          location.href = 'Login.html'
        } else {
          this.initData = result
        }
      }
      this.initialize()
    },
    initialize () {
      const init = JSON.parse(this.initData)
      if (init.DATA === 'DATA_NOT_FOUND') {
        console.log('DATA_NOT_FOUND')
      } else {
        for (let i = 0; i < init.count; i++) {
          this.$store.commit('notepad/init', init)
        }
      }
    },
    loadTab (data) {
      // TODO : Vuex 및 mapGetter 활용 https://madplay.github.io/post/why-do-we-need-vuex
      console.log(data.name)
      console.log(data.memo)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
