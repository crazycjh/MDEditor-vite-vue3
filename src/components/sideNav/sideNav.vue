<template>
  <div
    class="w-2/12 h-full shadow-md bg-white overflow-scroll sidenavSize"
    id="sidenavSecExample"
  >
    <new-file-modal :visibleTrigger="visibleTrigger" />
    <rename-file-modal :itemName="itemName" :visibleTrigger="renameVisibleTrigger"/>
    <div class="pt-4 pb-2 px-6">
      <a href="#!">
        <div class="flex items-center">
          <div class="shrink-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
              class="rounded-full w-10"
              alt="Avatar"
            />
          </div>
          <div class="grow ml-3">
            <p class="text-sm font-semibold text-blue-600">{{}}</p>
            <div class="flex">
              <font-awesome-icon
                @click="logoutHandler"
                icon="fa-solid fa-arrow-right-from-bracket"
              />
              <p
                @click="logoutHandler"
                class="text-xs font-semibold text-black-400"
              >
                logout
              </p>
              <font-awesome-icon
                icon="fa-solid fa-file"
                class="ml-3"
                @click="saveHandler"
              ></font-awesome-icon>
              <p
                class="text-xs font-semibold text-black-400 ml-0.5"
                @click="saveHandler"
              >
                save
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
    <ul class="relative px-1">
      <li class="h-3"></li>
      <!-- <li class="relative"> -->
      <li
        v-for="item in Object.keys(store.state.serverPostListUpdated)"
        :key="item"
        class="relative h1"
      >
        <div class="flex">
          <a
            @click="fileHandler(item)"
            :class="{ 'bg-slate-300': store.state.serverPostListUpdated[item] }"
            class="flex items-center text-sm px-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap w-11/12"
            href="#!"
          >
            <div class="overflow-hidden mr-1">
              <font-awesome-icon
                icon="fa-solid fa-file"
                class="mr-3"
                @click="saveHandler"
              ></font-awesome-icon
              ><span class="overflow-hidden">{{ item }}</span>
            </div>
          </a>
          <div
            @click="itemMenu(item)"
            class="float-right w-1/12 cursor-pointer"
          >
            <div class="flex justify-center">
              <div>
                <div class="dropdown relative">
                  <font-awesome-icon
                    icon="fa-solid fa-bars"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></font-awesome-icon>
                  <ul
                    class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        @click="deleteFile(item)"
                        >Delete</a
                      >
                    </li>
                    <li>
                      <a
                        class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        @click="updateFile(item)"
                        >Rename</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <a
          @click="newOneHandler()"
          class="flex items-center text-sm px-6 pt-1 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap transition duration-150 cursor-pointer ease-in-out"
        >
          <font-awesome-icon icon="fa-solid fa-plus fa-2xl " /><span
            class="pl-1"
          >
            Create new file</span
          >
        </a>
      </li>

    </ul>
  </div>
</template>

<script>
import { logout, readUserPostsList,deletePost } from "../FirebaseFunc/firebase";
import newFileModal from "./newFileModal.vue";
import renameFileModal from './renameFileModal.vue'
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
export default {
  components: { newFileModal,renameFileModal },
  setup() {
    // const router = useRouter();
    const store = useStore();
    const router = useRouter();

    const sidaNavSize = ref("100%");
    const visibleTrigger = ref(true);
    const renameVisibleTrigger = ref(true);
    const itemName = ref('');
    
    const logoutHandler = async () => {
      await logout();
      router.push({ path: "/auth" });
    };
    const saveHandler = () => {
      if(store.state.choseFileName){
        store.commit("setSaveFlag", true);
      }else{
        console.log('?????????????????????');
      }
      
    };
    const fileHandler = (item) => {
      store.commit("setChoseFile", item);
    };
    const newOneHandler = () => {
      visibleTrigger.value = !visibleTrigger.value;
    };

    const itemMenu = (item) => {
      console.log(item);
    };

    const deleteFile = async (fileName) => {
      //delete
      
      await deletePost(store.state.userid,fileName);
    };

    const updateFile = async (item) => {
      renameVisibleTrigger.value = !renameVisibleTrigger.value;
      
      itemName.value = item; 
    };
    
    if (store.state.loggedIn) {
      readUserPostsList(store.state.userid);
    }

    onMounted(() => {
      window.addEventListener("resize", () => {
        //detect the browser resize to the sideNav
        sidaNavSize.value = window.innerHeight * 0.95 + "px";
      });
    });

    return {
      logoutHandler,
      saveHandler,
      store,
      visibleTrigger,
      fileHandler,
      newOneHandler,
      itemMenu,
      deleteFile,
      updateFile,
      renameVisibleTrigger,
      itemName
    };
  },
};
</script>

<style scoped>
.clickani {
  background-color: burlywood;
}

.sidenavSize {
  height: v-bind(sidaNavSize);
}
</style>
