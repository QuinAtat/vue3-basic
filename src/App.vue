<template>
  <h1 v-if="requestLoader.loading">LOADING............</h1>
  <img v-if="requestLoader.loaded" :src="requestLoader.result.message">
  <h1>{{count}}</h1>
  <h1>{{doubleCount}}</h1>
  <h1>X: {{mousePosition.x.value}}, Y: {{mousePosition.y.value}}</h1>
  
  
  <button @click="increase">+1</button>
  
  <ul>
    <li v-for="number in numbers" :key="number"><h1>{{number}}</h1></li>
    <li><h1>{{person.name}}</h1></li>
  </ul>
  <button @click="updateGreetings">updateTitle</button>

  <button @click="openModal">Open Modal</button><br/>
  <Modal :isOpen="modalIsOpen" :modalParam="modalParam" @close-modal="onModalClose" @confirm-modal="onModalConfirm"></Modal>



  <Suspense>
    <template #default>
      <div>
        <!--会等俩组件都resolve后再展示组件-->
        <async-show />
        <dog-show />
      </div>
    </template>
    <template #fallback>
      <h1>Loading.............</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { ref, toRefs, computed, reactive, defineComponent, onMounted, onUnmounted, onUpdated, onRenderTriggered, watch } from 'vue'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from  './hooks/useURLLoader'
import Modal from './components/Modal.vue'
import AsyncShow from './components/AsyncShow.vue'
import DogShow from './components/DogShow.vue'
interface DataProps {
  count: number;
  doubleCount: number;
  increase: () => void;
  numbers: number[];
  person: {name?: string};
}

interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default defineComponent({
  name: 'App',
  components: { Modal, AsyncShow, DogShow },
  // 在setup中提供响应式对象
  /**
  setup() {
    const count = ref(0)
    const doubleCount = computed((): number => {
      return count.value * 2;
    })
    const increase = (): void => {
      count.value++
    }
    return {
      count,
      doubleCount,
      increase
    }
  } */
  // 使用reactive响应式对象
  setup() {
    const mousePosition = useMousePosition()
    // const {result, loading,loaded} = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random ')
    // const {result,loading,loaded} = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    // watch(result, () => {
    //   if(result.value) {
    //     // console.log('value:',result.value.message)
    //     console.log('value',result.value[0].url)
    //   }
    // })
    const requestLoader = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')

    onMounted((): void => {
      console.log('onMounted')
    })
    // onUpdated((): void => {
    //   console.log('onUpdated')
    // })
    // //组件改变时调试
    // onRenderTriggered((event): void => {
    //   console.log(event)
    // })
    onUnmounted((): void => {
      console.log('onUnmounted')
    })

    const greetings = ref('')
    const updateGreetings = (): void => {
      greetings.value += 'Hello!'
    }

   
    


    const data: DataProps = reactive({
      count: 0,
      doubleCount: computed((): number => data.count * 2),
      increase: (): void => {
        data.count++
      },
      numbers: [0,1,2],
      person: {}
    })
    data.person.name="angw"   
    

    watch([greetings, () => data.count], (newValue, oldValue): void => {
      console.log(`newValue:${newValue}`)
      console.log(`oldValue:${oldValue}`)
      document.title = 'updated' + greetings.value
    })

  //vue3对于数组和对象。响应式对象的高明之处，内部依赖了es6的proxy对象，改变了object.defineProperty的弊端，完美支持数组和对象的修改操作，让$set成为过去式
    const refData = toRefs(data)

    //打开modal
    const modalIsOpen = ref(false)
    const modalParam = ref({})
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }
    const onModalConfirm = () => {
      console.log('得到了弹窗的确认，干点什么增删改查吧')
      modalParam.value = {angw:'angw'}
    }
    return {
      // ...data 只用响应式的类型，才可以相应，这样不行
      //此时用toRefs，改为响应式对象,保持reactive对象保持响应性
      ...refData,
      greetings,
      updateGreetings,
      mousePosition,
      // result,
      // loading,
      // loaded
      requestLoader,
      //modal
      modalIsOpen,
      modalParam,
      openModal,
      onModalClose,
      onModalConfirm
    }
  }

});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
