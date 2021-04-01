<template>
  <ul id='list' class="tabs-main">
<!--    <Tab ref="addTab"/>-->
    <component @close-tab="removeTab(index)" v-for="(item, index) in tabList" :is="item" :key="index" ref="addTab"></component>
  </ul>
</template>

<script>
import Tab from '@/components/Tab'

export default {
  name: 'Tabs',
  data () {
    return {
      tabList: [],
      counter: 0,
      selectedTab: null,
      tab: Tab
    }
  },
  components: {
    Tab
  },
  methods: {
    addTab () {
      this.tabList.push(this.tab)
      this.counter++
    },
    removeTab (index) {
      console.log(index)
      this.tabList.splice(index, 1)
    },
    init (initData) {
      for (let i = 0; i < initData.notepad.length; i++) {
        this.tabList[initData.notepad[i].index].setName(initData.notepad[i].name)
        this.tabList[initData.notepad[i].index].setMemo(initData.notepad[i].memo)
      }
      this.select(this.tabList[initData.activeIndex])
    },
    select (tab) {
      this.selectedTab = tab
    },
    getIndex () {
      return this.counter
    }
  }
}
</script>

<style scoped>

</style>
