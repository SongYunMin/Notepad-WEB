<template>
  <li class="tab-main" ref="tab">
    <button v-bind='this.name' class="tab-button"></button>
    <button @click='closeTab' class="close-button">x</button>
  </li>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      name: null,
      memo: null,
      index: ''
    }
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
      console.log(this.index)
      this.$emit('close-tab', this.index)
    }
  }
}
</script>

<style scoped>

</style>
