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

    <div class="flex gap-[10px]">
      <div v-if="userInfo.userId">{{ userInfo.userId }} 님</div>

      <div
        class="cursor-pointer hover:text-orange-400"
        @click="!userInfo.userId ? router.push('/login') : logout()"
        :class="userInfo.userId ? 'text-[#d9d9d9]' : null"
      >
        {{ !userInfo.userId ? "로그인" : "로그아웃" }}
      </div>
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

// 새로고침 시 사용자의 정보 가져오기
watchEffect(() => {
  if (userInfo.token && !userInfo.userId) {
    fetchUserInfo();
  }
});

function logout() {
  console.log("로그아웃");
  userInfo.initInfo();
  router.push("/login");
}

function fetchUserInfo() {
  console.log("사용자 정보 요청");
  api.get("/user/userInfo").then((res) => {
    userInfo.saveUserInfo(res.data?.results.user);
  });
}
</script>
