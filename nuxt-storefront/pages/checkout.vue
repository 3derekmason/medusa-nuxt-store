<template>
  <div class="checkoutPage">
    <form action="" class="shippingAddress">
      <p>Shipping Address:</p>
      <div class="row">
        <label for="company">Company Name:</label
        ><input type="text" name="company" />
      </div>
      <div class="row">
        <label for="firstName">First Name:</label
        ><input type="text" name="firstName" />
      </div>
      <div class="row">
        <label for="lastName">Last Name:</label
        ><input type="text" name="lastName" />
      </div>
      <div class="row">
        <label for="address1">Address 1:</label
        ><input type="text" name="address1" />
      </div>
      <div class="row">
        <label for="address2">Address 2:</label
        ><input type="text" name="address2" />
      </div>
      <div class="row">
        <label for="city">City:</label><input type="text" name="city" />
      </div>
      <div class="row">
        <label for="province">Province:</label
        ><input type="text" name="province" />
      </div>
      <div class="row">
        <label for="postalCode">Postal Code:</label
        ><input type="text" name="postalCode" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";
const client = useMedusaClient();
const main = useMainStore();
</script>
