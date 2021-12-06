<template>
  <header class="flex">
    <div class="background flex"></div>
    <div class="top flex">
      <img src="@/assets/logo.svg" alt="logo" />
    </div>

    <div class="links flex">
      <div v-if="user">
        <button class="logout" @click="handleClick">Logout</button>
      </div>
      <div class="flex flex-column" v-else>
        <router-link class="btn" :to="{ name: 'Signup' }">Sign Up</router-link>
        <router-link class="btn" :to="{ name: 'Login' }">Log In</router-link>
      </div>
    </div>
    <div class="bottom flex">
      <div class="theme flex">
        <img
          @click="modeToggle"
          class="theme-img"
          :class="darkTheme"
          src="@/assets/icon-sun.svg"
          alt="sun"
        />
      </div>
      <div>
        <img class="avatar" src="@/assets/image-avatar.jpg" alt="avatar" />
      </div>
    </div>
  </header>
</template>

<script>
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      console.log("User Logged Out");
      router.push({ name: "Login" });
    };

    return { handleClick, user };
  },
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  flex-direction: column;
  justify-content: space-between;
  background-color: #1e2139;
  max-width: 80px;
  position: relative;

  @media only screen and (max-width: 900px) {
    width: 100%;
    flex-direction: row;
  }
}

.background {
  width: 80px;
  height: 80px;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(#f8f8fb, #1e2139);
}

.top {
  position: fixed;
  z-index: 2;
  max-width: 80px;
  max-height: 80px;
  border-radius: 0 20px 20px 0;
  background-color: #7c5dfa;
  justify-content: center;
  padding: 24px;

  img {
    width: auto;
    height: 30px;
  }
}

.links {
  color: white;
  font-weight: bold;
  margin-top: 700px;
  text-align: center;
  padding: 8px;

  .btn {
    color: white;
    margin-bottom: 20px;
  }

  .btn:hover {
    color: #7c5dfa;
  }
  a {
    text-decoration: none;
  }

  .logout {
    font-weight: bold;
    color: white;
    background: none;
    font-size: 14px;
    text-align: center;
    margin-top: 40px;
  }

  .logout:hover {
    color: #7c5dfa;
  }
}

.bottom {
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.theme {
  border-right: 1px solid grey;
  width: 80px;
  justify-content: center;
  padding: 25px;
  @media (min-width: 900px) {
    border-bottom: 1px solid grey;
    border-right: none;
  }
}

.theme-img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 20px;
  @media (min-width: 900px) {
    margin: 20px 0;
  }
}
</style>
