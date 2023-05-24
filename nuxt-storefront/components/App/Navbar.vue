<template>
  <header class="navbar">
    <nav>
      <span>
        <NuxtLink to="/"> Home </NuxtLink>
        <NuxtLink to="/products"> Products </NuxtLink>
      </span>

      <div class="logo">
        <h1>Medusa/Nuxt Store</h1>
      </div>
      <span>
        <NuxtLink to="/account">Account</NuxtLink>
        <NuxtLink to="/cart">Cart</NuxtLink>
      </span>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  width: 100vw;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--primary-main);
  color: #efefef;
  display: flex;
  align-items: center;
  padding: 0px 16px;

}

.navbar nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 8px;

}

.logo {
  display: flex;
  align-items: center;
  gap: 1em;
}

.navbar span {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
}

.navbar a {
  color: #fefefe;
}
</style>
