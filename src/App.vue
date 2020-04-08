<template>
  <div id="app">
    OI
    <!-- <header>
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
             <span>{{ item.createAt }}</span> 
          </li>
        </ul>
        
      </section>
    </div> -->
  </div>
</template>

<script>
  
  export default {
    name: 'App',
    data: () => {
      return {
        list: [{
          name: 'teste'
        }]
      }
    },

    mounted() {
      this.checkCupons();
    },

    methods: {
      checkCupons: function() {
        console.log(123)
      }
    }
  }
</script>

<!-- 
<style lang="sass">
  @import './style/index.sass';
</style> -->