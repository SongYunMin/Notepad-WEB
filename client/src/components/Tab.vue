<template>
  <li class="tab-main" ref="tab">
    <button class="tab-button">{{this.name + this.index}}</button>
    <button @click='closeTab' class="close-button">x</button>
  </li>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      index: Number(new Date() % 10000),
      name: `Tab`,
      memo: null
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
      this.$emit('close-tab')
    }
  }
}
</script>

<style scoped>

</style>
