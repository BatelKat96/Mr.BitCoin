<template>
  <div class="contact-filter">
    <label>Search</label>
    <input
      @input="onFilter"
      v-model="filterBy.txt"
      type="text"
      placeholder="Enter name"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: "",
      },
    };
  },
  methods: {
    onFilter() {
      this.$emit("filter", this.filterBy);
    },
  },
};
</script>

<style lang="scss">
label {
  margin-inline-end: 10px;
}
</style>
