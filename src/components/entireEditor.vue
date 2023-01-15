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

export default {
  components: { mdEditor, controlCp, sideNav },
  setup(){
    return {};  
  }
};
</script>
