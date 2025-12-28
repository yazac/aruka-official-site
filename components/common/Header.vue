<template>
  <div class="c-header">
    <div class="c-header-logo">
      <CommonLogoArukuChan color="black" />
    </div>
    <nav class="c-header-nav">
      <ul role="list">
        <li role="listitem"><NuxtLink to="/">Home</NuxtLink></li>
        <li role="listitem"><NuxtLink to="/about">About</NuxtLink></li>
        <li role="listitem"><NuxtLink to="/about">About</NuxtLink></li>
        <li role="listitem"><NuxtLink to="/about">About</NuxtLink></li>
      </ul>

      <button>
        =
      </button>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';

.c-header {
  width: 100%;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.c-header-logo {
  width: 60px;
}

.c-header-nav {
  display: flex;
  align-items: center;
  gap: 40px;
  ul {
    display: flex;
    align-items: center;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      color: var.$color-black;
    }
  }

  button {
    font-size: 48px;
  }
}
</style>