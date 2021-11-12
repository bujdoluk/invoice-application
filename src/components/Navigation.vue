<template>
  <header class="flex">
    <div class="top flex">
      <img src="@/assets/logo.svg" alt="logo" />
    </div>
    <div class="bottom flex">
      <div class="theme flex">
        <img
          @click="switchTheme"
          class="theme-img"
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
export default {
  name: "navigation",
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  flex-direction: row;
  justify-content: space-between;
  background-color: #1e2139;
  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }
}

.top {
  border-radius: 0 20px 20px 0;
  background-color: #7c5dfa;
  justify-content: center;

  padding: 24px;
  @media (min-width: 900px) {
    width: 100%;
  }

  img {
    width: auto;
    height: 30px;
  }
}

.bottom {
  justify-content: center;
  align-items: center;
  flex-direction: row;
  @media (min-width: 900px) {
    flex-direction: column;
  }
}

.theme {
  border-right: 1px solid grey;
  width: 90px;
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
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 20px;
  @media (min-width: 900px) {
    margin: 20px 0;
  }
}
</style>
