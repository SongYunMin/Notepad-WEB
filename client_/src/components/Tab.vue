<template>
  <li class="tab-main">
    <button class="tab-button"></button>
    <button class="close-button">x</button>
  </li>
</template>

<script>
export default {
  name: "Tab",
  data() {
    return {
      tabList : this.$store.state.tabList,
      tab : this.$refs.tab.focus()
    }
  },
  methods:{
    init(){

    }
  }
}
</script>

<style scoped>

</style>