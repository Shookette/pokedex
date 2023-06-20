<script setup lang="ts">
import { Pokemon } from '../types/Pokemon.ts'
import PokemonCard from './PokemonCard.vue'
import PokemonListCarrousel from './PokemonListCarrousel.vue'
import PokemonCrossActionButton from './PokemonCrossActionButton.vue'
import { updateMode } from '../types/PokedexMainType.ts'

defineProps<{
  currentPokemon?: Pokemon,
  pokemonList: Pokemon[],
  handleOnClickCurrentPokemonId:(id:number) => void,
  updateCurrentPokemonId:(mode: updateMode, value: number) => void,
}>()

</script>

<template>
  <section class="pokedex-left-panel">
    <div class="pokedex-left-panel__design">
      <div class="left-part">
        <div class="pokedex-left-panel__design__circle" />
      </div>
      <div class="right-part" />
    </div>
    <PokemonCard
      :pokemon="currentPokemon"
    />
    <PokemonListCarrousel
      :handle-on-click-current-pokemon-id="handleOnClickCurrentPokemonId"
      :pokemon-list="pokemonList"
      :current-pokemon="currentPokemon"
    />
    <PokemonCrossActionButton
      class="pokedex-left-panel__action"
      :update-current-pokemon-id="updateCurrentPokemonId"
    />
  </section>
</template>

<style lang="scss" scoped>
@use "../style.scss" as *;

.pokedex-left-panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 600px;
  background-color: var(--color-background-red-dark);
  position: relative;

  @include medium {
    width: 350px;
    margin: 50px 0 50px 50px;
    border-radius: 10px 0 0 10px;
  }

  &__action {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &__design {
    height: 100px;
    position: relative;
    background-color: var(--color-background-red-light);
    border-radius: 10px 0 0 10px;

    &__circle {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: var(--color-background-light-blue);
      border: 3px solid white;
      animation: blink 2s linear infinite;
    }
  }
}

.left-part {
  margin: 20px;
}

.right-part {
  width: 175px;
  height: 70px;
  background-color: var(--color-background-red-dark);
  position: absolute;
  right: 0;
  top: 30px;
}

.right-part::after {
  position: absolute;
  left: 0;
  content: "";
  border-right: 100px solid transparent;
  border-top: 70px solid var(--color-background-red-light);
}

@keyframes blink {
  0% {
    background-color: var(--color-background-light-blue);
  }

  100% {
    background-color: var(--color-background-dark-blue);
  }
}
</style>
