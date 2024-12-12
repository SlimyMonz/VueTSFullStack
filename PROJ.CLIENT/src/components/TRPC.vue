
<template>
  <!-- Create User Area -->
  <div>
    <h3>Create User</h3>
    <label>ID</label> <br>
    <input v-model="id" /> <br>
    <label>Name</label> <br>
    <input v-model="name" /> <br>
    <button @click="createUser">Create User</button> <br>
  </div>
  <br>
  <br>
  <!-- Get User Area -->
  <div>
    <h3>Get User</h3>
    <label>ID</label> <br>
    <input v-model="getUserId" /> <br>
    <button @click="getUserClick">Get User By Id</button> <br>

    <div v-if="fetchedUser">
      <h4>User Info</h4>
      <p><strong>ID:</strong> {{ fetchedUser.id }}</p>
      <p><strong>Name:</strong> {{ fetchedUser.name }}</p>
    </div>
    <div v-else>
      <p>No user fetched. Enter an ID and click "Get User By Id".</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { trpcUserRouter } from '../trpcClient';
import { UserType } from '../../../proj.server/src/Models/zodTypes';

// Reactive states for creating a user
let id = ref("None");
let name = ref("None");

// Reactive states for fetching a user
let getUserId = ref("");
let fetchedUser = ref<UserType | null>(null);

// Function to create a user
async function createUser() {
  try {
    // we do not need to define the Type here because it is inferred by trpc/zod
    const result = await trpcUserRouter.user.mutate({
      id: id.value,
      name: name.value
    });
    id.value = '';
    name.value = '';
    // since we created the data, we do not need to check if it exists
    console.log(`User ${result.name} created successfully!`);
  } catch (e) {
    console.log("Error creating user:", e);
  }
}

// Function to get user by ID
async function getUserClick() {
  try {
    if (getUserId.value) {
      const result = await trpcUserRouter.userById.query(getUserId.value);
      // since we did not create the data, we need to make sure it exists
      if (result) {
        fetchedUser.value = result;
        console.log(`Fetched: ${result.name}`)
      } else {
        console.log("No user found.");
      }
    } else {
      console.log("Please enter an ID.");
    }
  } catch (e) {
    console.log("Error fetching user:", e);
  }
}
</script>
