<template>
  <Transition>
    <div v-if="msg && alive" class="user-msg" :class="userMsgType">
      <p>{{ msg.txt }}</p>
    </div>
  </Transition>
</template>

<script>
import { eventBus } from "@/services/event-bus.service.js";
export default {
  data() {
    return {
      msg: null,
      alive: false,
    };
  },
  created() {
    eventBus.on("show-msg", (msg) => {
      this.msg = msg;
      var delay = msg.delay || 2000;
      this.alive = true;
      setTimeout(() => {
        this.alive = false;
      }, delay);
    });
  },
  unmounted() {
    this.unListen();
  },
  methods: {
    showMsg(msg) {
      console.log(msg);
      this.msg = msg;
      setTimeout(() => (this.msg = null), msg.timeout || 1500);
    },
  },
  computed: {
    userMsgType() {
      if (!this.msg) return;
      return `${this.msg.type}`;
    },
  },
};
</script>

<style lang="scss"></style>
