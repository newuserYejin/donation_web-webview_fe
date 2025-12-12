import { defineStore } from "pinia";

export const userInfoStore = defineStore("userInfo", {
  state: () => {
    return {
      token: localStorage.getItem("token") || "",
      userId: "",
      userName: "",
      userTel: "",
      userEmail: "",
      userAuth: "CUSTOMER",
    };
  },

  actions: {
    initInfo() {
      localStorage.removeItem("token");
      this.$reset();
    },
    saveToken(value) {
      this.token = value;
      localStorage.setItem("token", this.token);
    },
    saveUserInfo(userInfo) {
      this.userAuth = userInfo?.userAuth;
      this.userId = userInfo?.userId;
      this.userEmail = userInfo?.userEmail ?? "";
      this.userTel = userInfo?.userTel ?? "";
      this.userName = userInfo?.userName ?? "";
    },
  },
});
