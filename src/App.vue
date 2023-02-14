<script>
import AppHeader from "@/cmps/app-header.vue";
import AppFooter from "@/cmps/app-footer.vue";
import UserMsg from "@/cmps/user-msg.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    UserMsg,
  },
};
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
  <UserMsg />
</template>

<style scoped>
main {
  min-height: calc(90vh - 4rem);
}
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
