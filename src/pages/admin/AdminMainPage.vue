<style scoped></style>

<template>
  <div>Admin Page</div>
</template>

<script setup>
import { watch } from "vue";
import api from "../../api/axios";

watch(() => {
  api.get("/admin");
});
</script>
