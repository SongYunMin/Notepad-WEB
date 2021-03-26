<template>
  <section class="monitor-main">
    <Header/>
    <Tabs/>
    <Editor/>
  </section>
</template>

<script>
import Header from '@/components/Header'
import Tabs from '@/components/Tabs'
import Editor from '@/components/Editor'

export default {
  name: "Monitor",
  data(){
    return {
      initData: this.checkSessionRequest(),
    }
  },
  components:{
    Header,
    Tabs,
    Editor
  },
  methods:{
    async checkSessionRequest(){
      const response = await fetch("http://localhost:8080/notepad/check");
      if (response.status === 200) {
        const result = await response.text();
        if (result === 'False') {
          alert("비정상 접근입니다. 다시 로그인 해주세요.");
          location.href = "Login.html";
        } else {
          console.log("정상 접근");
          console.log(result);
          return result;
        }
      }
      this.initialize();
    },
    initialize(){
      const init = JSON.parse(this.initData);
      if(init.DATA === "DATA_NOT_FOUND"){
        console.log("DATA_NOT_FOUND");
      }else{
        for(let i=0;i<init.count;i++){

        }
      }
    }
  }
}
</script>

<style scoped>

</style>