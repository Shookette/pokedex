<script setup lang="ts">
import PokemonTypeList from './PokemonTypeList.vue'
import { PokemonType } from '../types/Pokemon.ts'
import { computed } from 'vue'

const props = defineProps<{
  pokemonCurrentStat: number[],
  pokemonCurrentType: { type: PokemonType[], default: [] }
}>()

const chartSeries = computed(() => [{
  name: 'Stat',
  data: props.pokemonCurrentStat ?? []
}])

const chartOptions = {
  chart: {
    type: 'radar',
    toolbar: {
      show: false
    }
  },
  markers: {
    size: 4,
    colors: ['#fff'],
    strokeColor: '#FF4560',
    strokeWidth: 2
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    categories: [
      'HP',
      'ATK',
      'DEF',
      'S-ATK',
      'S-DEF',
      'SPD'
    ],
    labels: {
      style: {
        colors: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000']
      }
    }
  },
  yaxis: {
    max: 255,
    tickAmount: 7,
    labels: {
      formatter: (val: string, i: number) => (i % 2 === 0) ? val : ''
    },
    forceNiceScale: true
  },
  dataLabels: {
    enabled: true
  },
  plotOptions: {
    radar: {
      size: 110,
      polygons: {
        strokeColors: '#e9e9e9',
        fill: {
          colors: ['#f8f8f8', '#fff']
        }
      }
    }
  },
  colors: ['#FF4560']
}

</script>

<template>
  <section class="pokedex-right-panel">
    <div class="pokedex-right-panel__chart">
      <apexchart
        type="radar"
        height="350"
        :options="chartOptions"
        :series="chartSeries"
      />
    </div>

    <PokemonTypeList :current-pokemon-type="pokemonCurrentType" />
  </section>
</template>

<style lang="scss" scoped>
@use "../style.scss" as *;

.pokedex-right-panel {

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  background-color: var(--color-background-red-light);
  align-items: flex-end;

  @include medium {
    width: 350px;
    margin: 100px 50px 50px 0;
    border-radius: 0 10px 10px 0;
    border: 10px solid var(--color-background-red-dark);

    &::before {
      content: "";
      position: absolute;
      top: -70px;
      left: -10px;
      width: 75px;
      border-right: 100px solid transparent;
      border-bottom: 70px solid var(--color-background-red-dark);
    }
  }

  &__chart {
    width: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
}

</style>
