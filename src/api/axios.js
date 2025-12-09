import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BACK_URL + "/api",
  withCredentials: false, // JWT 기반이면 false 유지
  timeout: 3600000,
  //   headers: { 'Content-Type': 'application/json', },
});

// 요청 인터셉터 (JWT 붙일 때 여기에 토큰 추가)
api.interceptors.request.use(
  (config) => {
    // 예: Pinia에서 토큰 가져와서 헤더에 넣는 구조
    // const token = useAuthStore().token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.request.use((config) => {
//   const auth = useAuthStore();
//   const token = auth.token;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// 응답 인터셉터 (401 처리 등 확장 가능)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 예: 토큰 만료 시 처리
    // if (error.response && error.response.status === 401) {
    //   useAuthStore().logout();
    // }
    return Promise.reject(error);
  }
);

export default api;
