<template lang="html">
  <div class="container">
    <div class="logo"></div>
    <div>
      <h1>{{ app.name }}</h1>
    </div>
    <div>
      vestion: <code>{{ app.version }}</code>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      app: {
        name: '',
        version: ''
      }
    }
  },
  async created () {
    const { name, version } = await window.electron.getappinfo()

    this.app.name = name
    this.app.version = version

    window.electron.onmessage(msg => {
      console.log(msg)
    })
  }
}
</script>

<style lang="scss" scoped>

.container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: column;

  justify-content: center;
  align-items: center;

  .logo {
    display: inline-block;
    width: 100px;
    height: 100px;

    background-image: url('./assets/images/electron-logo.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
}

</style>

<style lang="css" src="./assets/css/hack.css"></style>

<style lang="scss" src="./styles/main.scss"></style>
