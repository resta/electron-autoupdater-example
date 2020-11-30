<template lang="html">
  <div class="container">
    <div class="logo"></div>
    <div>
      <h1>{{ app.name }}</h1>
    </div>
    <div>
      vestion: <code>{{ app.version }}</code>
    </div>
    <div>
      <a v-if="!status" href="#" @click.prevent="checkforupdates()">check for updates</a>
      <span v-else>{{ status }}</span>
      <span v-if="action" @click.prevent="doaction()">{{ action }}</span>
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
      },
      status: '',
      action: ''
    }
  },
  async created () {
    const { name, version } = await window.electron.getappinfo()

    this.app.name = name
    this.app.version = version

    window.electron.onmessage(({ status, data }) => {
      console.log(status, data)

      if (status === 'checking-for-update') {
        this.status = 'checking for update ...'
      } else if (status === 'update-available') {
        this.status = `update available: v${data.version}`
        this.action = 'download'
      } else if (status === 'update-not-available') {
        this.status = 'you are using latest version'
      } else if (status === 'error') {
        this.status = `update error`
      } else if (status === 'download-progress') {
        this.status = `downloading update: ${data.percent}%`
      } else if (status === 'update-downloaded') {
        this.status = `update downloaded`
        this.action = 'quitandinstall'
      }
    })
  },
  methods: {
    checkforupdates () {
      window.electron.checkforupdates()
    },
    doaction () {
      if (this.action === 'download') {
        window.electron.downloadupdate()
      } else if (this.action === 'quitandinstall') {
        window.electron.quitandinstallupdate()
      }

      this.action = ''
    }
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
