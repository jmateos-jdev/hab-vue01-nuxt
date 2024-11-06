<script setup>
const route = useRoute();

</script>

<template>
    <h1>Ejemplo {{ route.params.id }}</h1>
</template>