<script setup>
import { onBeforeMount } from 'vue';
import { useSecurity } from '../hooks/useSecurity.hook.js';

const { checkToken } = useSecurity();
const router = useRouter();

onBeforeMount(async () => {
    const isLogged = await checkToken();
    if (!isLogged) {
        router.push('/login');
    } else {
        router.push('/dashboard');
    }
});

</script>

<template>
    <h1>Home</h1>
</template>