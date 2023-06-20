<script setup lang="ts">
import { PokemonType } from '../types/Pokemon.ts'
import PokemonTypeItem from './PokemonTypeItem.vue'

const pokemonTypeList: PokemonType[] = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'unknown',
  'shadow'
]

defineProps<{
  currentPokemonType: PokemonType[]
}>()

const isTypeIsInCurrentPokemonType = (type: PokemonType, pokemonTypeList: PokemonType[] = []) => pokemonTypeList.includes(type)
</script>

<template>
  <div class="pokemon-type-list">
    <pokemon-type-item
      v-for="type in pokemonTypeList"
      :key="type"
      :pokemon-type="type"
      :active="isTypeIsInCurrentPokemonType(type, currentPokemonType)"
    />
  </div>
</template>

<style scoped lang="scss">
.pokemon-type-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  background-color: var(--color-background-brown-dark);
  padding: 5px;
  height: inherit;
}
</style>
