<template>
  <div class="account">
    <button @click="register">Sign up Derek</button>
  </div>
</template>

<script setup lang="ts">
const client = useMedusaClient();
const register = () => {
  client.customers
    .create({
      email: "derek@powerfulweb.com",
      password: "Medusa123",
      first_name: "Derek",
      last_name: "Mason",
    })
    .then(({ customer }) => {
      console.log(customer);
    });
};
</script>
