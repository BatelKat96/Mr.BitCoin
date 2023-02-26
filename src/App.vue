  
<template>
  <AppHeader />
  <main class="main-container">
    <RouterView />
  </main>
  <AppFooter />
  <UserMsg />
</template>
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

<style scoped>
</style>
