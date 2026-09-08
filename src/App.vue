<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { RouterView } from "vue-router";
import NavbarComponent from "./components/NavbarComponent.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token && !userStore.user.id) {
    axios.get("http://localhost:4000/users/details", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      userStore.setUser({
        id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        isAdmin: response.data.user.isAdmin
      });
    })
    .catch(error => {
      console.error("Failed to restore session:", error);
      localStorage.removeItem("token");
    });
  }
});
</script>

<template>
  <div>
    <NavbarComponent />
    <RouterView />
  </div>
</template>

<style scoped></style>