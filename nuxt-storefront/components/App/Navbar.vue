<template>
  <div class="navbar">
    <header>
      <nav>
        <div class="logo">
          <h1>Medusa/Nuxt Store</h1>
          <span>
            <NuxtLink to="/"> Home </NuxtLink>
            <NuxtLink to="/products"> Products </NuxtLink>
          </span>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.navbar {
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 20;
  background: #fefefe;
  display: flex;
  align-items: center;
  padding: 0px 8px;
}

.navbar nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.logo {
  display: flex;
  align-items: center;
  gap: 1em;
}

.logo span {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
}
</style>
