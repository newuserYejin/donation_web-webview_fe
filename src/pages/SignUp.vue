<style scoped>
.error {
  border-color: rgb(230, 2, 2);
  border-width: 2px;
}
</style>

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
          :class="{ error: errorItem.errorId === 'userId' }"
        />
        <button
          type="button"
          class="border h-full leading-4 text-[0.8rem] rounded-md break-keep hover:bg-black hover:text-white cursor-pointer"
          @click="checkDupId()"
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
          :class="{ error: errorItem.errorId === 'userPwd' }"
        />
      </div>
      <div class="flex w-[70%] gap-3 justify-between h-10 items-center">
        <label for="userPwdConfirm" class="text-[1.1rem] w-[30%]"
          >비밀번호 확인</label
        >
        <input
          type="password"
          id="userPwdConfirm"
          name="userPwdConfirm"
          class="border h-full flex-1 max-w-[70%] rounded-md px-1"
          v-model="userPwdConfirm"
          :class="{ error: errorItem.errorId === 'userPwdConfirm' }"
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
import { useRouter } from "vue-router";

const router = useRouter();

const userId = ref("");
const userPwd = ref("");
const userPwdConfirm = ref("");
let validedId = ref("");
let errorItem = ref({
  errorId: "",
  errorMsg: "",
});

var isCheck = false;

function doSignUp() {
  if (
    userId.value.trim() == "" ||
    userPwd.value.trim() == "" ||
    userPwdConfirm.value.trim() == ""
  ) {
    errorItem.value.errorMsg = "데이터를 입력해주세요";

    userId.value.trim() == ""
      ? (errorItem.value.errorId = "userId")
      : userPwd.value.trim() == ""
      ? (errorItem.value.errorId = "userPwd")
      : (errorItem.value.errorId = "userPwdConfirm");

    // const target = document.getElementById(errorItem.value.errorId);

    // const errorMsgDiv = document.createElement("span");
    // errorMsgDiv.textContent = errorItem.value.errorMsg;
    // errorMsgDiv.style.color = "red";
    // errorMsgDiv.style.fontSize = "0.8rem";
    // target.closest("div").after(errorMsgDiv);

    return;
  }

  errorItem.value = {
    errorId: "",
    errorMsg: "",
  };

  if (userPwd.value.trim() != userPwdConfirm.value.trim()) {
    console.log("확인 비밀번호 불일치");
    alert("확인 비밀번호 불일치");
    return;
  }

  const sendData = {
    userId: validedId.value.trim(),
    userPwd: userPwd.value.trim(),
  };

  if (isCheck && validedId.value.trim() == userId.value.trim()) {
    api.post("/user/signup", sendData).then((res) => {
      alert("회원가입 성공");

      router.push("/login");
    });
  } else {
    alert("아이디 중복 체크를 해주세요");
  }
}

function checkDupId() {
  if (userId.value.trim() == "") alert("아이디를 먼저 입력해주세요");
  api
    .get("/user/checkId", {
      params: {
        userId: userId.value.trim(),
      },
    })
    .then((res) => {
      console.log("중복 체크 결과 : ", res);

      const resStatus = res.data.httpStatusCode;
      if (resStatus != 200) {
        isCheck = false;
        alert(res.data.message);
      } else {
        isCheck = true;
        validedId.value = userId.value.trim();
        alert("사용가능한 아이디 입니다.");
      }
    });
}
</script>
