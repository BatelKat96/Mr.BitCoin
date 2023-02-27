<template>
  <li class="list-preview" :key="transaction.date">
    <span>To {{ transaction.to }} - </span>
    <span> At {{ formatedDate(transaction) }} - </span>
    <span> Amount ${{ transaction.amount }}</span>
  </li>
</template>

<script>
import { utilService } from "../services/util.service";
export default {
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },

  computed: {
    formatedDate() {
      return (transaction) => {
        console.log("transaction.date:", transaction.date);
        return utilService.getFormattedDate(transaction.date);
      };
    },
    currUser() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style>
</style>