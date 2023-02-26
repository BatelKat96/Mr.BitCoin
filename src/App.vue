  
<template>
  <AppHeader />
  <main>
    <SideBarMenu />
    <RouterView />
  </main>
  <AppFooter />
  <UserMsg />
</template>
<script>
import AppHeader from "@/cmps/app-header.vue";
import AppFooter from "@/cmps/app-footer.vue";
import UserMsg from "@/cmps/user-msg.vue";
import SideBarMenu from "@/cmps/side-bar-menu.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    UserMsg,
    SideBarMenu,
  },
};
</script>

<style scoped>
</style>
