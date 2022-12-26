<template>
  
  <md-editor class="test"></md-editor>
</template>

<script>

import mdEditor  from './components/MdEditor.vue';

export default {
  name: 'App',
  components: {
    mdEditor   
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
