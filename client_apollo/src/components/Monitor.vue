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
import Header from './Header.vue'
import Tabs from './Tabs.vue'
import Editor from './Editor.vue'
import gql from 'graphql-tag'

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
      init: null,
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
      const result = await this.$apollo.query({
        query: gql`
        query initCheck($ID: String){
            initCheck(ID: $ID)
        }`,
        variables: {
          ID: 'secret'
        }
      })

      if(JSON.parse(result.data.initCheck).DATA === 'DATA_NOT_FOUND'){
        return console.log("초기 데이터 없음");
      }
      this.initData = result.data.initCheck
      this.initialize()
    },
    initialize () {
      const init = JSON.parse(this.initData)
      console.log(init)
      if (init.DATA === 'DATA_NOT_FOUND') {
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
      const result = await this.$apollo.mutate({
        mutation: gql`
            mutation saveNotepad($name: String, $memo: String, $count: Int, $activeIndex: Int){
            saveNotepad(name: $name, memo: $memo, count: $count, activeIndex: $activeIndex)
        }`,
        variables: {
          name: this.currentPage.name,
          memo: this.currentPage.memo,
          count: this.count,
          activeIndex: this.currentShowPage
        }
      })

      if(result.data.saveNotepad === 'False'){
        alert('세션이 만료되었습니다. 다시 로그인해주세요.')
        this.back(0)
      }
      this.saveTitle = this.currentPage.name
    },
    loadTab (data) {
      this.list.push({name: data.name, memo: data.memo, index: this.count++})
    },
    showTab (index) {
      this.currentShowPage = index
    },
    async removeTab (index, notepadName) {
      const result = await this.$apollo.query({
        query: gql`query deleteNotepad($name: String, $count: Int){
            deleteNotepad(name: $name, count: $count)
        }`,
        variables: {
          name: notepadName,
          count: --this.count
        }
      })

      if(result.data.deleteNotepad === 'OK'){
        this.list.splice(index, 1)
        return alert('삭제 완료')
      }
      //
      // const response = await fetch(`http://localhost:3000/notepad/delete?data=${JSON.stringify(data)}`, {
      //   mode: 'cors',
      //   credentials: 'include',
      //   method: 'GET',
      //   headers: {'Content-Type': 'application/json'}
      // })
      // if (response.status === 200) {
      //   const result = await response.json()
      //   if (result.result === 'OK') {
      //     this.list.splice(index, 1)
      //     return alert('삭제 완료')
      //   } else {
      //     return alert('삭제 오류!')
      //   }
      // }
    },
    back (number) {
      this.$emit('back', number)
    },
  }
}
</script>

<style scoped>

</style>
