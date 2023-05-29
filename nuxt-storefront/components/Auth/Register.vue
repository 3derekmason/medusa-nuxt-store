<template>
  <form class="register">
    <h2>Medusa/Nuxt Store Sign up:</h2>
    <input type="text" v-model="first_name" placeholder="First Name" />
    <input type="text" v-model="last_name" placeholder="Last Name" />
    <input type="text" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="register">Register</button>
  </form>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";

const client = useMedusaClient();
const main = useMainStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const first_name = ref("");
const last_name = ref("");

const register = async (e: any) => {
  e.preventDefault();
  await client.customers
    .create({
      email: email.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
    })
    .then(({ customer }) => {
      console.log(customer);
    });
  await client.auth
    .authenticate({
      email: email.value,
      password: password.value,
    })
    .then(({ customer }) => {
      main.setCustomer(customer);
      client.carts
        .update(main.cart.id, {
          customer_id: customer.id,
        })
        .then(({ cart }) => {
          main.setCart(cart);
          router.push("/");
        });
    });
};
</script>

<style>
.register {
  width: fit-content;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
