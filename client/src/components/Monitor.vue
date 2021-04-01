<template>
  <section id='monitor' class="monitor-main">
    <Header @load-tab="loadTab" @add-tab="addTab"/>
    <Tabs @show-tab='showTab' ref="addTab"/>
    <Editor/>
  </section>
</template>

<script>
import Header from '@/components/Header'
import Tabs from '@/components/Tabs'
import Editor from '@/components/Editor'

export default {
  name: 'Monitor',
  data () {
    return {
      initData: this.checkSessionRequest(),
      tabs: Tabs
    }
  },
  components: {
    Header,
    Tabs,
    Editor
  },
  methods: {
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

      }
    },
    addTab () {
      this.$refs.addTab.addTab()
    },
    loadTab (data) {

    },
    showTab () {

    }
  }
}
</script>

<style scoped>

</style>
