<template >
  <header>
    <h1>Mr. <br />₿itCoin</h1>
    <p v-if="currUser" class="header-p">
      Hi {{ currUser.name }}
      <span> <button @click="onLogout">Logout</button></span>
    </p>
  </header>
</template>

<script>
export default {
  data() {
    return {
      currRate: null,
    };
  },
  created() {
    this.$store.dispatch({ type: "setLogginUser" });
  },
  computed: {
    currUser() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async onLogout() {
      try {
        await this.$store.dispatch({ type: "logout" });
        // this.$router.push("/home");
      } catch (err) {
        showErrorMsg(`Logout failed`);
      }
    },
  },
};
</script>

<style lang="sass">
</style>
