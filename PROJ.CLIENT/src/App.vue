<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

// Use Vue Router to navigate programmatically
const router = useRouter()

// Get the value of a cookie by name
const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split('; ')
  const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`))
  return cookie ? cookie.split('=')[1] : undefined
}

// Get the expiration date of a cookie (if present)
const getCookieExpiration = (name: string): Date | null => {
  const cookies = document.cookie.split('; ')
  const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`))
  
  if (!cookie) return null;

  const cookieParts = cookie.split('; ');
  const expirationPart = cookieParts.find(part => part.startsWith('expires='));
  
  if (expirationPart) {
    const expirationDate = expirationPart.split('=')[1];
    return new Date(expirationDate);
  }

  return null;
}

// Check if a cookie is expired based on its expiration date
const isCookieExpired = (name: string): boolean => {
  const expirationDate = getCookieExpiration(name);
  if (!expirationDate) return false; // No expiration date means the cookie does not expire

  return expirationDate < new Date(); // If the expiration date has passed
}

// Redirect to login if the cookie doesn't exist or is expired
onMounted(() => {
  const token = getCookie('token');
  
  if (!token || isCookieExpired('token')) {
    router.push('/login');
  }
});
</script>




<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
