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
            // 開頭 heading(單行)、list、number list(可多行)
            // 前後 斜體、粗體、code(多單行都可以)
            //type 1 : 開頭 多行：判斷是否要每行都要加 單行：加
            //type 2 : 前後皆有 多行
            let str = state.editorInsatance.getSelections()
            console.log('str ',str)
            let arrStr=[];
            
            console.log(para.type);
            if(str[0]!==''){
                if(str[0]){
                    arrStr = str[0].split('\n');
                    console.log(arrStr);
                }
                if(para.type === 'head'){ //start side
                    if(para.line === 'one'){ //one line
                        arrStr[0] = para.symbol+" "+arrStr[0];
    
                        state.editorInsatance.replaceSelection(arrStr.join('\n'));
                        console.log("head, one",para.symbol);
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
                        state.editorInsatance.replaceSelection(replaceArr[0]);
                        
                    }
                }else if(para.type === 'both'){ //both side
                    if(para.line === 'one'){ //one line
                        console.log("both, one",para.symbol);
                    }else if(para.line === 'multi'){ //multi line
                        console.log("both, multi",para.symbol);
                    }
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
            
            console.log(state.editorInsatance.getSelections());
            
            //head(each line or not) / around :head and tail
            
            // state.editorInsatance.replaceSelection('# '+state.editorInsatance.getSelection());
            //type:
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