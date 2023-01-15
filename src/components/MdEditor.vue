<template>
  <div class="markdown-content flex " >
    <div class="w-1/2 overflow-auto h-600">
      <VueCodemirror
        className="codemirror"
        v-model="codeRef"
        default-value="```  let test='abc'   ```"
      />
    </div>
    <div
      class="markdown-preview markdown-theme-light w-1/2 overflow-auto "
      :style="{ height: mdSize }"
      
    >
      <div v-html="markedCompile"></div>
    </div>
  </div>
</template>
<!-- :style="{ 'height': mdSize }" -->
<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import VueCodemirror from "./codemirror/vueCodemirror.vue"; // @ is an alias to /src
import { getCurrentUser, writeUserData } from "./FirebaseFunc/firebase";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

export default {
  components: {
    VueCodemirror,
  },
  setup() {
    const codeRef = ref("");
    const message = ref("");
    // let app = "";
    const mdSize = ref('');
    const outgoLinkHTML = ref('');

    const store = useStore();
    watch(
      () => store.state.saveFlag,
      async () => {
        //add the spin animation
        if(store.state.saveFlag){
          const user = await getCurrentUser();
          await writeUserData(user.uid, {
          fileName: store.state.choseFileName,
          data: codeRef.value,
        });
        }
        
      }
    );


    //set the marked editor
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
      breaks: true,
      sanitize: false,
      smartypants: false,
      xhtml: false,
    });

    

    const outgolink = {
      name: 'outgolink',
      level: 'inline',
      start(src) {
        return src.match(/^\[{2}/)?.index;  
      },
      tokenizer(src) {
        const rule = /(^\[{2})([^[\]]+)(\]{2})/;
        const match = rule.exec(src);
        console.log('match ',match);
        if (match) {
          return {
            type: 'outgolink',
            raw: match[0],
            text: match,
          };
        }
        return null;
      },
      renderer(token) {
        outgoLinkHTML.value = `<a href="#" style="color:blue;text-decoration:underline;" class="outingLink" >${token.text[2]}</a>` 
        // outgoLinkHTML.value = `<span style="color:blue;text-decoration:underline;" @click="outgoingClick(token.text[2])" >${token.text[2]}</span>` 
        return outgoLinkHTML.value
            
        },
    };
    
    document.addEventListener("click",(event)=>{
      if(event.target.matches(".outingLink")){
        store.commit('setChoseFile',event.target.textContent);
      }
    })

 
    marked.use({
      extensions: [outgolink],
    });

    //compile the text from marked editor
    const markedCompile = computed(() => {
      const htmlcode = marked.parse(codeRef.value);
      return htmlcode;
    });

    onMounted(() => {
      //resize preview
      mdSize.value = window.innerHeight * 0.95 + "px"
      console.log(' mdSize.value', mdSize.value)
      window.addEventListener("resize", () => {
        //detect the browser resize to the editor
        mdSize.value = window.innerHeight * 0.95 + "px";
        console.log(mdSize.value,' mdSize.value')

      });
    });
    return {
      codeRef,
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
    
    overflow: auto;
  }

  .markdown-preview {
    flex: 1;
    
  }
}
.md_size{
  height:v-bind(mdSize);
}

@import "../assets/css/light";
@import "../assets/css/theme";

@import "../assets/css/index";
</style>
