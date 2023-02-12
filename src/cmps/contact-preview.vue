<template>
  <article>
    <h4>{{ contact.name }}</h4>
    <!-- <span>Phone number: {{ contact.phone }}</span>
    <br />
    <span>Email address: {{ contact.email }}</span> -->
  </article>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
h4 {
  margin: 0;
  margin-block-end: 10px;
}
</style>