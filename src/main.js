import { createApp } from "vue";
import "./style.css";
import "tw-elements";
import App from "./App.vue";
import { store } from "./store";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import {
  faHeading,
  faArrowRightFromBracket,
  faMagnifyingGlass,
  faFile,
  faPlus,
  faBars,
  faItalic,
  faList,
  faListOl,
  faLink,
  faImage,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

import { createRouter, createWebHistory } from "vue-router";

import authicationLogin from "./components/login/authicationLogin.vue";
import entireEditor from "./components/entireEditor.vue";
import { getCurrentUser } from "./components/FirebaseFunc/firebase";
// import {getAuth, onAuthStateChanged } from "firebase/auth";
// import {getAuth } from "firebase/auth";
// import { initializeApp } from "firebase/app";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/auth" },
    {
      path: "/auth",
      component: authicationLogin,
      beforeEnter: (to, from, next) => {

        if (store.state.loggedIn) {

          // next('/editor')
          next("/editor");
          return;
          //login is true redirect from auth to editor
        } else {
          next();
          return;
        }
      },
    },
    {
      path: "/editor",
      component: entireEditor,
      beforeEnter: (to, from, next) => {
        next();
        return;
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const user = await verifyUser();

  if (to.path !== "/auth") {
    if (user) {
      store.dispatch("setLoginState", { login: true, uid: user.uid });
      next();
      return;
    } else {
      store.dispatch("setLoginState", { login: false, uid: "" });
      next("/auth");
      return;
    }
  } else {
    if (user) {
      store.dispatch("setLoginState", { login: true, uid: user.uid });
    } else {
      store.dispatch("setLoginState", { login: false, uid: "" });
    }
    next();
    return;
  }
});

const verifyUser = async () => {
  return await getCurrentUser();
};

library.add([
  faHeading,
  faArrowRightFromBracket,
  faMagnifyingGlass,
  faBars,
  faItalic,
  faFile,
  faPlus,
  faFile,
  faList,
  faListOl,
  faLink,
  faImage,
  faCode


]);
const app = createApp(App);
app.use(router);
app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

// initializeApp(firebaseConfig)
// const auth = getAuth();

// onAuthStateChanged(auth, (user) => {
//    //beforeEach
//     router.beforeEach((to)=>{
//         console.log(!to.path==='/editor')
//         if(to.path !=='/auth'){
//             if(user) {
//                 store.dispatch('setLoginState',{'login':true,'uid':user.uid})
//                 console.log('user',user)
//                 return true;
//             }
//             else{
//                 store.dispatch('setLoginState',{'login':false,"uid":""})
//                 return ('/auth')
//             }
//         }
//         else{
//             return true;
//         }
//     })

// })
