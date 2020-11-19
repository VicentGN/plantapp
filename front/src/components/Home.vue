<template>
  <div>
    <div class="img-container">
      <img src="../assets/homeimage.jpg" alt="homeimage">
    </div>
    <h1>PlantApp</h1>
    <div>
      Bienvenido al espacio que te permitirá registrar todas aquellas especies vegetales que te
      vayas encontrando por el campo o monte
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .img-container{
    margin: auto;
    width: 600px;
    img {
      width: 100%;
          border-radius: 100px;
    }
  }
  h1 {
    font-size: 48px;
  }
  p {
    color: black;
  }
</style>