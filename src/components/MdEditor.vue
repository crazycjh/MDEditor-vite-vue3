<template>
  <div class="markdown-content flex">
    <div class="w-1/2 overflow-auto h-600">
      <VueCodemirror
        className="codemirror"
        v-model="codeRef"
        default-value="```  let test='abc'   ```"
        :read-only="readOnly"
      />
    </div>
    <div
      class="markdown-preview markdown-theme-light w-1/2 overflow-auto md-size"
      style="background-color: #f9f9f9"
    >
      <div v-html="markedCompile"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import VueCodemirror from "./codemirror/vueCodemirror.vue"; // @ is an alias to /src
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getDatabase,
  ref as refFirebase,
  onValue,
  set,
} from "firebase/database";

export default {
  components: {
    VueCodemirror,
  },
  setup() {
    const codeRef = ref("");
    const readOnly = ref(false);
    const message = ref("");
    let app = "";
    const mdSize = ref("");
    let user;
    const onChangeCodeContent = () => {
      codeRef.value = `const test='你好世界';`;
    };
    const onSetReadOnly = () => {
      readOnly.value = !readOnly.value;
      console.log("xxx", readOnly.value);
    };
    const markedCompile = computed(() => {
      // console.log(codeRef.value);
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          console.log("code code ", code);
          // const language = hljs.getLanguage(lang) ? lang : 'plaintext';

          return hljs.highlightAuto(code).value;
        },
        langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartypants: false,
        xhtml: false,
      });
      const htmlcode = marked.parse(codeRef.value);
      console.log(htmlcode);
      return htmlcode;
      // console.log();
    });
    onMounted(() => {
      //resize preview 
      window.addEventListener('resize',()=>{
        //detect the browser resize to the editor
        mdSize.value = (window.innerHeight*0.95)+'px'; 
      })
    })
    return {
      codeRef,
      readOnly,
      onChangeCodeContent,
      onSetReadOnly,
      markedCompile,
      message,
      mdSize,
    };
  },
};
</script>

<style scoped lang="less">
:global(pre) {
  background: #8f7ab3;
  overflow-x: auto;
}

:deep(.codeclass) {
  width: 50%;
}
:deep(.markdown-content) {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  padding-bottom: 0;
  .codemirror {
    flex: 1;
    height: 100%;
    overflow: auto;
  }

  .markdown-preview {
    flex: 1;
    height: 100%;
  }
}

.md-size {
  width:mdSize;
}
@import "../assets/css/light";
@import "../assets/css/theme";

@import "../assets/css/index";
</style>
