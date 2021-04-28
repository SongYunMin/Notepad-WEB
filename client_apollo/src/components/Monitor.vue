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
        query initCheck($ID: String) {
            initCheck(ID: $ID){
                User_Data{
                    count
                    active
                }
                Notepads{
                    number
                    name
                    memo
                    tab
                }
            }
        }`,
        variables: {
          ID: 'secret'
        }
      })
      this.initData = result.data.initCheck;
      this.initialize()
    },
    initialize () {
      if (this.initData.DATA === 'DATA_NOT_FOUND') {
      } else {
        for (let i = 0; i < this.initData.User_Data.count; i++) {
          this.addTab()
        }
        // TODO : Index에 맞게 업데이트 되기 때문에 중복 값 에러 안남
        for (let i = 0; i < this.initData.Notepads.length; i++) {
          this.list[this.initData.Notepads[i].tab].name = this.initData.Notepads[i].name
          this.list[this.initData.Notepads[i].tab].memo = this.initData.Notepads[i].memo
          this.list[this.initData.Notepads[i].tab].number = this.initData.Notepads[i].number
        }
        console.log(this.list);
      }
    },
    addTab () {
      this.list.push({number: '', name: '', memo: '', index: this.count++})
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

      if(result.data.saveNotepad === false){
        alert('세션이 만료되었거나 잘못된 접근입니다. 로그아웃 합니다.')
        this.back(0)
      }else{
        alert('저장 완료')
      }
      this.saveTitle = this.currentPage.name
    },
    loadTab (data) {
      this.list.push({number: data.number, name: data.name, memo: data.memo, index: this.count++})
      this.saveTab();
    },
    showTab (index) {
      this.currentShowPage = index
    },
    async removeTab (index, notepadNumber, notepadName) {
      const result = await this.$apollo.mutate({
        mutation: gql`mutation deleteNotepad($number: Int, $name: String, $count: Int){
            deleteNotepad(number: $number, name: $name, count: $count)
        }`,
        variables: {
          number: notepadNumber,
          name: notepadName,
          count: --this.count
        }
      })

      if(result.data.deleteNotepad === true){
        this.list.splice(index, 1)
        return alert('삭제 완료')
      }else{
        return alert('삭제 실패')
      }
    },
    back (number) {
      this.$emit('back', number)
    },
  }
}

</script>

<style scoped>

</style>
