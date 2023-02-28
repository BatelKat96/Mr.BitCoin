<template>
  <section class="login-signup-section">
    <div v-if="!isSignup">
      <h2>Login</h2>
      <form @submit.prevent="onLogin">
        <fieldset>
          <legend>Enter your name</legend>
          <input
            v-model="user.name"
            type="text"
            placeholder="Enter your name.."
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </fieldset>
      </form>
    </div>

    <div v-if="isSignup">
      <h2>Signup</h2>
      <form @submit.prevent="onSignup">
        <fieldset>
          <legend>Enter your name</legend>
          <input
            v-model="user.name"
            type="text"
            placeholder="Enter your name.."
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </fieldset>
      </form>
    </div>

    <p>
      Would you like to
      <button className="btn-link" @click="onToggleSignup">
        {{ !isSignup ? "Signup" : "Login" }}
      </button>
    </p>

    <img src="/bitcoin-icons-for-log.png" />
  </section>
</template>

<script>
import { userService } from "../services/user.service.js";
import { showErrorMsg } from "../services/event-bus.service.js";

export default {
  data() {
    return {
      user: null,
      isSignup: false,
    };
  },
  async created() {
    this.user = userService.getEmptyCredentials();
  },
  methods: {
    async onLogin() {
      const userToLogin = { ...this.user };
      try {
        await this.$store.dispatch({ type: "login", credentials: userToLogin });
        this.$router.push("/home");
      } catch (err) {
        showErrorMsg(`Login failed, User name doesn\'t exist`);
      }
    },
    async onSignup() {
      const userToLogin = { ...this.user };
      try {
        await this.$store.dispatch({
          type: "signup",
          credentials: userToLogin,
        });
        this.$router.push("/home");
      } catch (err) {
        showErrorMsg(`Signup failed`);
      }
    },
    onToggleSignup() {
      this.isSignup = !this.isSignup;
    },
  },
};
</script>

<style>
</style>