<template>
  <section class="side-bar-menu-section">
    <nav>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/statistics">Statistics</RouterLink>
      <RouterLink v-if="!currUser" to="/"> Login</RouterLink>
    </nav>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>