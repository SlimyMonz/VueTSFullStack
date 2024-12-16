<template>
    <div class="login-container">
        <div class="login-form">
            <input v-model="inputText" type="text" placeholder="Enter your string" class="input-box" />
            <button @click="handleLogin" class="login-button">Login</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '../router';
import trpc from '../trpcClient';

// State to bind the input text
const inputText = ref('')

// Handle the login button click
const handleLogin = async () => {
    if (inputText.value) {
        try {
            // Get the JWT by passing the input text to getJwt
            const result = await trpc.auth.login.query({ username: inputText.value })
            console.log(result);
            // Navigate to a different page after successful login
            router.push('/')
        } catch (error) {
            console.error('Error while logging in:', error)
        }
    } else {
        alert('Please enter a valid string.')
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f9;
}

.login-form {
    text-align: center;
}

.input-box {
    padding: 10px;
    width: 300px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.login-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #45a049;
}
</style>