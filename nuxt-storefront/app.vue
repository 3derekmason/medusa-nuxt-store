<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap");
:root {
  --primary-main: #003b5c;
  --font-main: "Inter", sans-serif;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: var(--font-main);
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:active {
  opacity: 0.6;
}
</style>
