<script setup>
import { ref } from 'vue';
import { useUserServices } from '../services/user/index.service.js';
import InputPassword from '../components/forms/InputPassword.vue';
import InputEmail from '../components/forms/InputEmail.vue';
import Button from '../components/forms/Button.vue';

const { loginService } = useUserServices;

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();

const handleLogin = async () => {
    const data = await loginService(email.value, password.value);
    if (data.statusCode === 200) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('tokenTime', Date.now());
        router.push('/dashboard');
    } else {
        errorMessage.value = data.message;
    }
}

definePageMeta({
    layout: false
})
</script>

<template>
    <div class="login-container">
        <div class="login-box">
            <h2>Iniciar Sesión</h2>

            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <InputEmail v-model="email" placeholder="Correo electrónico" required />
                </div>
                <div class="form-group">
                    <InputPassword v-model="password" placeholder="Contraseña" required />
                </div>

                <Button type="principal" text="Ingresar" />

                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</template>


<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-box {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 24rem;
}

h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group:last-of-type {
    margin-bottom: 1.5rem;
}


input {
    width: calc(100% - 32px);
}
</style>