<template>
  <!-- <entire-editor></entire-editor> -->
  <router-view/>
  
</template>

<script>
// import sideNav from './components/sideNav/sideNav.vue'
// import mdEditor  from './components/MdEditor.vue';
// import controlCp from './components/controlComponent.vue'

import { useStore } from 'vuex';


export default {
  name: 'App',
  components: {
   
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
