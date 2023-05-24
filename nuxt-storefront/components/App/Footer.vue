<template>
  <footer>
    <span>
      <a href="/">Create return</a>
      <a href="/">FAQ</a>
      <a href="/">Terms &amp; Conditions</a>
    </span>
    <span>
      <a href="https://www.github.com/medusajs">GitHub</a>
      <a href="https://www.twitter.com/medusajs">Twitter</a>
      <a href="https://discord.gg/ruGn9fmv9q">Discord</a>
    </span>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-top: 2px solid var(--primary-main);
}

footer span {
  display: flex;
  gap: 0.5em;
}

footer a {
  color: var(--primary-main);
}
</style>
