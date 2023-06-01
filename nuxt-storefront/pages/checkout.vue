<template>
  <div class="checkoutPage">
    <span class="steps">
      <h2 :class="currentStep === 1 ? 'current' : ''">1</h2>
      <p>></p>
      <h2 :class="currentStep === 2 ? 'current' : ''">2</h2>
      <p>></p>
      <h2 :class="currentStep === 3 ? 'current' : ''">3</h2>
    </span>
    <div class="currentStep">
      <div v-if="currentStep === 1">
        <CheckoutShippingAddress />
      </div>
      <div v-if="currentStep === 2">
        <CheckoutShippingOptions />
      </div>
      <div v-if="currentStep === 3">
        <CheckoutReviewOrder />
      </div>
    </div>
    <span class="stepNav">
      <button :disabled="currentStep === 1" @click="currentStep--">Prev</button>
      <button
        v-if="currentStep < 3"
        :disabled="currentStep === 3"
        @click="currentStep++"
      >
        Next
      </button>
      <button v-else class="placeOrder" @click="placeOrder">Place Order</button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";
const client = useMedusaClient();
const main = useMainStore();
const currentStep = ref(1);
const placeOrder = () => {
  // client.carts.complete(main.cartShipping.id).then(({ type, data }) => {
  //   console.log(type, data);
  // });
  console.log("shipping:", main.cartShipping);
  console.log("pickup:", main.cartPickup);
};
</script>

<style>
.checkoutPage {
  padding: 2em;
}

.steps {
  color: #212121;
}

.steps h2 {
  font-size: 16px;
}

.steps h2.current {
  font-size: 20px;
  color: var(--secondary-main);
  animation: grow 0.8s linear;
}

.steps,
.stepNav {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.stepNav {
  height: 48px;
  gap: 1em;
}

.stepNav button {
  width: 8em;
  height: 36px;
  border: none;
  border-radius: 4px;
  background: var(--primary-main);
  color: #fefefe;
  box-shadow: 0 4px 0 #212121;
  cursor: pointer;
}

.stepNav button:disabled {
  opacity: 0.8;
  cursor: default;
}

.stepNav button:disabled,
.stepNav button:active {
  box-shadow: none;
  transform: translateY(4px);
}

.currentStep {
  padding: 1em;
  min-height: 16em;
}

@keyframes grow {
  0% {
    text-shadow: none;
  }
  50% {
    text-shadow: 0 0 4px var(--secondary-main);
  }
  100% {
    text-shadow: none;
  }
}
</style>
