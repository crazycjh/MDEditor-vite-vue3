
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getDatabase,ref,set,onValue} from "firebase/database";
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
  console.log('write')
  await set(ref(db, 'users/' + userId+'/postList/'+para.fileName), para.data);
  store.commit('setSaveFlag',false)
}

// export async function createFile(){
//   await set(ref(db, 'user/' + userId+'/postList'), {
//     MD: data.data,    
//   });
// }

export function readUserData(userid,path){
  
  const starCountRef = ref(db, 'users/' + userid +'/postList/'+path); //path:post
  console.log('path ',path);
  console.log('userid ',userid);
  onValue(starCountRef, (snapshot) => {
    // console.log(snapshot.val());
    console.log(snapshot.val())
    store.commit('getServerData',snapshot.val())

});
}

export function readUserPostsList(userid){
  
  const starCountRef = ref(db, 'users/' + userid +'/postList'); 
  
  onValue(starCountRef, (snapshot) => {
    // console.log(snapshot.val());
    
    const arr = Object.keys(snapshot.val())
    let postJson = {}
    for(const item in arr ){
      postJson[arr[item]]=false;
      
    }
    console.log(Object.keys(snapshot.val()));
    store.commit('getServerPostslist',postJson)

});
}

