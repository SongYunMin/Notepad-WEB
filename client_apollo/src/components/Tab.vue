<template>
  <li class="tab-main">
    <input v-model='item.name' type="button" @click='showTab' class="tab-button"/>
    <button @click='closeTab' class="close-button">X</button>
  </li>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      index: Number(new Date() % 10000),
      tabNumber: 0,
      memo: null
    }
  },
  props: {
    tabIndex: Number,
    current: Object,
    item: Object
  },
  methods: {
    getIndex () {
      return this.index
    },
    closeTab () {
      this.$emit('remove-tab', this.tabIndex, this.item.number, this.item.name)
    },
    showTab () {
      this.$emit('show-tab', this.tabIndex)
    }
  }
}
</script>

<style scoped>

</style>
