import { createStore } from 'vuex'
import {readUserData} from './components/FirebaseFunc/firebase'

export const store = createStore({
    state(){
        return{
            user:"",
            loggedIn:false,
            userid:'',
            saveFlag:false, //trigger save process
            serverDataUpdated:"", //data of post
            serverPostListUpdated:{}, //postList
            choseFileName:'',
            editorInsatance:'',
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
            state.saveFlag=para;
        },
        getServerData(state,para){

            state.serverDataUpdated = para;
        },
        getServerPostslist(state,para){

            state.serverPostListUpdated = para;
        },
        setChoseFile(state,para){
            //set the flag for the file that be chosen
            if(para){
                state.serverPostListUpdated[para] = true;
                if(state.choseFileName !== para ){ //prev chose !== current choose
                    readUserData(state.userid,para) 
                    if(state.choseFileName){
                        // if(state.choseFileName !== state.serverPostListUpdated[para]){
                            state.serverPostListUpdated[state.choseFileName]=false;
                            state.choseFileName = para
                        // }
                        
                    }else{
                        state.choseFileName = para
                    }
                }
            }
            else{ //none
                state.choseFileName = para;
            }
        },
        assignEditorInstance(state,cm){
            state.editorInsatance = cm;
        },
        appendEditorText(state,para){
            let str = state.editorInsatance.getSelections()
            let arrStr=[];
            
            
            if(str[0]!==''){
                if(str[0]){
                    arrStr = str[0].split('\n');
                    
                }
                if(para.type === 'head'){ //start side
                    if(para.line === 'one'){ //one line
                        arrStr[0] = para.symbol+" "+arrStr[0];
    
                        state.editorInsatance.replaceSelection(arrStr.join('\n'),'around');
                    }else if(para.line === 'multi'){ //multi line
                        for(let i=0;i<arrStr.length;i++){
                            if(arrStr[i] !== ''){
                                if(para.symbol === 'num'){
                                    arrStr[i]= i+1 +'. '+arrStr[i] 
                                }else{
                                    arrStr[i]= para.symbol+' '+arrStr[i] 
                                }
                            }
                        }
                        let replaceArr = [];
                        replaceArr[0] = arrStr.join(' \n')
                        state.editorInsatance.replaceSelection(replaceArr[0],'around');
                        
                    }
                }else if(para.type === 'both'){ //both side
                    if(para.line === 'one'){ //one line
                        console.log();
                    }else if(para.line === 'multi'){ //multi line
                        console.log();
                    }
                }else if(para.type === 'link'){
                    console.log();
                }else if(para.type === 'photo'){
                    console.log();
                }
            }else{
                if(para.symbol === 'num'){
                    state.editorInsatance.replaceSelection('1.')
                }else{
                    if(para.type === 'head'){
                        state.editorInsatance.replaceSelection(para.symbol)
                    }else if(para.type === 'both'){
                        state.editorInsatance.replaceSelection(para.symbol+ para.symbol)
                    }
                    
                }
                
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