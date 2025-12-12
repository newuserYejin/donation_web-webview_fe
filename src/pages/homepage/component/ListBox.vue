<style scoped></style>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
    <div
      v-for="i in 10"
      class="rounded-xl bg-[#f1f1f1] p-3 flex gap-3"
      style="box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2)"
    >
      <div
        class="w-[40%] bg-[#f7f7f7] aspect-square max-w-[200px] flex items-center justify-center rounded-md"
        style="box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2)"
      >
        img box
      </div>
      content{{ i }}
    </div>
  </div>
</template>

<script setup></script>
