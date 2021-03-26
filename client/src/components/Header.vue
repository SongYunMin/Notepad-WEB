<template>
  <section class="main-header">
    <button class="load" type="button">불러오기</button>
    <button class="save" type="button">저장하기</button>
    <button class="addTabBT" type="button">탭 추가</button>
    <button class="logout" type="button">로그아웃</button>
  </section>
</template>

<script>
export default {
  name: "Header"
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