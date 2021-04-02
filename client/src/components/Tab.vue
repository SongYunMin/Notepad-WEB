<template>
  <li class="tab-main">
    <input v-model='this.name' type="button" @click='showTab' class="tab-button"/>
    <button @click='closeTab'
            class="close-button">X</button>
  </li>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      name: 'Tab',
      index: Number(new Date() % 10000),
      memo: null
    }
  },
  props: {
    tabIndex: Number,
    saveTitle: String,
    // TODO : 전체 Node 변경 됨
    current: Object
  },
  methods: {
    setName () {
      // this.name = this.saveTitle
      // TODO : V-bind, model 등으로 DOM 요소 바인딩 하면 됨
    },
    setMemo (newMemo) {
      this.memo = newMemo
    },
    getIndex () {
      return this.index
    },
    closeTab () {
      this.$emit('remove-tab', this.tabIndex)
    },
    showTab () {
      this.$emit('show-tab', this.tabIndex)
    }
  }
}
</script>

<style scoped>

</style>
