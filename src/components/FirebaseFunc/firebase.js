
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getDatabase,ref,set,onValue,remove,get,child} from "firebase/database";
import { store } from "../../store";
 
const firebaseConfig = {
    apiKey: "AIzaSyC-41bxctmOjWx5jYAU60fwrNcxNsf1WfM",
    authDomain: "vuetest-9eb11.firebaseapp.com",
    databaseURL: "https://vuetest-9eb11-default-rtdb.firebaseio.com",
    projectId: "vuetest-9eb11",
    storageBucket: "vuetest-9eb11.appspot.com",
    messagingSenderId: "747842561436",
    appId: "1:747842561436:web:7832da0e589242f5055459"
};

`const store = useStore();`
const app = initializeApp(firebaseConfig);
const db = getDatabase();
export const auth = getAuth(app);

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    }, reject);
  });
}

export async function login(eMail,password) {
    return await signInWithEmailAndPassword(auth, eMail, password)
}

export async function logout() {
    await signOut(auth)
}        
        
export async function writeUserData(userId, para) {  
  if(para){
    await set(ref(db, 'users/' + userId+'/postList/'+para.fileName), para.data);
    store.commit("setChoseFile", para.fileName);
    store.commit('setSaveFlag',false)
  }else{
    throw 'save error, no fileName'
  }
  
}

// export async function createFile(){
//   await set(ref(db, 'user/' + userId+'/postList'), {
//     MD: data.data,    
//   });
// }

export function readUserData(userid,path){
  
  const dbRef = ref(db, 'users/' + userid +'/postList/'+path); //path:post
   //read data and trigger the editor update context
  onValue(dbRef, (snapshot) => {
    
    if(snapshot.val()){
      store.commit('getServerData',snapshot.val())  
    }else{
      store.commit('getServerData','')
    }
  });  
 
  
}

export function readUserPostsList(userid){
  
  const dbRef = ref(db, 'users/' + userid +'/postList'); 
  
  onValue(dbRef, (snapshot) => {
    // console.log(snapshot.val());
    let postJson={}
    if(snapshot.val()){
      const arr = Object.keys(snapshot.val())
      for(const item in arr ){
        postJson[arr[item]]=false;
        
      }
    }    
    // console.log(Object.keys(snapshot.val()));
    store.commit('getServerPostslist',postJson)

});
}

export async function deletePost(userid,path){
  const dbRef = ref(db, 'users/' + userid +'/postList/'+path); //path:post
  await remove(dbRef).then(()=>{
    store.commit("setChoseFile", '');
    store.commit('getServerData','');
    // readUserPostsList(userid);
  })
}

export async function renamePostTitle(userid,oldName,newName){
  
  let newData={}
  const dbRef = ref(db)

  get(child(dbRef, `users/${userid}/postList/${oldName}`)).then(async(snapshot) => {
    if (snapshot.exists()) {
      newData = {fileName:newName,data:snapshot.val()};
      await writeUserData(userid,newData);
      await deletePost(userid,oldName);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);// add modal something went wrong
  });
  
 
}