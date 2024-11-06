<script setup>
import { ref, onBeforeMount } from 'vue';
import { useSecurity } from '../hooks/useSecurity.hook.js';

const { checkToken } = useSecurity();
const router = useRouter();
const isLoading = ref(true)

onBeforeMount(async () => {
    const isLogged = await checkToken();
    if (!isLogged) {
        router.push('/login');
    }
    setTimeout(() => {
        isLoading.value = false
    }, 100)
});
</script>

<template>
    <div v-if="!isLoading">
        <slot />
    </div>
</template>