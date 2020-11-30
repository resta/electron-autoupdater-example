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
      <span v-if="action">
        |
        <a href="#" @click.prevent="doaction()">{{ actiontext }}</a>
      </span>
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
      action: '',
      actiontext: ''
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
        this.actiontext = 'download update'
      } else if (status === 'update-not-available') {
        this.status = 'you are using latest version'
        this.action = 'check'
        this.actiontext = 'check again'
      } else if (status === 'error') {
        this.status = `update error`
      } else if (status === 'download-progress') {
        this.status = `downloading update: ${Math.round(data.percent)}%`
      } else if (status === 'update-downloaded') {
        this.status = `update downloaded`
        this.action = 'quitandinstall'
        this.actiontext = 'quit and install'
      }
    })
  },
  methods: {
    checkforupdates () {
      window.electron.checkforupdates()
    },
    doaction () {
      if (this.action === 'check') {
        this.checkforupdates()
      } else if (this.action === 'download') {
        this.status = 'preparing download...'
        window.electron.downloadupdate()
      } else if (this.action === 'quitandinstall') {
        this.status = 'installing update...'
        window.electron.quitandinstallupdate()
      }

      this.action = ''
      this.actiontext = ''
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
