<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Registro de Plantas</router-link> |
      <router-link to="/view">Listado de Plantas</router-link> |
      <router-link to="/about">Sobre PlantApp</router-link>
    </div>
    <router-view :key="$route.path"/>
    <div id="footer"> <p>PlantApp - 2020</p><a href='https://www.freepik.com/photos/flower'>Flower photo created by jcomp - www.freepik.com</a></div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
  font-size: 20px;

  a {
    font-weight: bold;
    color: #42b883;

    &.router-link-exact-active {
      color: #305a46;
    }
  }
}

router-link {
  cursor: pointer;
}

#footer {
  margin-top: 40px;
  p {
    margin-top: 20px;
  }
}
</style>
