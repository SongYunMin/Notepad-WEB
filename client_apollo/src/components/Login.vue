<template>
  <div id="header">
    <header class="title" id="title">
      <p>Notepad Service Login</p>
    </header>
    <article class="login">
      <ul class="loginBox">
        <li class="loginBoxID">
          <span class="idName">ID</span>
          <input v-model="ID" class="idInput" type="text"/>
        </li>
        <li class="loginBoxPW">
          <span class="pwName">Password</span>
          <input v-model="PW" class="pwInput" type="password"/>
        </li>
      </ul>
      <button @click="signIn(ID, PW)" class="signIn">Sign In</button>
      <button @click="newAccount" class="signUp">Sign Up</button>
    </article>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'Login',
  data () {
    return {
      sel: 0,
      ID: '',
      PW: ''
    }
  },
  methods: {
    newAccount () {
      this.$emit('sign-up')
    },
    async signIn () {
      // TODO : 쿠키 확인 후 있으면 Monitor
      const result = await this.$apollo.query({
          query: gql`query login($id: String, $pw: String){
            login(id: $id, pw:$pw)
        }`,
        variables: {
          id: this.ID,
          pw: this.PW
        }
      })
      if (result.data.login === false) {
        alert('아이디와 패스워드가 일치하지 않습니다.')
      } else {
        alert(`로그인 되었습니다.`)
        this.$emit('sign-in', result.data.login)
      }
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  justify-content: center;
  font-size: 50px;
  font-weight: bold ;
}

.login{
  display: flex;
  justify-content: center;
}

.loginBox{
  list-style: none;
}

.loginBoxID{
  margin-right: 30px;
  margin-bottom: 15px;
}

.idName{
  margin-right: 60px;
}

.loginBoxPW{
  margin-right: 30px;
}

.pwName{
  margin-right: 10px;
}

.signIn{
  width: 100px;
  background: antiquewhite;
}
</style>
