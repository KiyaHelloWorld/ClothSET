-<template>
    <nav>
        <div>
            <router-link class="logo">
                clothSET 
            </router-link>

            <router-link
                v-if="userStore.email"
                :to="{ name: 'Dashboard'}"
                class="nav-link"
            >
            Dashboard 
            </router-link>

            <router-link
                v-if="userStore.email"
                :to="{ name: 'Closet'}"
                class="nav-link"
            >
            Closet 
            </router-link>

            <router-link
                v-if="userStore.email"
                :to="{ name: 'Analytics'}"
                class="nav-link"
            >
            Analytics 
            </router-link>

            <router-link
                v-if="!userStore.email"
                :to="{ name: 'Register'}"
                class="nav-link"
            >
            Register 
            </router-link>

            <router-link
                v-if="!userStore.email"
                :to="{ name: 'Login'}"
                class="nav-link"
            >
            Login 
            </router-link>

            <component
                v-if="userStore.email"
                :to="{ name: 'Logout'}"
                class="nav-link"
                @click.prevent = "handleLogout"
            >
            Logout 
            </component>

        </div>
        <div class="avatar">KV</div>
    </nav>
</template>

<!-- <script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user"

const router = useRouter();
const userStore = useUserStore();

const handleLogout = () => {
    useStore.clearUser();
    router.push({ name: "Login" });
};

const isHidden = ref(false);
const HIDE_DELAY = 100;


</script> -->