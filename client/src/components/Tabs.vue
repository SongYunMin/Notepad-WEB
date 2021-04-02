<template>
  <ul id='list' class="tabs-main">
    <Tab @show-tab='showTab'
         @remove-tab="removeTab"
         v-for="(item, index) of list"
         :tabIndex="index"
         :key="index"
         :current="current">
    </Tab>
  </ul>
</template>

<script>
import Tab from '@/components/Tab'
export default {
  name: 'Tabs',
  data () {
    return {
      counter: 0,
      selectedTab: null,
      tab: Tab
    }
  },
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
