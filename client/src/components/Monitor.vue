<template>
  <section class="monitor-main">
    <Header
        @load-tab="loadTab"
    />
    <Tabs/>
    <Editor/>
  </section>
</template>

<script>
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import Editor from '@/components/Editor';
// import {useStore} from "vuex";

export default {
  name: "Monitor",
  data() {
    return {
      initData: this.checkSessionRequest(),
    }
  },
  components: {
    Header,
    Tabs,
    Editor
  },
  methods: {
    async checkSessionRequest() {
      const response = await fetch("http://localhost:8080/notepad/check");
      if (response.status === 200) {
        const result = await response.text();
        if (result === 'False') {
          alert("비정상 접근입니다. 다시 로그인 해주세요.");
          location.href = "Login.html";
        } else {
          console.log("정상 접근");
          console.log(result);
          this.initData = result;
        }
      }
      this.initialize();
    },
    initialize() {
      const init = JSON.parse(this.initData);
      if (init.DATA === "DATA_NOT_FOUND") {
        console.log("DATA_NOT_FOUND");
      } else {
        for (let i = 0; i < init.count; i++) {
          this.addTab();
        }
      }
    },
    addTab(){
      console.log("add Tab!!");
      // TODO : $store.commit Undefined
      console.log(this.$store);
    },
    loadTab(data) {
      // TODO : Vuex 및 mapGetter 활용 https://madplay.github.io/post/why-do-we-need-vuex
      console.log(data.name);
      console.log(data.memo);

    },
  }
}
</script>

<style scoped>

</style>