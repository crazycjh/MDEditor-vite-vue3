<template>
    <div class="className">
        <textarea id="codemirrortext" ref="codeEditor" placeholder="新想法，從這開始！"></textarea>
    </div>
    

</template>

<script>
import { onBeforeUnmount, onMounted, ref, toRefs, watch } from "vue";

import {useStore} from 'vuex'

import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/lib/ayu-dark.css";
import "codemirror/mode/javascript/javascript.js";

//fold
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/foldgutter.js";


//search
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/match-highlighter.js";
import "codemirror/addon/search/jump-to-line.js";

import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";



import "codemirror/addon/hint/javascript-hint.js"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/show-hint.css"

import 'codemirror/addon/edit/closebrackets'

// placeholder
import "codemirror/addon/display/placeholder.js";

import "codemirror/addon/selection/active-line.js"; //光标行背景高亮，配置里面也需要styleActiveLine设置为true

export default ({
  props: {
    modelValue: String,
    defaultValue: String,
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const { modelValue,className } = toRefs(props);
    const codeEditor = ref();
    let editor;
    
    const store = useStore()
    
    watch(modelValue, () => {
      if (null != editor && modelValue.value && modelValue.value !== editor.getValue()) {
      //check new data
        editor.setValue(modelValue.value);
      }
    });
    
    watch(()=>store.state.choseFileName,()=>{
      if(store.state.choseFileName){
        if (null !== editor) {
          editor.setOption("readOnly", false);
        }
      }else{
        editor.setOption("readOnly", true);
      }
    })
    watch([()=>store.state.serverPostListUpdated,()=>store.state.choseFileName],()=>{
      const postList = Object.keys(store.state.serverPostListUpdated);
      const index = postList.indexOf(store.state.choseFileName);
      if(index > -1){
        postList.splice(index,1);
      }
      editor.setOption('hintOptions',{completeSingle: false, keyword: postList})
    })
    
    
    watch(()=>[store.state.serverDataUpdated,store.state.choseFileName],()=>{
      console.log('watch server data ',store.state.serverDataUpdated)
      if(editor){
        editor.setValue((store.state.serverDataUpdated));
      }
    })
    
    
    
    onMounted(async() => {
      // editor = CodeMirror.fromTextArea(codeEditor.value, {
        console.log('edit onMounted')
        editor = CodeMirror.fromTextArea(document.getElementById('codemirrortext'), {  
        value: modelValue.value,
        mime: "text/html",
        indentWithTabs: false, 
        smartIndent: true,
        lineNumbers: true, 
        matchBrackets: true, 
        readOnly: true,
        foldGutter: true,
        lineWrapping: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
        styleActiveLine: true, // cusor line highlight
        theme:'ayu-dark',
        autoCloseBrackets:'true', 
        // direction:"rtl"
        hintOptions: {
          completeSingle: false,
        },
      });
      // 监听编辑器的change事件
      console.log(window.screen.height);
      store.commit('assignEditorInstance',editor);
      editor.setSize('auto',(window.innerHeight*0.95)+'px')
      editor.setOption('hintOptions',{completeSingle: false, keyword: ['[[test','string','123','abc']})
      editor.on("change", () => {
        // 触发v-model的双向绑定
        context.emit("update:modelValue", editor.doc.getValue());
      });
      editor.on('cursorActivity',()=>{
        editor.showHint();
        // editor.replaceSelection('test_string')
      })

      // editor.on('blur',()=>{
      //   // editor.replaceSelection('')
      //   console.log(" getSelections ", editor.getSelections());
        
      // })
      console.log("read data in onmounted");

      


      window.addEventListener('resize',()=>{
        //detect the browser resize to the editor
        if(editor){
          editor.setSize('auto',(window.innerHeight*0.95)+'px')
        }
        
      })

    });
    onBeforeUnmount(() => {
      if (null !== editor) {
        editor.toTextArea();
        editor = null;
      }
    });
    return { codeEditor, className};
  }
});


</script>
<style scoped>

</style>