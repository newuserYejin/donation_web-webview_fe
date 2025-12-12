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
      @click="!userInfo.userId ? router.push('/login') : logout()"
    >
      {{ !userInfo.userId ? "로그인" : "로그아웃" }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { userInfoStore } from "../store/UserStore";
import { watch, watchEffect } from "vue";
import api from "../api/axios";

const router = useRouter();
const userInfo = userInfoStore();

const menuList = [
  { name: "Home", path: "/" },
  { name: "List", path: "/list" },
  { name: "Community", path: "/community" },
  { name: "Admin", path: "/admin" },
];

function logout() {
  console.log("로그아웃");
  userInfo.initInfo();
  router.push("/login");
}

function fetchUserInfo(value) {
  console.log("사용자 정보 요청");
  api.get("/user/userInfo").then((res) => {
    userInfo.saveUserInfo(res.data?.results.user);
  });
}

watchEffect(() => {
  console.log("Token:", userInfo.token);
  console.log("UserId:", userInfo.userId);
});
watchEffect(() => {
  if (userInfo.token && !userInfo.userId) {
    fetchUserInfo(userInfo.token);
  }
});
</script>
