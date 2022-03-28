<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { condition } from '@/apis/SPLAT/condition'
export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    condition({}).then((res) => {})
  },
  mounted() {
    console.log()
  },
})
</script>
