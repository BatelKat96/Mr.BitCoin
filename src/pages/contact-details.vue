<template>
  <div v-if="contact" class="contact-details-selection">
    <div class="contact-details-container">
      <div>
        <h2>{{ contact.name }}</h2>
        <p>Email: {{ contact.email }}</p>
        <p>Phone: {{ contact.phone }}</p>
      </div>
      <img
        :src="`https://randomuser.me/api/portraits/${contact.gender}/${contact.imgId}.jpg`"
      />
    </div>

    <TransferFunds v-if="loggedInUser" @transfer="handleTransfer" />
    <TansferList v-if="loggedInUser" :contact="contact" />
    <RouterLink to="/contact">
      <button class="btn-back">Back</button>
    </RouterLink>
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service.js";
import TransferFunds from "../cmps/transfer-funds.vue";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import TansferList from "../cmps/tansfer-list.vue";

export default {
  data() {
    return {
      contact: null,
    };
  },

  async created() {
    const contactId = this.$route.params._id;
    this.contact = await contactService.getById(contactId);
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async handleTransfer(amount) {
      try {
        if (this.amount < 0) throw new Error("Amount is not valid");

        await this.$store.dispatch({
          type: "deposit",
          amount: amount,
          currContact: this.contact,
        });
        showSuccessMsg("Transfer successfully sent");
      } catch (err) {
        console.log(err);
        showErrorMsg("Transfer failed, Something went wrong!");
      }
    },
  },
  components: {
    TransferFunds,
    TansferList,
  },
};
</script>

<style lang="scss">
</style>
