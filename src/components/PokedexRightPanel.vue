<script setup lang="ts">
import PokemonTypeList from './PokemonTypeList.vue'
import { PokemonType } from '../types/Pokemon.ts'
import PokemonStatRadarChart from './PokemonStatRadarChart.vue'

defineProps<{
  pokemonCurrentStat: number[],
  pokemonCurrentType: { type: PokemonType[], default: [] }
}>()

</script>

<template>
  <section class="pokedex-right-panel">
    <PokemonStatRadarChart :pokemon-current-stat="pokemonCurrentStat" />
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
}

</style>
