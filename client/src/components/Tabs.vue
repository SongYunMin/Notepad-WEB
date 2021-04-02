<template>
  <ul id='list' class="tabs-main">
    <Tab @show-tab='showTab'
         @remove-tab="removeTab"
         v-for="(item, index) of list"
         :tabIndex="index"
         :key="index"
         :current="current"
    >
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
  // TODO : 탭의 인덱스 체크 필요
  components: {
    Tab
  },
  props: {
    list: Array,
    current: Object
  },
  methods: {
    removeTab (index) {
      this.$emit('remove-tab', index)
    },
    showTab (index) {
      this.$emit('show-tab', index)
    },
    init (initData) {
      for (let i = 0; i < initData.notepad.length; i++) {
        this.list[initData.notepad[i].index].setName(initData.notepad[i].name)
        this.list[initData.notepad[i].index].setMemo(initData.notepad[i].memo)
      }
      this.select(this.list[initData.activeIndex])
    },
    select (tab) {
      console.log('Select : ', tab)
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
