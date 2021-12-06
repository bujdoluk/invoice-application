<template>
  <div class="flex flex-column">
    <div>
      <form class="login-form flex flex-column" @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input
          class="input"
          type="email"
          required
          placeholder="email"
          v-model="email"
        />
        <input
          class="input"
          type="password"
          required
          placeholder="password"
          v-model="password"
        />
        <div v-if="error" class="error">{{ error }}</div>
        <button class="purple">Log in</button>
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
import useLogin from "../composables/useLogin";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const router = useRouter();

    const { error, login } = useLogin();

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "Home" });
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style lang="scss" scoped>
.login-form {
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