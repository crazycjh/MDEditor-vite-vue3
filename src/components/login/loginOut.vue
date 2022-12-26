<script>
  import { initializeApp } from "firebase/app";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  
export default({


setup(){


onMounted(()=>{
        const firebaseConfig = {

          apiKey: "AIzaSyC-41bxctmOjWx5jYAU60fwrNcxNsf1WfM",
          authDomain: "vuetest-9eb11.firebaseapp.com",
          databaseURL: "https://vuetest-9eb11-default-rtdb.firebaseio.com",
          projectId: "vuetest-9eb11",
          storageBucket: "vuetest-9eb11.appspot.com",
          messagingSenderId: "747842561436",
          appId: "1:747842561436:web:a2d3036f17428e60055459",
          databaseURL: "https://vuetest-9eb11-default-rtdb.firebaseio.com/",

        };
        // Initialize Firebase
        
        app = initializeApp(firebaseConfig);
        const auth = getAuth();
        const pw = 123456;
        
        //login with email and password
        signInWithEmailAndPassword(auth, 'bb@bb.com', pw)
        .then((userCredential) => {
          // Signed in 
          user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
        

        
        // console.log('database',database);
      });
    }

})      
</script>