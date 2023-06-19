<script setup lang="ts">
import { updateMode } from '../types/PokedexMainType.ts'
import PokemonTypeList from './PokemonTypeList.vue'
import { PokemonType } from '../types/Pokemon.ts'
import PokemonCrossActionButton from './PokemonCrossActionButton.vue'

defineProps<{
  updateCurrentPokemonId:(mode: updateMode, value: number) => void,
  pokemonCurrentType: { type: PokemonType[], default: [] }
}>()

</script>

<template>
  <section class="pokedex-right-panel">
    <PokemonTypeList :current-pokemon-type="pokemonCurrentType" />
    <PokemonCrossActionButton :update-current-pokemon-id="updateCurrentPokemonId" />
  </section>
</template>

<style lang="scss" scoped>
.pokedex-right-panel {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 500px;
  background-color: var(--color-background-red-light);
  margin: 100px 50px 50px 0;
  border-radius: 10px;
  border: 10px solid var(--color-background-red-dark);
  justify-content: space-around;
  align-items: flex-end;
}

</style>
