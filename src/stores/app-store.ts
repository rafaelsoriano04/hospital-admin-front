import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {

  const token = ref<string>(localStorage.getItem('token') || '');


  const apiUrl = ref('http://34.23.223.70:3000/api');


  watch(token, (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  });

  function setToken(newToken: string) {
    token.value = newToken;
  }

  function clearToken() {
    token.value = '';
  }

  return {
    token,
    apiUrl, 
    setToken,
    clearToken,
  };
});
