##### Demo : https://vue-mdeditor.web.app
##### 技術筆記 : https://reurl.cc/MR7dem

# MDEditor-vite-vue3

### Description
this is a editor for Markdown, you can save the document to firebase.
It's mean you can access the document what you save in cloud server.
Before access the user have to login first.

### Tech stack 
- Editor : Codemirror version 5
- Markdown : [Marked](https://marked.js.org/)
- vue3 (composition)
    - vuex
    - vue router
vite
Tailwind
Tailwind Element

### Feature
##### OutgoingLink Hint
when you type double brackets ' [ ' , the Codemirror will pop up the hint list.
The list is about user document list. At the right hand side(Markdown preview block) will show a clickable item after user fill the name of the document or click it.
I made it by modify the Codemirror hint function and add a new one markdown rule for the marked preview.
##### login/logout via firebase


### Notice
there is a showHint code for the codemirror named javacripte-hint.js in the root diretory.
You can put the file to node_modules/codemirror/hint/ to replace the original one.
Then you will get a document list hint function.
I am looking for the method the add the function as nomal way.

