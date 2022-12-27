<template>
  <div class="flex h-full ">
    <side-nav></side-nav>
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    <div class="w-5/6 h-600">
      <control-Cp></control-Cp>
      <md-editor></md-editor>
    </div>
    
    
  </div>
  
</template>

<script>
import sideNav from './components/sideNav/sideNav.vue'
import mdEditor  from './components/MdEditor.vue';
import controlCp from './components/controlComponent.vue'
import { useStore } from 'vuex';

export default {
  name: 'App',
  components: {
    mdEditor,
    sideNav,
    controlCp   
  },
  setup(){
    const store = useStore()
    return {store}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;

}
</style>
