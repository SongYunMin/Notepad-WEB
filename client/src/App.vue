<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';

function useNotepad(){
  const store = useStore();

  const tab = computed(() => store.state.tabList);

  return {
    tab,
  }
}

export default {
  name: 'App',
  data(){
    return {
      initData: "",
    }
  },
  setup(){
    return {
      ...usePerson()
    }
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
