<template>
  <div>
    <div v-if="currentInvoice" class="invoice-view container">
      <router-link class="nav-link flex" :to="{ name: 'Home' }">
        <img src="@/assets/icon-arrow-left.svg" alt="left" /> Go Back
      </router-link>

      <!-- Header -->
      <div v-if="!mobile" class="header flex">
        <div class="left flex">
          <span>Status</span>
          <div
            class="status-button flex"
            :class="{
              paid: currentInvoice.invoicePaid,
              draft: currentInvoice.invoiceDraft,
              pending: currentInvoice.invoicePending,
            }"
          >
            <span v-if="currentInvoice.invoicePaid">Paid</span>
            <span v-if="currentInvoice.invoiceDraft">Draft</span>
            <span v-if="currentInvoice.invoicePending">Pending</span>
          </div>
        </div>
        <div class="right flex">
          <button @click="toggleEditInvoice" class="dark-purple">Edit</button>
          <button @click="deleteInvoice(currentInvoice.docId)" class="red">
            Delete
          </button>
          <button
            v-if="currentInvoice.invoicePending"
            @click="updateStatusToPaid(currentInvoice.docId)"
            class="green"
          >
            Mark as Paid
          </button>
          <button
            v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
            @click="updateStatusToPending(currentInvoice.docId)"
            class="orange"
          >
            Mark as Pending
          </button>
        </div>
      </div>

      <div v-else class="header flex">
        <div class="left flex">
          <span>Status</span>
          <div
            class="status-button flex"
            :class="{
              paid: currentInvoice.invoicePaid,
              draft: currentInvoice.invoiceDraft,
              pending: currentInvoice.invoicePending,
            }"
          >
            <span v-if="currentInvoice.invoicePaid">Paid</span>
            <span v-if="currentInvoice.invoiceDraft">Draft</span>
            <span v-if="currentInvoice.invoicePending">Pending</span>
          </div>
        </div>
      </div>

      <!-- Invoice Details -->
      <div v-if="!mobile" class="invoice-details flex flex-column">
        <div class="top flex">
          <div class="left flex flex-column">
            <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
            <p>{{ currentInvoice.productDescription }}</p>
          </div>
          <div class="right flex flex-column">
            <p>{{ currentInvoice.billerStreetAddress }}</p>
            <p>{{ currentInvoice.billerCity }}</p>
            <p>{{ currentInvoice.billerZipCode }}</p>
            <p>{{ currentInvoice.billerCountry }}</p>
          </div>
        </div>

        <div class="middle flex">
          <div class="payment flex flex-column">
            <h4>Invoice Date</h4>
            <p>{{ currentInvoice.invoiceDate }}</p>
            <h4>Payment Date</h4>
            <p>{{ currentInvoice.paymentDueDate }}</p>
          </div>

          <div class="bill flex flex-column">
            <h4>Bill To</h4>
            <p>{{ currentInvoice.clientName }}</p>
            <p>{{ currentInvoice.clientStreetAddress }}</p>
            <p>{{ currentInvoice.clientCity }}</p>
            <p>{{ currentInvoice.clientZipCode }}</p>
            <p>{{ currentInvoice.clientCountry }}</p>
          </div>

          <div class="send-to flex flex-column">
            <p>{{ currentInvoice.clientEmail }}</p>
          </div>
        </div>

        <div class="bottom flex flex-column">
          <div class="billing-items">
            <div class="heading flex">
              <p>Item Name</p>
              <p>QTY</p>
              <p>Price</p>
              <p>Total</p>
            </div>
            <div
              v-for="(item, index) in currentInvoice.invoiceItemList"
              :key="index"
              class="item flex"
            >
              <p>{{ item.itemName }}</p>
              <p>{{ item.qty }}</p>
              <p>$ {{ item.price }}</p>
              <p>$ {{ item.total }}</p>
            </div>
          </div>
          <div class="total flex">
            <p>Amount Due</p>
            <p>$ {{ currentInvoice.invoiceTotal }}</p>
          </div>
        </div>
      </div>

      <!-- Mobile Invoice Details <= 375px -->
      <div v-else class="invoice-details flex flex-column">
        <!-- Top -->
        <div class="top flex flex-column">
          <div class="left flex flex-column">
            <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
            <p>{{ currentInvoice.productDescription }}</p>
          </div>
          <div class="right flex flex-column">
            <p>{{ currentInvoice.billerStreetAddress }}</p>
            <p>{{ currentInvoice.billerCity }}</p>
            <p>{{ currentInvoice.billerZipCode }}</p>
            <p>{{ currentInvoice.billerCountry }}</p>
          </div>
        </div>
        <!-- Middle -->
        <div class="middle flex flex-column">
          <div class="flex">
            <div class="payment flex flex-column">
              <h4>Invoice Date</h4>
              <p>{{ currentInvoice.invoiceDate }}</p>
              <h4>Payment Date</h4>
              <p>{{ currentInvoice.paymentDueDate }}</p>
            </div>

            <div class="bill flex flex-column">
              <h4>Bill To</h4>
              <p>{{ currentInvoice.clientName }}</p>
              <p>{{ currentInvoice.clientStreetAddress }}</p>
              <p>{{ currentInvoice.clientCity }}</p>
              <p>{{ currentInvoice.clientZipCode }}</p>
              <p>{{ currentInvoice.clientCountry }}</p>
            </div>
          </div>
          <div class="flex flex-column">
            <h4>Sent to</h4>
            <p>{{ currentInvoice.clientEmail }}</p>
          </div>
        </div>
        <!-- Bottom -->
        <div class="bottom flex flex-column">
          <div class="billing-items">
            <div
              v-for="(item, index) in currentInvoice.invoiceItemList"
              :key="index"
              class="item flex"
            >
              <div class="flex flex-column">
                <p>{{ item.itemName }}</p>
                <p>{{ item.qty }} x $ {{ item.price }}</p>
              </div>

              <p>$ {{ item.total }}</p>
            </div>
          </div>
          <div class="total flex">
            <p>Amount Due</p>
            <p>$ {{ currentInvoice.invoiceTotal }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="mobile" class="buttons flex">
      <button @click="toggleEditInvoice" class="dark-purple">Edit</button>
      <button @click="deleteInvoice(currentInvoice.docId)" class="red">
        Delete
      </button>
      <button
        v-if="currentInvoice.invoicePending"
        @click="updateStatusToPaid(currentInvoice.docId)"
        class="green"
      >
        Mark as Paid
      </button>
      <button
        v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
        @click="updateStatusToPending(currentInvoice.docId)"
        class="orange"
      >
        Mark as Pending
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "invoiceView",
  data() {
    return {
      currentInvoice: null,
      mobile: null,
    };
  },
  created() {
    this.getCurrentInvoice();
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  methods: {
    ...mapMutations([
      "SET_CURRENT_INVOICE",
      "TOGGLE_EDIT_INVOICE",
      "TOGGLE_INVOICE",
    ]),

    ...mapActions([
      "DELETE_INVOICE",
      "UPDATE_STATUS_TO_PENDING",
      "UPDATE_STATUS_TO_PAID",
    ]),

    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 375) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },

    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
      this.currentInvoice = this.currentInvoiceArray[0];
    },

    toggleEditInvoice() {
      this.TOGGLE_EDIT_INVOICE();
      this.TOGGLE_INVOICE();
    },

    async deleteInvoice(docId) {
      await this.DELETE_INVOICE(docId);
      this.$router.push({ name: "Home" });
    },

    updateStatusToPaid(docId) {
      this.UPDATE_STATUS_TO_PAID(docId);
    },
    updateStatusToPending(docId) {
      this.UPDATE_STATUS_TO_PENDING(docId);
    },
  },
  computed: {
    ...mapState(["currentInvoiceArray", "editInvoice"]),
  },
  watch: {
    editInvoice() {
      if (!this.editInvoice) {
        this.currentInvoice = this.currentInvoiceArray[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .invoice-details {
    background-color: #1e2139;
    border-radius: 20px;
  }

  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;

    .left {
      align-items: center;

      margin-left: 30px;
      @media (min-width: 376px) {
        margin-left: 0;
      }

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;
      }
    }
  }

  .invoice-details {
    padding: 16px;
    margin-top: 24px;
    @media (min-width: 376px) {
      padding: 48px;
    }

    .top {
      flex-direction: column;
      align-items: flex-start;
      @media (min-width: 376px) {
        flex-direction: row;
      }
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 12px;
        margin-bottom: 20px;
        @media (min-width: 376px) {
          margin-bottom: 0;
        }

        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-start;

        @media (min-width: 376px) {
          align-items: flex-end;
        }
      }
    }

    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }

      .bill,
      .payment {
        flex: 1;
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 12px;
        }
      }

      .send-to {
        flex: 0;
        @media (min-width: 376px) {
          flex: 2;
        }
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #252945;

        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 32px;
          font-size: 13px;
          font-weight: bold;
          color: #fff;

          &:last-child {
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: #fff;
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;

        p {
          flex: 1;
          font-size: 12px;
        }

        p:nth-child(2) {
          font-size: 16px;
          text-align: right;
          @media (min-width: 376px) {
            font-size: 28px;
          }
        }
      }
    }
  }
}
.buttons {
  background-color: #1e2139;
  padding: 20px;
  margin: 0 -20px;
  min-width: 375px !important;
  justify-content: center;
  align-items: center;
}
</style>