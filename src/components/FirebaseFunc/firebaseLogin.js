import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const login = ()=>{
    initializeApp(firebaseConfig)
    
    
    const auth = getAuth();
    // account.value  = ''
    // passWord.value = '123456';
    
    //login with email and password
    signInWithEmailAndPassword(auth, 'aaa@bbbb.com', '123456')
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      //save the user data from firebase      
      store.commit('storeuser',user);
      
      router.push({path:'/editor'});
      
      // console.log('user ',user);
      // ...
    })
    .catch(() => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
    });
}