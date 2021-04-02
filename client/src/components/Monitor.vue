<template>
  <section id='monitor' class="monitor-main">
    <Header @load-tab="loadTab" @add-tab="addTab" @save-tab="saveTab" @back="back"/>
    <Tabs @show-tab='showTab'
          @remove-tab="removeTab"
          :list="list"
          :init="init"
          :saveTitle="saveTitle"
          :current="currentPage"/>
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
      saveTitle: 'Tab',
      init: null
    }
  },
  components: {
    Header,
    Tabs,
    Editor
  },
  computed: {
    currentPage () {
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
        for (let i = 0; i < init.count; i++) {
          this.addTab()
        }
        for (let i = 0; i < init.notepad.length; i++) {
          this.list[init.notepad[i].index].name = init.notepad[i].name
          this.list[init.notepad[i].index].memo = init.notepad[i].memo
        }
      }
    },
    addTab () {
      this.list.push({name: '', memo: '', index: this.count++})
    },
    async saveTab () {
      const data = {
        name: this.currentPage.name,
        memo: this.currentPage.memo,
        count: this.count,
        activeIndex: this.currentShowPage
      }
      const response = await fetch(`http://localhost:3000/notepad/save`, {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        const result = await response.text()
        if (result === 'False') {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.')
          this.back(0)
        }
      }
      // TODO : 저장시 탭 이름 변경하기
      // this.saveTitle = this.currentPage.name
    },
    loadTab (data) {
      this.list.push({name: data.name, memo: data.memo, index: this.count++})
    },
    showTab (index) {
      this.currentShowPage = index
      console.log(this.currentPage.index)
    },
    removeTab (index) {
      // TODO : 삭제 API 요청 추가
      this.list.splice(index, 1)
    },
    back (number) {
      this.$emit('back', number)
    }
  }
}
</script>

<style scoped>

</style>
