<style scoped></style>

<template>
  <div class="flex flex-col gap-y-2 justify-center items-center">
    <form
      ref="loginForm"
      @submit.prevent="doLogin"
      method="post"
      class="border rounded-2xl p-4 relative top-[-50px] w-xl h-[40%] max-h-[400px] flex flex-col items-center justify-center gap-4"
    >
      <div class="text-2xl">Logo</div>
      <div class="flex w-[70%] gap-3 justify-between h-10 items-center">
        <label for="userId" class="text-[1.1rem]">아이디</label>
        <input
          type="text"
          id="userId"
          name="userId"
          class="border h-full flex-1 max-w-[75%] rounded-md px-1"
          v-model="userId"
        />
      </div>
      <div class="flex w-[70%] gap-3 justify-between h-10 items-center">
        <label for="userPwd" class="text-[1.1rem]">비밀번호</label>
        <input
          type="password"
          id="userPwd"
          name="userPwd"
          class="border h-full flex-1 max-w-[75%] rounded-md px-1"
          v-model="userPwd"
        />
      </div>
      <div class="w-[70%] flex flex-col gap-1">
        <button
          class="border w-full py-2 font-bold rounded-md hover:bg-black hover:text-white cursor-pointer"
          type="submit"
        >
          Login
        </button>
        <div class="w-full flex items-center justify-between text-[12px]">
          <a href="#" class="hover:underline">비밀번호 찾기</a>
          <a href="signup" class="hover:underline">회원가입</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/axios";
import { userInfoStore } from "../store/UserStore";
import { useRouter } from "vue-router";

const userId = ref("");
const userPwd = ref("");
const userInfo = userInfoStore();
const router = useRouter();

function doLogin() {
  if (userId.value.trim() == "" || userPwd.value.trim() == "") {
    console.log("입력확인");
    return;
  }

  console.log("로그인 시도:", userId.value, userPwd.value);

  const sendData = {
    userId: userId.value,
    userPwd: userPwd.value,
  };

  api
    .post("/user/login", sendData)
    .then((response) => {
      const raw = response.headers["authorization"];
      const token = raw?.replace("Bearer ", "");

      console.log("token : ", token);

      userInfo.saveToken(token);
      userInfo.saveUserInfo(response.data.user);

      router.push("/");
    })
    .catch((error) => console.log("에러 발생 : ", error));
}
</script>
