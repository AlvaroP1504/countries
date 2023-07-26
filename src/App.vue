
<template>
  <div id="app" class="flex relative h-screen bg-slate-400">
    <!-- dialogo -->
    <div v-if="isDialogOpen" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div
          :class="['bg-white rounded p-4 transform transition-all duration-300', isDialogOpen ? 'translate-y-0' : '-translate-y-full']">
          <h2 class="text-lg font-semibold mb-3">Selecciona un continente</h2>
          <div class="grid grid-cols-2 gap-4">

            <!-- Tarjeta de África -->
            <button v-for="continent of continentsDialog" :key="continent.code" @click="selectContinent(continent.code)" class="bg-gray-200 p-2 rounded shadow">
              <div class="text-center font-bold">{{continent.name}}</div>
            </button>
            
          </div>
        </div>
      </div>
    </div>
    <!-- sidebar -->
    <aside id="sidebar"
      :class="['bg-white w-64 p-4 absolute top-0 left-0 h-full transition-all duration-300 z-10', isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">
        <img src="./assets/logo.png" alt="logo">
      <ul>
        <li class="mb-2 bg-slate-600 rounded">
          <a href="#" class="text-white hover:text-green-300">Lista 1</a>
        </li>
        <li class="mb-2  bg-slate-600 rounded">
          <a href="#" class="text-white hover:text-green-300">Lista 2</a>
        </li>
        <li class="mb-2  bg-slate-600 rounded">
          <a href="#" class="text-white hover:text-green-300">Lista 3</a>
        </li>
      </ul>
    </aside>
    <!-- fondo cuando esta en movil -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black opacity-50 z-0"></div>
    <!-- contenido -->
    <div class="flex-1 p-4 overflow-auto">
      <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden mb-4">
        <!-- Ícono para mostrar el sidebar en pantallas pequeñas -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
          <path fill-rule="evenodd"
            d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 6h14a1 1 0 010 2H3a1 1 0 110-2zm0 6h14a1 1 0 010 2H3a1 1 0 110-2z"
            clip-rule="evenodd" />
        </svg>
      </button>
      <div class="flex items-center mb-10">
        <!-- Input -->
        <div class="flex-1 mr-4">
          <label for="input" class="block text-gray-700 font-bold mb-2">Filtra por Pais</label>
          <input id="input" type="text"
            class=" w-full py-2 px-3  text-gray-700  shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Busque el Pais">
        </div>

        <!-- Combo-box -->
        <div>
          <label for="combo-box" class="block text-gray-700 font-bold mb-2">Filtra Continente</label>
          <select id="combo-box" @change="selectContinent($event)"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option v-for="continent of continentsDialog" :key="continent.code" >{{continent.name}}</option>            
          </select>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-8">
        <HelloWorld v-for="(item) of continents" :key="item.code" :country="item.name" :continent="item.continent.name"
          :code="item.code.toLowerCase()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CountryCard } from './models/country'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { Continent } from './models/continent'
import HelloWorld from './components/HelloWorld.vue'
import gql from 'graphql-tag'
@Component({
  components: {
    HelloWorld
  }
})

export default class App extends Vue {
  isSidebarOpen = false
  isDialogOpen = true
  msg = 'Welcome to Your Vue.js + TypeScript App'
  continents: CountryCard[] = []
  continentsDialog: Continent[] = []
  continentSelected = ''


  client = new ApolloClient({
    uri: 'https://countries.trevorblades.com/',
    cache: new InMemoryCache(),
  })
  async mounted() {
    this.client.query({
      query: gql`
        query {
          continents{
            code
            name
          }
        }
    `
    }).then((dialog) => {
      console.log(dialog)
      this.continentsDialog = dialog.data.continents
    })
  }

  listCountries(continent:string){
    this.client.query({
      query: gql`
      query ($code: ID!) {
        continent(code: $code) {
          code
          name
          countries {
            code
            name
            continent {
              code
              name
            }
          }
        }
      }

    `,
      variables: {
        code: continent
      }
    }).then((response) => {
      this.continents = response.data.continent.countries
    })
  }

  llamarBrasil() {
    console.log('hola')
  }
  selectContinent(continent) {
    if (typeof continent === 'object') {
      continent = this.continentsDialog.find((item): boolean => item.name === continent.target.value)?.code
    }
    continent = continent == null ? '' : continent
    this.listCountries(continent)
    this.isDialogOpen = false

  }


}
</script>
<style>
/* Estilo para el sidebar en pantallas medianas y grandes */
@media (min-width: 768px) {
  #sidebar {
    position: static !important;
    transform: none !important;
  }
}
</style>

