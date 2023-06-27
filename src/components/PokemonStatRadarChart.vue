<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  pokemonCurrentStat: number[]
}>()

const chartSeries = computed(() => [
  {
    name: 'Stat',
    data: props.pokemonCurrentStat ?? [],
  },
])

const chartOptions = {
  chart: {
    type: 'radar',
    toolbar: {
      show: false,
    },
  },
  markers: {
    size: 4,
    colors: ['#fff'],
    strokeColor: '#FF4560',
    strokeWidth: 2,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    categories: ['HP', 'ATK', 'DEF', 'S-ATK', 'S-DEF', 'SPD'],
    labels: {
      style: {
        colors: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
      },
    },
  },
  yaxis: {
    max: 255,
    tickAmount: 7,
    labels: {
      formatter: (val: string, i: number) => (i % 2 === 0 ? val : ''),
    },
    forceNiceScale: true,
  },
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    radar: {
      size: 110,
      polygons: {
        strokeColors: '#e9e9e9',
        fill: {
          colors: ['#f8f8f8', '#fff'],
        },
      },
    },
  },
  colors: ['#FF4560'],
}
</script>

<template>
  <div class="pokedex-stat-radar-chart">
    <apexchart type="radar" height="350" :options="chartOptions" :series="chartSeries" />
  </div>
</template>

<style lang="scss" scoped>
.pokedex-stat-radar-chart {
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
