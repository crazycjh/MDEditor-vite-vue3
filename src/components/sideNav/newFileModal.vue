<template>


<div>
    <Teleport to="body">
        <dialogModal @close="clearModal" :open="visible">
            <label for="fileName">檔名</label>
            <input type="text" placeholder="enter file name" name="fileName" class="ml-4" v-model="inputFileName">
            <div class="flex flex-shrink-0 flex-wrap items-center justify-end ">
                <button @click="clearModal">Cancel</button>
                <button class="px-3
                    py-2.5
                    bg-slate-600
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-slate-700 hover:shadow-lg
                    focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-slate-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out
                    ml-2" @click="createNewHanler">Create</button>
            </div>
            
        </dialogModal>
    </Teleport>
</div>
</template>

<script>
import { writeUserData } from '../FirebaseFunc/firebase';
import { useStore } from 'vuex';
import { ref,watch } from 'vue'
import dialogModal from '../dialog/dialogModal.vue';

export default{
    components:{dialogModal},
    props:['visibleTrigger'],
    setup(props){
        const inputFileName = ref('')
        const store = useStore();
        const visible = ref(false)
        const createNewHanler = ()=>{

            if(inputFileName.value){
                writeUserData(store.state.userid,{fileName:inputFileName.value,data:''});
            }else{
                writeUserData(store.state.userid,{fileName:'undefined',data:''});
            }
            clearModal()
        };
        
        const clearModal = ()=>{
            inputFileName.value = "";
            visible.value = false;
        }
        watch(()=>props.visibleTrigger,()=>{
            visible.value=true;
        })
        return { createNewHanler,inputFileName,clearModal,visible }
    }
}



</script>