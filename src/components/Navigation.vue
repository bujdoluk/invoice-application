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
      <div class="logsign flex" v-else>
        <router-link class="btn" :to="{ name: 'Signup' }">Sign Up</router-link>
        <router-link class="btn" :to="{ name: 'Login' }">Log In</router-link>
      </div>
    </div>
    <div class="bottom flex">
      <div class="theme flex">
        <input
          @change="toggleTheme"
          id="checkbox"
          type="checkbox"
          class="switch-checkbox"
        />
        <label for="checkbox" class="switch-label">
          <span>🌙</span>
          <span>☀️</span>
          <div
            class="switch-toggle"
            :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
          ></div>
        </label>
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
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);
  },
  data() {
    return {
      userTheme: "light-theme",
    };
  },
  methods: {
    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },

    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// dark theme
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

.switch-checkbox {
  display: none;
}

.switch-label {
  /* for width, use the standard element-size */
  width: var(--element-size);

  /* for other dimensions, calculate values based on it */
  border-radius: var(--element-size);
  border: calc(var(--element-size) * 0.025) solid var(--accent-color);
  padding: calc(var(--element-size) * 0.1);
  font-size: calc(var(--element-size) * 0.3);
  height: calc(var(--element-size) * 0.35);

  align-items: center;
  background: var(--text-primary-color);
  cursor: pointer;
  display: flex;
  position: relative;
  transition: background 0.5s ease;
  justify-content: space-between;
  z-index: 1;
}

.switch-toggle {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: calc(var(--element-size) * 0.07);
  left: calc(var(--element-size) * 0.07);
  height: calc(var(--element-size) * 0.4);
  width: calc(var(--element-size) * 0.4);
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
  transform: translateX(calc(var(--element-size) * 0.6)) !important;
}

///////////////////////////////////////

header {
  z-index: 99;
  flex-direction: column;
  justify-content: space-between;
  background-color: #1e2139;
  width: 80px;
  height: 100%;
  position: fixed;

  @media only screen and (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    height: 80px;
  }
}

.background {
  width: 80px;
  height: 80px;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  background: (#f8f8fb 50%, #1e2139 50%);
  @media only screen and (max-width: 900px) {
    background: #1e2139;
  }
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

  @media only screen and (max-width: 900px) {
    margin-top: 0;
    align-items: center;
    padding-top: 10px;
  }

  .logsign {
    height: 80px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 8px;
    @media only screen and (max-width: 900px) {
      padding: 0px;
      margin-left: 100px;
      width: 100%;
      gap: 20px;
      flex-direction: row;
    }
  }

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
    margin-top: 40px;
    margin-left: -15px;
  }

  .logout:hover {
    color: #7c5dfa;
  }
}

.bottom {
  justify-content: center;
  //align-items: center;
  flex-direction: column;

  @media only screen and (max-width: 900px) {
    flex-direction: row;
  }
}

.theme {
  border-bottom: 1px solid grey;
  width: 80px;
  justify-content: center;
  padding: 25px;
  @media (max-width: 900px) {
    border-right: 1px solid grey;
    border-bottom: none;
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

  margin: 20px 24px;
  @media (max-width: 900px) {
    margin: 24px 20px;
  }
}
</style>
