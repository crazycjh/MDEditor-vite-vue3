// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/5/LICENSE

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
      mod(require("codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
      define(["../../lib/codemirror"], mod);
    else // Plain browser env
      mod(CodeMirror);
  })(function(CodeMirror) {
    
    var Pos = CodeMirror.Pos;
  
    function forEach(arr, f) {
      for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
    }
  
    function arrayContains(arr, item) {
      if (!Array.prototype.indexOf) {
        var i = arr.length;
        while (i--) {
          if (arr[i] === item) {
            return true;
          }
        }
        return false;
      }
      return arr.indexOf(item) != -1;
    }
  
    function scriptHint(editor, keywords, getToken, options) {
      // Find the token at the cursor
      let list = [];
      var cur = editor.getCursor(), token = getToken(editor, cur);
      
      if (!/^[\w$_]*$/.test(token.string)) { //檢查是不是符合英文、數字以及 $ _ 這些字元，如果不是就進來，並且把string清空
        
        token = {start: cur.ch, end: cur.ch, string: "", state: token.state,
                 type: token.string == "." ? "property" : null};
        
      } else if (token.end > cur.ch) {
        token.end = cur.ch;
        token.string = token.string.slice(0, cur.ch - token.start);
      }
  
      
    
    if(token.start > 1){  //確認前面兩個字元是不是"[["
        const frontStr1 = JSON.parse(JSON.stringify(cur));
        frontStr1.ch =  token.start;
        const checkBrackets1 = getToken(editor, frontStr1);
        
        if(checkBrackets1.string === '[' && checkBrackets1.end-checkBrackets1.start === 1){
            const frontStr2 = JSON.parse(JSON.stringify(cur));
            frontStr2.ch =  token.start-1;
            
            const checkBrackets2 = getToken(editor, frontStr2);
            
            if(checkBrackets2.string === '[' && checkBrackets2.end-checkBrackets2.start === 1){
                list  = getCompletions(token, keywords, options)
            }
            
            
        }else{
            token = {start: cur.ch, end: cur.ch, string: "", state: token.state,
                    type: token.string == "." ? "property" : null};
        }
    }else{
        token = {start: cur.ch, end: cur.ch, string: "", state: token.state,
                    type: token.string == "." ? "property" : null};
       
    }
    
      
      return {list: list,
              from: Pos(cur.line, token.start),
              to: Pos(cur.line, token.end)};
    }
    
    function javascriptHint(editor, options) {
      
      
      return scriptHint(editor, options.keyword,
        function (e, cur) {
            return e.getTokenAt(cur);
        },
        options);
    };
    CodeMirror.registerHelper("hint", "javascript",javascriptHint);
    
    
  
    function getCompletions(token, keywords, options) {
      
      var found = [] 
      var start = token.string
      var global = options && options.globalScope || window;
      
      function maybeAdd(str) {
        
        if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str)) 
        {
          found.push(str);
        }   // 確認keywords裡面是否有符合使用者輸入的內容，有的話就塞進found array中以顯示在畫面上 但是不能包含沒有"[["的空字串，不然他會顯示。 
        
      }
        forEach(keywords, maybeAdd);

      // }
      return found;
    }
  });
  