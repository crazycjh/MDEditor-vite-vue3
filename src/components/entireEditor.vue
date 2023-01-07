<template>
  <div class="flex h-full">
    <side-nav></side-nav>
    <!-- <font-awesome-icon icon="fa-solid fa-magnifying-glass" /> -->
    <div class="w-5/6 h-600">
      <control-Cp></control-Cp>
      <md-editor></md-editor>
    </div>
  </div>
</template>

<script>

import mdEditor from "./MdEditor.vue";
import controlCp from "./controlComponent.vue";
import sideNav from "./sideNav/sideNav.vue";

// import { getDatabase,ref as refFirebase, onValue } from "firebase/database";
// import { getAuth } from "firebase/auth";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { initializeApp } from "firebase/app";

// import { useStore } from 'vuex';

export default {
  components: { mdEditor, controlCp, sideNav },
  setup(){
    // const store = useStore();
    
    // console.log(store.state.user.uid);
    // console.log(store.state.database);
    // const firebaseConfig = {
    //   apiKey: "AIzaSyC-41bxctmOjWx5jYAU60fwrNcxNsf1WfM",
    //   authDomain: "vuetest-9eb11.firebaseapp.com",
    //   databaseURL: "https://vuetest-9eb11-default-rtdb.firebaseio.com",
    //   projectId: "vuetest-9eb11",
    //   storageBucket: "vuetest-9eb11.appspot.com",
    //   messagingSenderId: "747842561436",
    //   appId: "1:747842561436:web:7832da0e589242f5055459"
    // };

    // Initialize Firebase
    
    // // const app = initializeApp(firebaseConfig);
  // const app = initializeApp(firebaseConfig)
    // getAuth(app);
  // getAuth();
    // let uid=""
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     uid = user.uid;
    //     console.log("user uid ",uid);
    //     // ...
    //   } else {
    //     // User is signed out
    //     // ...
    //   }
    // });
    

    // const database = getDatabase(app);
    // console.log('database',database);
    
    
   
    
    return {};  
  }
};
</script>
