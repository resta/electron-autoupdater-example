<template lang="html">
  <div class="container">
    <div class="">
      <h1>{{ app.name }}</h1>
    </div>
    <div class="">
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

    window.electron.onmessage()
      .then(msg => console.log(msg))
      .catch(err => console.error(err.message))
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
}

</style>

<style lang="css" src="./assets/css/hack.css"></style>

<style lang="scss" src="./styles/main.scss"></style>
