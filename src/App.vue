<template>
  <div id="app">
    <header>
      <div class="logo bg"></div>
      <h1>Painel de controle</h1>
    </header>
    <div class="panel relative dark">
      <section class="relative">
        <span>Servidor status</span>
        <md-button class="float-button md-fab md-mini md-plain absolute off">
          <md-icon>power_settings_new</md-icon>
        </md-button>
      </section>

      <section class="list-cupons light">
        <p>Lista de impressão</p>
        <ul v-for="(item, index) in list" :key="index"> 
          <li>
            {{ item.name }}
            <!-- <span>{{ item.createAt }}</span> -->
          </li>
        </ul>
        
      </section>
    </div>
  </div>
</template>

<script>
  const storage = require('electron-json-storage');
  
  export default {
    name: 'App',
    data: () => {
      return {
        list: []
      }
    },

    mounted() {
      this.checkCupons();
      
      const _this = this;
      storage.get('cupons', function(err, data) {
        _this.list = data
      })
    },

    methods: {
      checkCupons: function() {
        storage.get('cupons', function(error, data) {
          if (error) throw error;
          if(!data.cupons || data.length == 0) {
            storage.set('cupons', [])
          }
        });
      }
    }
  }
</script>

<!-- Style -->
<style lang="sass">
  @import './style/index.sass';
</style>