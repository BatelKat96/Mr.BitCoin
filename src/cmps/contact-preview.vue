<template>
  <article class="contact-preview-article">
    <h3>{{ contact.name }}</h3>
    <img
      :src="`https://randomuser.me/api/portraits/men/${contact.imgId}.jpg`"
    />
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
</style>