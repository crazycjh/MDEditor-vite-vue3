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
      
      var cur = editor.getCursor(), token = getToken(editor, cur);
      

      if (/\b(?:string|comment)\b/.test(token.type)) return;
      var innerMode = CodeMirror.innerMode(editor.getMode(), token.state);
      
      if (innerMode.mode.helperType === "json") return;
      token.state = innerMode.state;
  
      // If it's not a 'word-style' token, ignore the token.
      
    //   if (!/^\[\[[\w\+-_&%]+/.test(token.string)) {
      if (!/^[\w$_]*$/.test(token.string)) { //檢查是不是符合英文、數字以及 $ _ 這些字元，如果不是就進來，並且把string清空
        
        token = {start: cur.ch, end: cur.ch, string: "", state: token.state,
                 type: token.string == "." ? "property" : null};
        
      } else if (token.end > cur.ch) {
        
        token.end = cur.ch;
        token.string = token.string.slice(0, cur.ch - token.start);
      }
  
      var tprop = token;
      
      
      // If it is a property, find out what it is a property of.
      while (tprop.type == "property") {
        
        tprop = getToken(editor, Pos(cur.line, tprop.start));
        if (tprop.string != ".") {
            
            return;
        }
        tprop = getToken(editor, Pos(cur.line, tprop.start));
        if (!context) var context = [];
        
        context.push(tprop);
      }
    let list = [];
    if(token.start > 1){  //確認前面兩個字元是不是"[["
        const frontStr1 = JSON.parse(JSON.stringify(cur));
        frontStr1.ch =  token.start;
        const checkBrackets1 = getToken(editor, frontStr1);
        
        if(checkBrackets1.string === '[' && checkBrackets1.end-checkBrackets1.start === 1){
            const frontStr2 = JSON.parse(JSON.stringify(cur));
            frontStr2.ch =  token.start-1;
            
            const checkBrackets2 = getToken(editor, frontStr2);
            if(checkBrackets2.string === '[' && checkBrackets2.end-checkBrackets2.start === 1){
                list  = getCompletions(token, context, keywords, options)
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
    
    
  
    function getCompletions(token, context, keywords, options) {
      
      var found = [] 
      var start = token.string
      var global = options && options.globalScope || window;

      function maybeAdd(str) {
        
        if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str)) found.push(str);   // 確認keywords裡面是否有符合使用者輸入的內容，有的話就塞進found array中以顯示在畫面上 但是不能包含沒有"[["的空字串，不然他會顯示。 
      }
      
      function gatherCompletions(obj) {
        // if (typeof obj == "string") {
        //   console.log('string');
        //   forEach(stringProps, maybeAdd);
        // }else if (obj instanceof Array) {
        //   console.log('array');
        //   forEach(arrayProps, maybeAdd);
        // }else if (obj instanceof Function) {
        //   console.log('function');
        //   forEach(funcProps, maybeAdd);
        // } 
        // forAllProps(obj, maybeAdd)
        // console.log('found 2',found)
      }
  
      // if (context && context.length) {
      //   // If this is a property, see if it belongs to some object we can
      //   // find in the current environment.
      //   console.log('context' ,context);
      //   console.log('context',context);
      //   var obj = context.pop(), base;
      //   if (obj.type && obj.type.indexOf("variable") === 0) {
      //     if (options && options.additionalContext)
      //       base = options.additionalContext[obj.string];
      //     if (!options || options.useGlobalScope !== false)
      //       base = base || global[obj.string];
      //   } else if (obj.type == "string") {
      //     base = "";
      //   } else if (obj.type == "atom") {
      //     base = 1;
      //   } else if (obj.type == "function") {
      //     if (global.jQuery != null && (obj.string == '$' || obj.string == 'jQuery') &&
      //         (typeof global.jQuery == 'function'))
      //       base = global.jQuery();
      //     else if (global._ != null && (obj.string == '_') && (typeof global._ == 'function'))
      //       base = global._();
      //   }
      //   while (base != null && context.length)
      //     base = base[context.pop().string];
      //   if (base != null) gatherCompletions(base);
      // } else {
        
        // If not, just look in the global object, any local scope, and optional additional-context
        // (reading into JS mode internals to get at the local and global variables)
        
        if (!options || options.useGlobalScope !== false)
        // gatherCompletions(global);
        console.log(keywords);
        
            forEach(keywords, maybeAdd);
        
        
      // }
      return found;
    }
  });
  