<style scoped></style>

<template>
  <div class="flex flex-col gap-y-2 justify-center items-center">
    <form
      @submit.prevent="doSignUp"
      class="border rounded-2xl p-4 relative top-[-50px] w-xl h-[40%] max-h-[400px] flex flex-col items-center justify-center gap-4"
    >
      <div class="text-2xl">Logo</div>
      <div class="flex w-[70%] gap-3 justify-between h-10 items-center">
        <label for="userId" class="text-[1.1rem] w-[30%]">아이디</label>
        <input
          type="text"
          id="userId"
          name="userId"
          class="border h-full flex-1 rounded-md px-1 max-w-[50%]"
          v-model="userId"
        />
        <button
          type="button"
          class="border h-full text-[0.8rem] rounded-md break-keep hover:bg-black hover:text-white cursor-pointer"
        >
          중복 확인
        </button>
      </div>
      <div class="flex w-[70%] gap-3 justify-between h-10 items-center">
        <label for="userPwd" class="text-[1.1rem] w-[30%]">비밀번호</label>
        <input
          type="password"
          id="userPwd"
          name="userPwd"
          class="border h-full flex-1 max-w-[70%] rounded-md px-1"
          v-model="userPwd"
        />
      </div>
      <div class="flex w-[70%] gap-3 justify-between h-10 items-center">
        <label for="userPwd" class="text-[1.1rem] w-[30%]">비밀번호 확인</label>
        <input
          type="password"
          id="userPwd"
          name="userPwd"
          class="border h-full flex-1 max-w-[70%] rounded-md px-1"
          v-model="userPwdConfirm"
        />
      </div>
      <div class="w-[70%] flex flex-col gap-1">
        <button
          class="border w-full py-2 font-bold rounded-md hover:bg-black hover:text-white cursor-pointer"
          type="submit"
        >
          Sign Up
        </button>
        <div class="w-full flex items-center justify-end text-[12px]">
          <a href="login" class="hover:underline">로그인하러 가기</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/axios";

const userId = ref("");
const userPwd = ref("");
const userPwdConfirm = ref("");

function doSignUp() {
  if (
    userId.value.trim() == "" ||
    userPwd.value.trim() == "" ||
    userPwdConfirm.value.trim == ""
  ) {
    console.log("입력확인");
    return;
  }

  console.log("로그인 시도:", userId.value, userPwd.value);
  const sendData = {
    userId: userId.value,
    userPwd: userPwd.value,
  };

  api.post("/user/signup", sendData);
}
</script>
