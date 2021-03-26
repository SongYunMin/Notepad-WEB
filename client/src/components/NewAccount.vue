<template>
  <header class="newAccount-title">
    <p>New Account</p>
  </header>
  <article class="newAccount-main">
    <ul class="newAccount-box">
      <li class="newAccount-id">
        <span class="newAccount-text">ID</span>
        <input class="newAccount-idInput" type="text"/>
        <button class="newAccount-doubleCheck">중복확인</button>
      </li>
      <li class="newAccount-pw">
        <span class="newAccount-text">PW</span>
        <input class="newAccount-pwInput" type="password"/>
      </li>
      <li class="newAccount-pwck">
        <span class="newAccount-text">PW-Check</span>
        <input class="newAccount-pwckInput" type="password"/>
      </li>
      <li class="newAccount-nickname">
        <span class="newAccount-text">Nickname</span>
        <input class="newAccount-nicknameInput" type="text"/>
      </li>
    </ul>
    <button class="newAccount-submit">Sign Up</button>
  </article>
</template>

<script>
export default {
  name: "NewAccount"
}
</script>

<style scoped>

</style>