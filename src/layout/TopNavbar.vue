<style scoped></style>

<template>
  <div class="px-2 flex border-b h-[50px] items-center justify-between">
    <div class="flex gap-x-3">
      <div
        @click="router.push(value.path)"
        v-for="value in menuList"
        :key="value.name"
        class="cursor-pointer hover:text-green-400"
      >
        {{ value.name }}
      </div>
    </div>

    <div
      class="cursor-pointer hover:text-orange-400"
      @click="router.push('/login')"
    >
      로그인
    </div>
  </div>
</template>

<script lang="js">
import { useRouter } from 'vue-router';
import router from '../routes';

export default {
  name: "TopNavbar",
  components: {},
  setup() {
    const menuList = [{name : "Home", path:"/"},
                       {name : "List", path:"/list"},
                       {name: "Community", path:"/community"}];
    const router = useRouter()

    function clickMenu(value) {
      console.log("clickMenu value : ", value);
    }

    return {
      menuList,
      clickMenu,
      router
    };
  },
};
</script>
