<template>
  <section class="transfer-funds-section">
    <form @submit.prevent="onTransfer">
      <fieldset>
        <legend>Transfer amount</legend>
        <input
          type="number"
          v-model="amount"
          min="0"
          placeholder="Enter amount..."
        />
        <br />
        <br />
        <button type="submit">Transfer</button>
      </fieldset>
    </form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    onTransfer() {
      this.$emit("transfer", this.amount);
    },
  },
};
</script>

<style>
</style>