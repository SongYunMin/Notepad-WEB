<template>
  <ul id='list' class="tabs-main">
    <!--    <Tab ref="addTab"/>-->
    <Tab @show-tab='showTab'
         @close-tab="removeTab(index)"
         v-for="(item, index) of list"
         :tabIndex="index"
         :key="index">
    </Tab>
  </ul>
</template>

<script>
import Tab from '@/components/Tab'

export default {
  name: 'Tabs',
  data () {
    return {
      // tabList: [],
      counter: 0,
      selectedTab: null,
      tab: Tab
    }
  },
  components: {
    Tab
  },
  props: {
    list: Array
  },
  methods: {
    addTab () {
      // this.tabList.push({name: 'sd', memo: 'zxc'})
      // console.log(this.$refs.tab)
      // this.select(this.tab)
      // this.counter++
      // return this.tab
    },
    removeTab (index) {
      // console.log(index)
      // this.tabList.splice(index, 1)
    },
    showTab (index) {
      this.$emit('show-tab', index)
    },
    init (initData) {
      for (let i = 0; i < initData.notepad.length; i++) {
        this.tabList[initData.notepad[i].index].setName(initData.notepad[i].name)
        this.tabList[initData.notepad[i].index].setMemo(initData.notepad[i].memo)
      }
      this.select(this.tabList[initData.activeIndex])
    },
    select (tab) {
      console.log('Select : ', tab)
      this.selectedTab = tab
    },
    getIndex () {
      return this.counter
    },
    save (data) {
      for (let i = 0; i < this.tabList.length; i++) {
        console.log(this.tabList[i].getIndex(), '::', this.selectedTab.getIndex())
        if (this.tabList[i].getIndex() === this.selectedTab.getIndex()) {
          this.selectedTab.setName(data.name)
          this.selectedTab.setMemo(data.memo)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
