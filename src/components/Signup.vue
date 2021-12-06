<template>
  <div>
    <div>
      <form class="signup-form flex flex-column" @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>
        <input
          class="input"
          type="text"
          required
          placeholder="Display name"
          v-model="displayName"
        />
        <input
          class="input"
          type="email"
          required
          placeholder="Email"
          v-model="email"
        />
        <input
          class="input"
          type="password"
          required
          placeholder="Password"
          v-model="password"
        />
        <div v-if="error" class="error">{{ error }}</div>
        <button class="purple">Sign up</button>
      </form>
    </div>

    <div class="browse flex">
      <button class="link">
        <router-link :to="{ name: 'Home' }">Browse as a Guest</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, signup } = useSignup();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const displayName = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        router.push({ name: "Home" });
      }
    };

    return { email, password, displayName, handleSubmit };
  },
};
</script>

<style lang="scss" scoped>
.signup-form {
  background-color: #f8f8fb;
  width: 500px;
  height: 300px;
  margin: 200px auto;
  padding: 32px;
  gap: 16px;
  justify-content: center;
  align-items: center;
  .error {
    color: #ff3f80;
    font-size: 14px;
  }
  .input {
    border-radius: 50%;
    width: 100%;
    background-color: rgb(255, 255, 255);
    color: black;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
  }

  input:placeholder-shown {
    color: black;
  }

  h3 {
    color: #7c5dfa;
  }
}

.browse {
  justify-content: center;
  align-items: center;
  margin-top: -200px;
  .link {
    width: 180px;
    padding: 20px;
    background-color: #7c5dfa;

    a {
      color: white;
      text-decoration: none;
    }
  }

  .link:hover {
    background-color: #9277ff;
  }
}
</style>