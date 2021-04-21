<template>
  <div id="new-account">
    <header class="newAccount-title">
      <p>New Account</p>
    </header>
    <article class="newAccount-main">
      <ul class="newAccount-box">
        <li class="newAccount-id">
          <span class="newAccount-text">ID</span>
          <input v-model="id" class="newAccount-idInput" type="text"/>
          <button v-on:click="idCheck(id)" class="newAccount-doubleCheck">중복확인</button>
        </li>
        <li class="newAccount-pw">
          <span class="newAccount-text">PW</span>
          <input v-model="pw" class="newAccount-pwInput" type="password"/>
        </li>
        <li class="newAccount-pwck">
          <span class="newAccount-text">PW-Check</span>
          <input v-model="pwck" class="newAccount-pwckInput" type="password"/>
        </li>
        <li class="newAccount-nickname">
          <span class="newAccount-text">Nickname</span>
          <input v-model="nick" class="newAccount-nicknameInput" type="text"/>
        </li>
      </ul>
      <button @click="submit" class="newAccount-submit">Sign Up</button>
      <button @click="back" class="back">Back</button>
    </article>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'NewAccount',
  data () {
    return {
      id: '',
      pw: '',
      pwck: '',
      nick: '',
      flag: 0
    }
  },
  methods: {
    async idCheck (ID) {
      const result = await this.$apollo.query({
        query: gql`query idCheck($ID: String){
            idCheck(ID: $ID)
        }`,
        // Parameters
        variables: {
          ID: ID
        }
      })
      if (result.data.idCheck === 'False') {
        alert('이미 존재하는 아이디입니다.')
        this.flag = 0
      } else {
        alert('사용할 수 있는 아이디입니다.')
        this.temp = this.id
        this.flag = 1
      }
    },
    async submit () {
      if (this.flag === 0 || this.temp !== this.id) {
        alert('아이디 중복검사를 해야합니다.')
        return -1
      }

      if (this.pw !== this.pwck) {
        alert('비밀번호와 비밀번호 확인이 다릅니다.')
        return -1
      }

      const result = await this.$apollo.mutate({
        mutation: gql`mutation newAccount($ID: String, $pw: String, $nickname: String){
            newAccount(ID: $ID, pw: $pw, nickname: $nickname)
        }`,
        variables:{
          ID: this.id,
          pw: this.pw,
          nickname: this.nick,
        }
      })
      if (result.data.newAccount === 'OK') {
        alert('회원 가입에 성공하였습니다.')
        this.$emit('back')
        return 1
      } else {
        alert('회원가입 실패')
        this.$emit('back')
        return -1
      }
    },
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>

</style>
