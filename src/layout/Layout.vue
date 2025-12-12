<style scoped>
.whole_layout {
  background-color: #f8f9fa;
  height: 100vh;
  overflow: hidden;
  /* padding: 1rem 2rem; */
}
</style>

<template>
  <div class="whole_layout flex flex-col">
    <TopNavbar />

    <!-- 하위 컴포넌트가 출력될 공간 -->
    <router-view
      class="flex-[4] overflow-y-auto overflow-x-hidden h-full p-3"
    />
  </div>
</template>

<script lang="js">
import TopNavbar from './TopNavbar.vue';

export default {
  name: "Layout",
  components: {TopNavbar},
  setup() {
    return {
      sampleData: ''
    };
  },
};
</script>
