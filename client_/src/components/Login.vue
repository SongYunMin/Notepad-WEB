<template>
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
    <button v-on:click="signIn(ID, PW)" class="signIn">Sign In</button>
    <button><router-link to="/new-account" tag="button" class="signUp">Sign Up</router-link></button>
  </article>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      ID : "",
      PW : "",
    }
  },
  methods:{
    async signIn(ID, PW){
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        mode: 'cors',
        credentials: 'include',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({id:ID, pw:PW})
      });
      if(response.status === 200){
        try {
          const result = await response.text();
          if(result === 'False'){
            alert("아이디와 패스워드가 일치하지 않습니다.");
          }else{
            alert(`${result}님 환영합니다.`);
            await this.$router.push('/notepad')
          }
        }catch (err){
          console.error(err);
        }
      }
    },
    signUp(){
      location.href = "NewAccount.vue";
    }
  }
}
</script>

<style scoped>
/* Login.html */
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