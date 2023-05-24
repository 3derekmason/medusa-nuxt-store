<template>
  <div class="hero">
    <h1>Shop till you drop!</h1>
  </div>
</template>

<style>
.hero {
  width: 100%;
  height: 88px;
  background-image: radial-gradient(
    farthest-corner circle at 100% 0%,
    var(--secondary-main) 0%,
    var(--primary-main) 100%
  );
  display: grid;
  place-content: center;
  margin: 1em 0;
}
.hero h1 {
  letter-spacing: 0.25em;
  color: #fff;
}
</style>
