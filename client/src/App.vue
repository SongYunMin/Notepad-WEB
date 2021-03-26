<template>

  <div id="app">
    <router-link to="/"></router-link>
  </div>
  <router-view />
  <div id="new-account"></div>
</template>

<script>
// import Login from './components/Login'
export default {
  name: 'App',
  data(){
    return {
      initData: "",
    }
  },
  components : {

  },
  methods :{
    // async sessionCheck(){
    //   const response = await fetch("http://localhost:8080/notepad/check");
    //   if (response.status === 200) {
    //     const result = await response.text();
    //     if (result === 'False') {
    //       alert("비정상 접근입니다. 다시 로그인 해주세요.");
    //       location.href = "Login.html";
    //     } else {
    //       console.log("정상 접근");
    //       this.initData = result;
    //     }
    //   }
    // },
  }
}
</script>

<style>

</style>
