<template>
  <section class="main-header">
    <button @click="loadEvent" class="load" type="button">불러오기</button>
    <button @click="saveTab" class="save" type="button">저장하기</button>
    <button @click="addTab" class="addTabBT" type="button">탭 추가</button>
    <button @click="logout" class="logout" type="button">로그아웃</button>
  </section>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Header',
  data () {
    return {
      loginID : this.getCookie('loginID')
    }
  },
  methods: {
    addTab() {
      this.$emit('add-tab')
    },
    saveTab() {
      this.$emit('save-tab')
    },
    async loadEvent() {
      const search = prompt('불러올 메모의 제목을 입력하세요')
      const response = await fetch(`http://localhost:3000/notepad/load?name=${search}`, {
        mode: 'cors',
        credentials: 'include'
      })
      if (response.status === 200) {
        const result = await response.json()
        if (result.name === 'False') return alert('저장된 메모가 없습니다')
        this.$emit('load-tab', {
          name: result.name,
          memo: result.memo
        })
      }
    },
    async logout() {
      console.log(this.getCookie('sid'));
      this.deleteCookie('connect.sid');
      this.deleteCookie('loginID');
      const result = await this.$apollo.mutate({
        mutation: gql`
        mutation logout {
            logout
        }`
      })

      if (result.data.logout === 'OK') {
        alert('로그아웃 되었습니다.')
        this.$emit('back', 0)
      } else {
        alert('로그아웃에 실패하였습니다.');
        console.error(result.data.logout)
      }
    },
    getCookie(name) {
      let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      console.log("쿠키 : ", value)
      return value ? value[2] : null
    },
    setCookie(name, value, exp) {
      let date = new Date();
      date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    },
    deleteCookie(name){
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
