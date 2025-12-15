<style scoped></style>

<template>
  <div
    class="rounded-xl bg-[#f1f1f1] w-full md:w-[60%] grid grid-cols-3 xl:grid-cols-6 place-items-center gap-4 py-3 px-3"
    style="box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2)"
  >
    <div
      v-for="i in customerMenuList"
      class="flex items-center justify-center aspect-square w-[70%] rounded-[50%] bg-[#f7f7f7]"
      style="box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2)"
    >
      {{ i }}
    </div>
  </div>
</template>

<script setup>
// 기관장 메뉴 list
const directorMenuList = ["내 정보", "기관 정보", "물품 관리"];
const customerMenuList = ["내 정보", "후원 정보", "기관 등록"];
</script>
