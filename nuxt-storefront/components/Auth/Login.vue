<template>
  <form class="login">
    <h2>Medusa/Nuxt Store Log in</h2>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="login">Log in</button>
  </form>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";

const client = useMedusaClient();
const main = useMainStore();
const router = useRouter();
const email = ref();
const password = ref();

const login = (e: any) => {
  e.preventDefault();
  client.auth
    .authenticate({
      email: email.value,
      password: password.value,
    })
    .then(({ customer }) => {
      console.log(customer);
      main.setCustomer(customer);
      client.carts
        .update(main.cartShipping.id, {
          customer_id: customer.id,
        })
        .then(({ cart }) => {
          main.setShipCart(cart);
          router.push("/");
        });
    });
};
</script>

<style>
.login {
  width: fit-content;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
