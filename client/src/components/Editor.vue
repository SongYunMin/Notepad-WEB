<template>
  <article class="editor-main" ref="showTab">
    <label>
      <input type="text" class="name" placeholder="제목을 입력하세요"/>
      <textarea class="memo" placeholder="메모를 입력하세요"></textarea>
    </label>
  </article>
</template>

<script>
export default {
  name: 'Editor',
  data () {
    return {
      name: '',
      memo: '',
      dom: document.querySelector('.editor-main')
    }
  },
  methods: {
    hide () {
      this.dom.classList.remove('show')
    },
    show () {
      this.dom.classList.add('show')
    },
    render ({name, memo}) {
      this.show()
      this.name = name
      this.memo = memo
    },
    saveData () {
      return {
        name: this.name,
        memo: this.memo
      }
    }
  }
}
</script>

<style scoped>
/*.editor-main {*/
/*  display: none;*/
/*}*/

.editor-main.show {
  display: block;
}

.editor-main .name {
  display: block;
  width: 500px;
  font-size: 250%;
}

.editor-main .memo {
  display: block;
  width: 500px;
  height: 500px;
}
</style>
