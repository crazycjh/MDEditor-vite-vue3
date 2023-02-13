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

中文簡介：

1.以Firebase 提供的功能當作後端串接前端，支援帳號登入驗證、資料讀取/寫入，在資料部分使用Realtime database功能，並且可以依照使用者個別存取資料。

2.編輯器使用Codemirror version5，Markdown編譯引擎選擇”Marked”，在codemirror編輯器輸入文字同時會把文字透過marked API轉換成對應的HTML code並顯示在畫面右邊。

3.新增功能：藉由修改codemirror裡面的showHint功能，把此功能改成當前流行的MD軟體(obsidian)裡面的”文章連結”，當在編輯器輸入兩個中括號 “ [[ ]] “，就會跳出在文章列表中其他文章待選。在右側HTML code的部分會顯示可點擊連結，點擊後會直接跳轉到對應的文章。

4.可透過編輯器上方按鈕插入markdown語法，也可框選文字後插入語法。