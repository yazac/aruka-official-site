<!-- layouts/default.vue -->
<template>
  <div>
    <!-- ヘッダー -->
    <header class="header">
      <h1>My Nuxt 3 App</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink> | 
        <NuxtLink to="/about">About</NuxtLink>
      </nav>
    </header>

    <!-- メインコンテンツ -->
    <main class="main">
      <slot />
    </main>

    <!-- フッター -->
    <footer class="footer">
      <p>&copy; 2025 My Nuxt App</p>
    </footer>
  </div>
</template>

<style scoped>
.header {
  background: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}
.nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
.footer {
  background: #222;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}
</style>