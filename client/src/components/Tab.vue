<template>
  <li class="tab-main">
    <button @click='showTab' class="tab-button">{{this.name}}</button>
    <button @click='closeTab'
            class="close-button">{{ tabIndex }}</button>
  </li>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      index: Number(new Date() % 10000),
      name: 'Tab',
      memo: null
    }
  },
  props: {
    tabIndex: Number
  },
  methods: {
    setName (newName) {
      this.name = newName
      // TODO : V-bind, model 등으로 DOM 요소 바인딩 하면 됨
    },
    setMemo (newMemo) {
      this.memo = newMemo
    },
    getInfo () {
      console.log(this.name, this.memo)
      return {
        name: this.name,
        memo: this.memo
      }
    },
    getIndex () {
      return this.index
    },
    getCount () {
      this.$emit('count-check')
    },
    closeTab () {
      this.$emit('close-tab')
    },
    showTab () {
      this.$emit('show-tab', this.tabIndex)
    }
  }
}
</script>

<style scoped>

</style>
