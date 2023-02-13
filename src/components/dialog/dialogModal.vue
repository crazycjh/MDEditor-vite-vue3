<template>
    <div>
        <div class="backdrop" @click="backdropClick" v-if="props.open"></div>
        <dialog class="dialog"  open v-if="props.open">
            <slot >
            </slot>
        </dialog>

    </div>
</template>
<script>

export default{
    props:['open'],
    setup(props,context){
        const backdropClick = ()=>{
            context.emit('close')

        }

        return {backdropClick,props}
    }
}
</script>
<style scoped>
.backdrop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.75);
}
dialog {
  position: fixed;
  top: 30vh;
  width: 30rem;
  left: calc(50% - 15rem);
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
  
}
</style>
