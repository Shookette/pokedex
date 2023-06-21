<script setup lang="ts">
import PokemonTypeList from './PokemonTypeList.vue'
import { PokemonType } from '../types/Pokemon.ts'
import PokemonStatRadarChart from './PokemonStatRadarChart.vue'
import { ref } from 'vue'

defineProps<{
  pokemonCurrentStat: number[],
  pokemonCurrentType: { type: PokemonType[], default: [] }
}>()

const isClosed = ref(true)

const openPokedex = () => {
  isClosed.value = false
}

</script>

<template>
  <section
    class="pokedex-right-panel"
    :class="{'pokedex-right-panel--opened': !isClosed}"
  >
    <div
      v-if="isClosed"
      class="pokedex-right-panel__button"
    >
      <div class="pokedex-right-panel__button__top" />
      <button
        class="pokedex-right-panel__button__center"
        @click="openPokedex"
      />
      <div class="pokedex-right-panel__button__bottom" />
    </div>

    <PokemonStatRadarChart
      v-if="!isClosed"
      :pokemon-current-stat="pokemonCurrentStat"
      :class="{'pokedex-right-panel__content--opened': !isClosed, 'pokedex-right-panel__content--closed': isClosed}"
    />
    <PokemonTypeList
      v-if="!isClosed"
      :current-pokemon-type="pokemonCurrentType"
      :class="{'pokedex-right-panel__content--opened': !isClosed, 'pokedex-right-panel__content--closed': isClosed}"
    />
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
  align-items: center;
  justify-content: center;
  z-index: 10;
  transform: rotateY(180deg);
  transform-origin: left center;

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

    &__button {
      transform: rotateY(180deg);
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      &__top {
        width: 100px;
        height: 50px;
        background-color: red;
        border-radius: 50px 50px 0 0;
        border-bottom: 1px solid black;
      }

      &__center {
        background-color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: absolute;
        border: 2px solid black
      }

      &__bottom {
        width: 100px;
        height: 50px;
        background-color: white;
        border-radius: 0 0 50px 50px;
        border-top: 1px solid black;
      }
    }

    &__content {
      &--closed {
        opacity: 0;
        display: none;
      }

      &--opened {
        animation: pokedexShowContent 3s forwards;
      }
    }

    &--opened {
      animation: pokedexOpen 3s forwards;
    }
  }
}

@keyframes pokedexShowContent {
  0%, 50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes pokedexOpen {
  0% {
    transform: rotateY(180deg);
  }
  30% { z-index: 999 }
  100% {

    transform: rotateY(0);
    z-index: 1;
  }
}
</style>
