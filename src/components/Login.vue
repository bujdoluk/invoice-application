<template>
  <form class="login-form flex flex-column" @submit.prevent="handleSubmit">
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
    <div class="error">{{ error }}</div>
    <button class="purple">Log in</button>
  </form>
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
        router.push("/");
      }
    };

    return { email, password, handleSubmit };
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  background-color: #1e2139;
  width: 500px;
  height: 300px;
  margin: 0 auto;
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
    background-color: #252945;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
  }
}
</style>