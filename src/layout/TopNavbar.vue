<style scoped></style>

<template>
  <div class="px-2 flex border-b h-[50px] items-center justify-between">
    <div class="flex gap-x-3">
      <div
        @click="router.push(value.path)"
        v-for="value in menuList"
        :key="value.name"
        class="cursor-pointer hover:text-green-400"
        id="userIdBox"
      >
        {{ value.name }}
      </div>
    </div>

    <div class="flex gap-[10px] relative">
      <div
        v-if="userInfo.userId"
        @click.stop="userSubMenuShow = !userSubMenuShow"
        class="cursor-pointer"
        id="userIdBox"
      >
        {{ userInfo.userId }} 님
      </div>

      <div
        class="cursor-pointer hover:text-orange-400"
        @click="router.push('/login')"
        :class="userInfo.userId ? 'text-[#d9d9d9]' : null"
        v-if="!userInfo.userId"
      >
        로그인
      </div>

      <div
        class="absolute w-max right-0 top-full flex gap-1.5 p-3 rounded-md z-3 bg-[#fafafa] text-[0.8rem]"
        style="box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2)"
        id="userSubMenu"
        ref="userSubMenuBox"
        v-if="userSubMenuShow"
      >
        <div
          class="cursor-pointer hover:text-orange-400"
          @click="router.push('/mypage')"
        >
          마이페이지
        </div>
        <div class="border-r"></div>
        <div class="cursor-pointer hover:text-orange-400" @click="logout()">
          로그아웃
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { userInfoStore } from "../store/UserStore";
import { onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import api from "../api/axios";

const menuList = [
  { name: "Home", path: "/" },
  { name: "List", path: "/list" },
  { name: "Community", path: "/community" },
  { name: "Admin", path: "/admin" },
];

const router = useRouter();
const userInfo = userInfoStore();
const userSubMenuShow = ref(false);
const userSubMenuBox = ref(false);

// 새로고침 시 사용자의 정보 가져오기
watchEffect(() => {
  if (userInfo.token && !userInfo.userId) {
    fetchUserInfo();
  }
});

function logout() {
  userInfo.initInfo();
  userSubMenuShow.value = false;
  router.push("/login");
}

function fetchUserInfo() {
  api.get("/user/userInfo").then((res) => {
    userInfo.saveUserInfo(res.data?.results.user);
  });
}

const handleClickOutside = (e) => {
  if (
    userSubMenuShow.value == true &&
    !userSubMenuBox.value.contains(e.target)
  ) {
    userSubMenuShow.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
