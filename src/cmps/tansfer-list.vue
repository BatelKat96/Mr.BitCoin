<template>
  <section class="tansfer-list-section">
    <h3>Last transactions</h3>
    <ul class="transfer-list">
      <li
        class="list-preview"
        v-for="transaction in transactions"
        :key="transaction.date"
      >
        <span>To {{ transaction.to }} - </span>
        <span> At {{ formatedDate(transaction) }} - </span>
        <span> Amount ${{ transaction.amount }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { utilService } from "../services/util.service";

export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formatedDate() {
      return (transaction) => {
        return utilService.getFormattedDate(transaction.date);
      };
    },
    currUser() {
      return this.$store.getters.user;
    },
    transactions() {
      if (this.contact) {
        return this.currUser.transactions.filter(
          (transaction) => transaction.toId === this.contact._id
        );
      } else {
        return this.currUser.transactions.slice(-5).reverse();
      }
    },
  },
};
</script>

<style>
</style>