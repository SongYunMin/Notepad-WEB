<template>
  <section class="main-header">
    <button @click="loadEvent" class="load" type="button">불러오기</button>
    <button @click="saveTab" class="save" type="button">저장하기</button>
    <button @click="addTab" class="addTabBT" type="button">탭 추가</button>
    <button @click="logout" class="logout" type="button" id="false">로그아웃</button>
  </section>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'Header',
  methods: {
    addTab() {
      this.$emit('add-tab')
    },
    saveTab() {
      this.$emit('save-tab')
    },
    async loadEvent() {
      const search = prompt('불러올 메모의 제목을 입력하세요')
      const result = await this.$apollo.query({
        query: gql`
        query loadNotepad($name: String!){
            loadNotepad(name: $name){
                number
                name
                memo
            }
        }`,
        variables: {
          name: search
        }
      })
      console.log('반환 값 : ', result.data);
      // TODO : ERROR HANDLING 필요
      if(result.data.loadNotepad.ERROR === 'DATA_NOT_FOUND'){
        return alert('저장된 메모가 없습니다.')
      }
      this.$emit('load-tab', {
        number: result.data.loadNotepad.number,
        name: result.data.loadNotepad.name,
        memo: result.data.loadNotepad.memo
      })
    },
    async logout() {
      localStorage.removeItem('token');
      document.querySelector('.logout').setAttribute('id', 'true')
      alert('로그아웃 되었습니다.');
      this.$emit('back', 0);
    },
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
