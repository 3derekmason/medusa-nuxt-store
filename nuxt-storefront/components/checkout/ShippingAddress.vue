<template>
  <form class="shippingAddress">
    <h2>Shipping Address:</h2>
    <div class="row">
      <label for="company">Company Name:</label
      ><input type="text" name="company" v-model="userAddress.company" />
    </div>
    <div class="row">
      <label for="firstName">First Name:</label
      ><input type="text" name="firstName" v-model="userAddress.first_name" />
    </div>
    <div class="row">
      <label for="lastName">Last Name:</label
      ><input type="text" name="lastName" v-model="userAddress.last_name" />
    </div>
    <div class="row">
      <label for="address1">Address 1:</label
      ><input type="text" name="address1" v-model="userAddress.address_1" />
    </div>
    <div class="row">
      <label for="address2">Address 2:</label
      ><input type="text" name="address2" v-model="userAddress.address_2" />
    </div>
    <div class="row">
      <label for="city">City:</label
      ><input type="text" name="city" v-model="userAddress.city" />
    </div>
    <div class="row">
      <label for="province">Province:</label
      ><input type="text" name="province" v-model="userAddress.province" />
    </div>
    <div class="row">
      <label for="postalCode">Postal Code:</label
      ><input type="text" name="postalCode" v-model="userAddress.postal_code" />
    </div>
    <div v-if="formComplete" class="done"></div>
    <div v-else class="notDone"></div>
  </form>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";

const client = useMedusaClient();
const main = useMainStore();
const userAddress = ref({
  company: "",
  first_name: "",
  last_name: "",
  address_1: "",
  address_2: "",
  city: "",
  country_code: "dk",
  province: "",
  postal_code: "",
  phone: "",
});

const formComplete = ref(false);

watchEffect(() => {
  if (
    userAddress.value.first_name &&
    userAddress.value.last_name &&
    userAddress.value.address_1 &&
    userAddress.value.city &&
    userAddress.value.province &&
    userAddress.value.postal_code
  ) {
    formComplete.value = true;
  }
});

watchEffect(() => {
  if (formComplete.value) {
    client.carts
      .update(main.cart.id, {
        shipping_address: userAddress.value,
      })
      .then(({ cart }) => {
        main.setCart(cart);
      });
  }
});
</script>

<style>
.shippingAddress {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
.row {
  display: flex;
  align-items: center;
}
.row label {
  width: 10em;
}
.row input {
  width: 12em;
}

.done,
.notDone {
  width: 1em;
  height: 1em;
  border-radius: 50%;
}

.done {
  border: 1px solid transparent;
  background: #64dd17;
}

.notDone {
  border: 1px solid #d50000;
}
</style>
