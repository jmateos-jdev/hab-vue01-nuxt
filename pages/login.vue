<script setup>
import { ref } from 'vue';
import { useUserServices } from '../services/user/index.service.js';

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
</script>

<template>
    <div class="login-container">
        <div class="login-box">
            <h2>Iniciar Sesión</h2>

            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">
                        Correo electrónico
                    </label>
                    <input type="email" id="email" v-model="email" required>
                </div>

                <div class="form-group">
                    <label for="password">
                        Contraseña
                    </label>
                    <input type="password" id="password" v-model="password" required>
                </div>

                <button type="submit">
                    Ingresar
                </button>
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

label {
    display: block;
    color: #4a5568;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
}

input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

button {
    width: 100%;
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #2563eb;
}
</style>