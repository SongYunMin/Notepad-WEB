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
export default {
  name: 'NewAccount',
  data () {
    return {
      id: '',
      pw: '',
      pwck: '',
      nick: '',
      temp: '',
      flag: 0
    }
  },
  methods: {
    async idCheck (ID) {
      const response = await fetch(`http://localhost:3000/user/idCheck?id=${ID}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
      if (response.status === 200) {
        const result = await response.text()
        if (result === 'False') {
          alert('이미 존재하는 아이디입니다.')
          this.flag = 0
        } else {
          alert('사용할 수 있는 아이디입니다.')
          this.temp = this.id
          this.flag = 1
        }
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

      const response = await fetch(`http://localhost:3000/user/newAccount`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.id,
          pw: this.pw,
          nick: this.nick
        })
      })
      if (response.status === 200) {
        const result = await response.text()
        if (result === 'OK') {
          alert('회원 가입에 성공하였습니다.')
          this.$emit('back')
          return 1
        } else {
          alert('회원가입 실패')
          this.$emit('back')
          return -1
        }
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
