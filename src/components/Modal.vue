<template>
<teleport to="#modal">
  <div id="center" v-if="isOpen">
    <h2><slot>this is a modal</slot></h2>
    <button @click="buttonConfirm">Yes</button>
    <button @click="buttonCancel">No</button>
  </div>
</teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
name:'modal',
  props: {
    isOpen: Boolean,
    modalParam: Object
  },
  emits: {
    'close-modal': null,
    'confirm-modal': null
  },
  setup(props, context) {
    const buttonConfirm = () => {
      context.emit('confirm-modal')
      console.log('props:',props.modalParam)
    }
    const buttonCancel = () => {
      context.emit('close-modal')
    }
    return {
      buttonConfirm,
      buttonCancel
    }
  }
})
</script>
<style>
  #center {
    width: 200px;
    height: 200px;
    border: 2px solid black;
    background: white;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
  }
</style>