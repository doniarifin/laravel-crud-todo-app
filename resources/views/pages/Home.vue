<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="card p-4 rounded-md border border-slate-300 text-center">
  <div class="container">
    <h1 class="center-text">Selamat datang di halaman Home!</h1>
    <button @click="logout" class="logout-button">Logout</button>
  </div>
  </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const logout = async () => {
  // Redirect ke halaman login
  await router.push('/login');
};
</script>

<style>

.center-text {
  text-align: center; /* Pusatkan teks secara horizontal */
}

.logout-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 20px; /* Jarak antara teks dan tombol */
}

.logout-button:hover {
  background-color: #d32f2f;
}
</style>
