<template>
  <div class="account">
    <div v-if="main.customer.email">
      <h2>Welcome back {{ main.customer.first_name || "" }}</h2>
      <br />
      <button @click="logout">Log out</button>
    </div>
    <div v-else class="auth">
      <div v-if="!loginView">
        <AuthRegister />
      </div>
      <div v-if="loginView">
        <AuthLogin />
      </div>
      <button class="toggle" @click="loginView = !loginView">
        {{
          loginView
            ? "Don't have an account? Register here"
            : "Already have an account? Sign in here"
        }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";
const client = useMedusaClient();
const main = useMainStore();
const loginView = ref(true);
const logout = () => {
  client.auth.deleteSession().then(() => {
    main.setCustomer({});
  });
};
</script>

<style>
.account {
  display: grid;
  place-content: center;
}

.auth {
  padding: 1em;
  text-align: center;
}

.auth input,
.auth button {
  height: 40px;
  border-radius: 4px;
}
.auth input {
  border: 1px solid var(--primary-main);
  padding: 0 0.5em;
}

.auth button {
  border: none;
  background: var(--primary-main);
  color: #efefef;
  cursor: pointer;
}

.auth .toggle {
  border: none;
  background: none;
  color: var(--primary-main);
  cursor: pointer;
}
.toggle:hover,
.toggle:active {
  color: var(--secondary-main);
}
</style>
