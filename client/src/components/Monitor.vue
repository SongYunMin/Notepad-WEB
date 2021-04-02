<template>
  <section id='monitor' class="monitor-main">
    <Header @load-tab="loadTab" @add-tab="addTab" @save-tab="saveTab"/>
    <Tabs @show-tab='showTab' @remove-tab="removeTab" :list="list" :saveTitle="saveTitle" :current="currentPage"/>
    <Editor v-if='this.count > 0' :current="currentPage"/>
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
      tabs: Tabs,
      list: [],
      count: 0,
      currentShowPage: 0,
      saveTitle: 'Tab'
    }
  },
  components: {
    Header,
    Tabs,
    Editor
  },
  computed: {
    currentPage () {
    // TODO : 리스트는 0개인데 현재 페이지도 0이면 오류 (예외처리)
      if (this.count > 0) {
        return this.list[this.currentShowPage]
      }
    }
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
      this.list.push({name: '', memo: '', index: this.count++})
    },
    saveTab () {
      this.saveTitle = this.currentPage.name
    },
    loadTab (data) {

    },
    showTab (index) {
      this.currentShowPage = index
    },
    removeTab (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
