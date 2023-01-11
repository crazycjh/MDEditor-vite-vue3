<template>
  <div>
    <Teleport to="body">
      <dialogModal @close="clearModal" :open="visible">
        <label for="fileName">重新命名</label>
        <input
          type="text"
          placeholder="enter new file name"
          name="fileName"
          class="ml-4"
          v-model="inputFileName"
        />
        <div class="flex flex-shrink-0 flex-wrap items-center justify-end">
          <button @click="clearModal" disabled>Cancel</button>
          <button
            class="px-3 py-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out ml-2 " 
            @click="updateFile()"
          >
            Enter
          </button>
        </div>
      </dialogModal>
    </Teleport>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref,watch, computed } from "vue";
import dialogModal from "../dialog/dialogModal.vue";
import { renamePostTitle } from '../FirebaseFunc/firebase'
export default {
  components: { dialogModal },
  props: ["visibleTrigger",'itemName'],
  setup(props) {
    const inputFileName = ref("");
    const store = useStore();
    const visible = ref(false);
    const updateFile = async () => {
      if (inputFileName.value) {
        console.log('props.itemName ',props.itemName);
        await renamePostTitle(
          store.state.userid,
          props.itemName,
          inputFileName.value
        );
        store.commit("setChoseFile", "");
        clearModal();
      } else {
        console.log("不可為空值");
      }
    };
    const disabledButton = computed(() => {
      console.log('disabledButton ',inputFileName.value)
        if (inputFileName.value) {
        return false;
      } else {
        return true;
      }
    });

    const clearModal = () => {
      inputFileName.value = "";
      visible.value = false;
    };
    watch(
      () => props.visibleTrigger,
      () => {
        visible.value = true;
      }
    );
    return { updateFile, inputFileName, clearModal, visible, disabledButton };
  },
};
</script>
