<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Button type="primary">主要按钮</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'vant'
export default defineComponent({
  components: {
    Button
  },
  setup() {

  },
})
</script>
