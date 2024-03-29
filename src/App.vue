<template>
  <div v-if="invoicesLoaded">
    <div class="app flex flex-column">
      <Navigation />
      <div class="app-content flex flex-column">
        <Modal v-if="modalActive" />
        <transition name="invoice">
          <InvoiceModal v-if="invoiceModal" />
        </transition>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navigation from "./components/Navigation.vue";
import InvoiceModal from "./components/InvoiceModal.vue";
import Modal from "./components/Modal.vue";
import Signup from "./components/Signup.vue";
import Login from "./components/Login.vue";
export default {
  data() {
    return {
      showLogin: null,
    };
  },
  components: {
    Navigation,
    InvoiceModal,
    Modal,
    Signup,
    Login,
  },
  created() {
    this.GET_INVOICES();
    window.addEventListener("resize", this.checkScreen);
  },
  methods: {
    ...mapActions(["GET_INVOICES"]),
  },
  computed: {
    ...mapState(["invoiceModal", "modalActive", "invoicesLoaded"]),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
// Reset
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.app {
  background-color: #f8f8fb;
  min-height: 100vh;

  @media (max-width: 900px) {
    flex-direction: column;
  }

  .app-content {
    padding: 60px 20px;
    flex: 1;
    position: relative;
  }
}

.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  color: white;

  p {
    margin-top: 16px;
  }
}

// animated invoice

.invoice-enter-active,
.invoice-leave-active {
  transition: 0.8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-700px);
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: white;
}
.dark-purple {
  background-color: #252945;
}
.red {
  background-color: #ec5757;
}
.red:hover {
  background-color: #ff9797;
}
.purple {
  background-color: #7c5dfa;
}
.purple:hover {
  background-color: #9277ff;
}
.green {
  background-color: #33d69f;
}
.orange {
  background-color: #ff8f00;
}
// utility classes
.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;
  padding-top: 72px;
}
.nav-link {
  text-decoration: none;
  color: initial;
}
// Status Button Styling
.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}
.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}
.pending {
  &::before {
    background-color: #ff8f00;
  }
  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}
.draft {
  &::before {
    background-color: #dfe3fa;
  }
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>
