<template>
    <div class="flex justify-start">
    <div class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
        
        <button type="button" class="inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-slate-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out"  @click="appendSomething('#','head','one')">
            <div class="flex">
                <font-awesome-icon icon="fa-solid fa-heading" />
                <div>1</div>
            </div>
        </button>
        <button type="button" class="inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-slate-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out" @click="appendSomething('##','head','one')">
            <div class="flex">
                <font-awesome-icon icon="fa-solid fa-heading" />
                <div>2</div>
            </div>
        </button>
        <button type="button" class="inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-slate-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out" @click="appendSomething('###','head','one')">
            <div class="flex">
                <font-awesome-icon icon="fa-solid fa-heading" />
                <div>3</div>
            </div>
        </button>
        <button type="button" class="inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-slate-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out" @click="appendSomething('####','head','one')">
            <div class="flex">
                <font-awesome-icon icon="fa-solid fa-heading" />
                <div>4</div>
            </div>
        </button> 
        <button type="button" class="inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-slate-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out " @click="appendSomething('*','both','one')" >
            <div class="flex">
                <font-awesome-icon icon="fa-solid fa-italic"  />
            </div>
        </button>
        <button type="button" class=" inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-slate-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out" @click="appendSomething('-','head','multi')"><font-awesome-icon icon="fa-solid fa-list"  /></button>
        <button type="button" class="inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-slate-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out" @click="appendSomething('num','head','multi')"><font-awesome-icon icon="fa-solid fa-list-ol" /></button>
        <button type="button" class=" inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-slate-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out"><font-awesome-icon icon="fa-solid fa-link" /></button>
        <button type="button" class=" inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-slate-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out"><font-awesome-icon icon="fa-solid fa-image" /></button>
        <button type="button" class=" inline-block px-6 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-slate-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out" @click="appendSomething('```','both','one')"><font-awesome-icon icon="fa-solid fa-code" /></button>
        
    </div>
    </div>


</template>

<script>
import { useStore } from 'vuex';
export default{
    setup(){
        const store  = useStore();
        const appendSomething = (symbol,type,line)=>{
            // store.commit('appendEditorText',{type:,line:})
            console.log('appendEditorText');
            if(store.state.choseFileName !==""){
                store.commit('appendEditorText',{symbol:symbol,type:type,line:line})
            }
            
        }
        return {appendSomething}
    }
}


</script>