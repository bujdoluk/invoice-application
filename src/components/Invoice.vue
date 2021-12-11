<template>
  <div>
    <router-link
      v-if="!mobile"
      class="invoice flex"
      :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
    >
      <div class="left flex">
        <span class="tracking-number"
          ><span class="tracking-sign">#</span>{{ invoice.invoiceId }}</span
        >
        <span class="due-date">{{ invoice.paymentDueDate }}</span>
        <span class="person">{{ invoice.clientName }}</span>
      </div>

      <div class="right flex">
        <span class="price">{{ invoice.invoiceTotal }} $</span>
        <div
          class="status-button flex"
          :class="{
            paid: invoice.invoicePaid,
            draft: invoice.invoiceDraft,
            pending: invoice.invoicePending,
          }"
        >
          <span class="green-font" v-if="invoice.invoicePaid">Paid</span>
          <span class="draft-font" v-if="invoice.invoiceDraft">Draft</span>
          <span class="pending-font" v-if="invoice.invoicePending"
            >Pending</span
          >
        </div>
        <div class="icon">
          <img src="@/assets/icon-arrow-right.svg" alt="right" />
        </div>
      </div>
    </router-link>

    <router-link
      v-else
      class="invoice flex"
      :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
    >
      <div class="left flex flex-column">
        <span class="tracking-number">#{{ invoice.invoiceId }}</span>
        <span class="due-date">{{ invoice.paymentDueDate }}</span>
        <span class="price">{{ invoice.invoiceTotal }} $</span>
      </div>

      <div class="right flex flex-column">
        <span class="person">{{ invoice.clientName }}</span>

        <div
          class="status-button flex"
          :class="{
            paid: invoice.invoicePaid,
            draft: invoice.invoiceDraft,
            pending: invoice.invoicePending,
          }"
        >
          <span v-if="invoice.invoicePaid">Paid</span>
          <span v-if="invoice.invoiceDraft">Draft</span>
          <span v-if="invoice.invoicePending">Pending</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: null,
    };
  },
  name: "invoice",
  props: ["invoice"],
  created() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  methods: {
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 375) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },
  },
};
</script>

<style lang="scss" scoped>
:root {
  --background-color-primary: #f8f8fb;
  --background-color-secondary: #ffffff;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --element-size: 4rem;
}

:root.dark-theme {
  --background-color-primary: #141625;
  --background-color-secondary: #1e2139;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
}

.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #858bb2;
  border-radius: 20px;
  padding: 14px 16px;
  background-color: var(--background-color-secondary);
  align-items: center;
  @media (min-width: 376px) {
    padding: 28px 32px;
  }

  span {
    font-size: 13px;
  }

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;

    .price {
      font-size: 16px;
      font-weight: bold;
    }

    span {
      flex: 1;
    }

    .tracking-number {
      text-transform: uppercase;
      font-weight: bold;
      color: black;
    }

    .tracking-sign {
      color: #858bb2;
    }
  }

  .right {
    gap: 16px;
    flex-basis: 50%;
    align-items: center;
    @media (min-width: 375px) {
      flex-basis: 40%;
    }

    .status-button {
      margin: 0 auto;

      .draft-font {
        color: #858bb2;
        font-weight: bold;
      }

      .pending-font {
        color: #ff8f00;
        font-weight: bold;
      }

      .paid-font {
        color: #33d69f;
        font-weight: bold;
      }
    }

    .price {
      flex: 1;
      font-size: 16px;
      font-weight: bold;
      color: black;
    }
  }
}
</style>