<script setup>
defineProps({
    placeholder: {
        type: String,
        default: 'Enter your password'
    },
    modelValue: {
        type: String,
        default: '',
        required: true
    }
})

defineEmits(['update:modelValue'])

</script>

<template>
    <input type="password" :placeholder="placeholder" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" />
</template>

<style scoped>
input {
    width: 100%;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
</style>
