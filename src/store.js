import { createStore } from 'vuex'
import {readUserData} from './components/FirebaseFunc/firebase'

export const store = createStore({
    state(){
        return{
            user:"",
            database:"22",
            loggedIn:false,
            userid:'',
            saveFlag:false, //trigger save process
            serverDataUpdated:"", //data of post
            serverPostListUpdated:{}, //postList
            choseFileName:'',
        };
    },
    mutations:{
        storeuser(state,para){
            state.user=para;
            
        },
        storeDb(state,para){
            state.database = para
            
        },
        setLoginState(state,para){
            state.loggedIn=para.login;
            state.userid =para.uid;
        },
        saveToFirebase(){
            
        },
        setSaveFlag(state,para){
            console.log("mutation para ",para)
            state.saveFlag=para;
        },
        getServerData(state,para){
            // console.log(Object.keys(para));
            console.log(para);
            state.serverDataUpdated = para;
        },
        getServerPostslist(state,para){
            console.log(para);
            state.serverPostListUpdated = para;
        },
        setChoseFile(state,para){
            //set the flag for the file that be chosen
            
            console.log('set choose ',para )
            if(para){
                state.serverPostListUpdated[para] = true;
                if(state.choseFileName !== para ){ //prev chose !== current choose
                    readUserData(state.userid,para) 
                    if(state.choseFileName){
                        if(state.choseFileName !== state.serverPostListUpdated[para]){
                            state.serverPostListUpdated[state.choseFileName]=false;
                            state.choseFileName = para
                        }
                        
                    }else{
                        state.choseFileName = para
                    }
                }
            }
            else{ //none
                state.choseFileName = para;
            }
        }
        
        
        
    },
    actions:{
        setLoginState({commit},para){
            commit('setLoginState',para);
            
        },
        saveToFirebase({commit}){
            commit('saveToFirebase');
            
        }
    }
        

});