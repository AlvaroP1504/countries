<!--imagenes aleatorias https://picsum.photos/400/300-->
<template>
   <div class="max-w-sm rounded overflow-hidden shadow-lg bg-neutral-100 md:w-1/3 lg:w-1/5  mb-4 ">
    <!-- input que me permite ingresar el nombre del pais para filtrarlo -->
    <img class="w-full object-cover mb-4" :src="'https://flagcdn.com/'+code+'.svg'" alt="Cityscape">
    <div class="px-6 py-4  ">
      <div class="font-bold text-xl mb-2">{{ country }}</div>
      <p class="text-gray-700 text-base">{{ continent }}</p>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop() country!: string;
  @Prop() continent!: string;
  @Prop() code!: string;

}
</script>
