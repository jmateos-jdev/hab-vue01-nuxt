<script setup>
import { ref, onMounted } from 'vue';
import { useSecurity } from '../hooks/useSecurity.hook.js';
import { useUserServices } from '../services/user/index.service.js';

const { getAllUsersService } = useUserServices;
const { checkToken } = useSecurity();
const router = useRouter()
// Datos de ejemplo - reemplazar con datos reales de tu API

const users = ref([])

const logout = () => {
    localStorage.clear()
    router.push('/login')
}

const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const usersResponse = await getAllUsersService(token);
    if (usersResponse.statusCode === 200) {
        users.value = usersResponse.data;
    }
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

onMounted(async () => {
    await fetchUsers();
})

definePageMeta({
    layout: 'security'
})
</script>

<template>
    <div>
        <div class="dashboard-header">
            <h1>Dashboard</h1>
            <button class="logout-btn" @click="logout">
                Salir
            </button>
        </div>

        <div class="users-container">
            <table class="users-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Fecha de Alta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.lastname }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ formatDate(user.createdAt) }}</td>
                        <td>
                            <button class="action-btn edit">Editar</button>
                            <button class="action-btn delete">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}

.logout-btn {
    padding: 0.5rem 1rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.logout-btn:hover {
    background-color: #c82333;
}

.users-container {
    padding: 2rem;
    font-family: 'Arial', sans-serif;
}

.users-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.users-table th,
.users-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
}

.users-table th {
    background-color: #f8f9fa;
    font-weight: 600;
}

.users-table tr:hover {
    background-color: #f8f9fa;
}

.action-btn {
    padding: 0.25rem 0.5rem;
    margin: 0 0.25rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.action-btn.edit {
    background-color: #ffc107;
    color: black;
}

.action-btn.delete {
    background-color: #dc3545;
    color: white;
}

.action-btn.edit:hover {
    background-color: #e0a800;
}

.action-btn.delete:hover {
    background-color: #c82333;
}
</style>