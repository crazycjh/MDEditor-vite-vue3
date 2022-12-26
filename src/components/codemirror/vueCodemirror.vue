<template>
    <div class="className">
        <textarea ref="codeEditor" placeholder="新想法，從這開始！"></textarea>
    </div>
    

</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, ref, toRefs, watch } from "vue";


import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/lib/ayu-dark.css";
import "codemirror/mode/javascript/javascript.js";

// 收合功能
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/foldgutter.js";


// 搜尋功能
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/match-highlighter.js";
import "codemirror/addon/search/jump-to-line.js";

import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";


import 'codemirror/addon/edit/closebrackets'

// placeholder
import "codemirror/addon/display/placeholder.js";

import "codemirror/addon/selection/active-line.js"; //光标行背景高亮，配置里面也需要styleActiveLine设置为true

export default defineComponent({
  props: {
    modelValue: String,
    defaultValue: String,
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const { modelValue, defaultValue, readOnly,className } = toRefs(props);
    const codeEditor = ref();
    let editor;
    watch(modelValue, () => {
        console.log('codeEditor :', codeEditor);
      if (null != editor && modelValue.value && modelValue.value !== editor.getValue()) {
        // 触发v-model的双向绑定
        
        editor.setValue(modelValue.value);
      }
    });
    watch(readOnly, () => {
      if (null != editor) {
        editor.setOption("readOnly", readOnly.value);
      }
    });
    onMounted(() => {
      editor = CodeMirror.fromTextArea(codeEditor.value, {
        value: modelValue.value,
        mime: "text/javascript",
        indentWithTabs: false, // 在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false
        smartIndent: true, // 自动缩进，设置是否根据上下文自动缩进（和上一行相同的缩进量）。默认为true
        lineNumbers: true, // 是否在编辑器左侧显示行号
        matchBrackets: true, // 括号匹配
        readOnly: readOnly.value,
        // 启用代码折叠相关功能:开始
        foldGutter: true,
        lineWrapping: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
        // 启用代码折叠相关功能:结束
        styleActiveLine: true, // 光标行高亮,
        theme:'ayu-dark',
        autoCloseBrackets:'true', //自動完成括號
        // direction:"rtl"
      });
      // 监听编辑器的change事件
      
      editor.on("change", () => {
        // 触发v-model的双向绑定
        
        // console.log('getValue',editor.doc.getValue());
        // console.log('getValue without doc',editor.getValue());
        context.emit("update:modelValue", editor.getValue());
      });
      editor.on('cursorActivity',()=>{
        
        // editor.replaceSelection('test_string')
      })
      if (defaultValue.value) {
        editor.setValue(defaultValue.value);
      }
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