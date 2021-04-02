<template>
  <section class="main-header">
    <button @click="loadEvent" class="load" type="button">불러오기</button>
    <button @click="saveTab" class="save" type="button">저장하기</button>
    <button @click="addTab" class="addTabBT" type="button">탭 추가</button>
    <button class="logout" type="button">로그아웃</button>
  </section>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    addTab () {
      this.$emit('add-tab')
    },
    saveTab () {
      this.$emit('save-tab')
    },
    async loadEvent () {
      const search = prompt('불러올 메모의 제목을 입력하세요.')
      const response = await fetch(`http://localhost:3000/notepad/load?name=${search}`, {
        mode: 'cors',
        credentials: 'include'
      })
      if (response.status === 200) {
        const result = await response.json()
        if (result.name === 'False') return alert('저장된 메모가 없습니다.')
        this.$emit('load-tab', {
          name: result.name,
          memo: result.memo
        })
      }
    }
  }
}
</script>

<style scoped>
.main-header {
  width: 100%;
  background: beige;
  text-align: right;
}

.main-header button {
  width: 120px;
  height: 45px;
  font-size: 140%;
}
</style>
