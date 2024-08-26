<template>
  <header>
    <nav>
      <px-icon />
      <router-link class="encabezado" :to="{ name: 'home' }">PlatziExchange</router-link>
      <router-link 
      class="links"
      v-for="l in links"
      :key="l.title"
      :to="l.to"
      >{{  l.title  }}
    </router-link>
    </nav>
  </header>
</template>

<script>
import PxIcon from "@/components/Pxicon.vue"

export default {
  name: "PxHeader",
  components: { PxIcon },

  props: {
    links: {
      type: Array,
      default:() => []
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header nav {
  background: rgb(74 222 128);
  height: 12vh;
  display: flex;
  align-items: center;
}

header nav .encabezado {
  color: #eeeeee;
  margin-left: 20px;
  text-decoration: none;
  font-size: 1.5rem; 
  font-weight: bold;
  line-height: 1.2; 
  cursor: pointer;
  transition: color 0.3s ease;
}

.links {
  font-size: 15px; 
  color: rgba(255, 255, 255, 0.6); 
  text-decoration: none;
  margin: 0 20px;
}

.links:hover {
  color: rgba(224, 224, 224, .8); 
}

.links:active {
  color: rgba(255, 255, 255, 1); 
}
</style>
