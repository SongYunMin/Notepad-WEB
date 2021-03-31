<template>
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
    <button class="newAccount-submit">Sign Up</button>
  </article>
</template>

<script>
export default {
  name: "NewAccount",
  data(){
    return {
      id:'',
      pw:'',
      pwck:'',
      nick:'',
      temp:'',
      flag:0
    }
  },
  methods: {
    async idCheck(ID) {
      const response = await fetch(`http://localhost:8080/user/idCheck?id=${ID}`);
      if (response.status === 200) {
        const result = await response.text();
        if (result === 'False') {
          alert("이미 존재하는 아이디입니다.");
          this.flag = 0;
        } else {
          alert("사용할 수 있는 아이디입니다.");
          this.temp = this.id
          this.flag = 1;
        }
      }
    },
  }
}
</script>

<style scoped>

</style>