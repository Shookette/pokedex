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
      <div class="pokedex-left-panel__design__left">
        <div class="pokedex-left-panel__design__circle" />
        <div class="pokedex-left-panel__design__small__circle pokedex-left-panel__design__small__circle--red" />
        <div class="pokedex-left-panel__design__small__circle pokedex-left-panel__design__small__circle--yellow" />
        <div class="pokedex-left-panel__design__small__circle pokedex-left-panel__design__small__circle--green" />
      </div>
      <div class="pokedex-left-panel__design__right" />
    </div>
    <PokemonCard
      :pokemon="currentPokemon"
    />
    <PokemonListCarrousel
      :handle-on-click-current-pokemon-id="handleOnClickCurrentPokemonId"
      :pokemon-list="pokemonList"
      :current-pokemon="currentPokemon"
    />
    <div class="pokedex-left-panel__bottom">
      <div class="pokedex-left-panel__bottom__design" />
      <PokemonCrossActionButton
        class="pokedex-left-panel__action"
        :update-current-pokemon-id="updateCurrentPokemonId"
      />
    </div>
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
  gap: 10px;

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
    border-radius: 10px 0 0 0;

    &__circle {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: var(--color-background-light-blue);
      border: 3px solid white;
      animation: blink 2s linear infinite;
      box-shadow: -1px 2px 5px black;
    }

    &__small__circle {
      height: 15px;
      width: 15px;
      border-radius: 50%;
      --color-background-small-circle: blue;
      background-color: var(--color-background-small-circle);
      box-shadow: -1px 2px 5px black;

    }

    &__small__circle--red {
      --color-background-small-circle: red;
    }

    &__small__circle--yellow {
      --color-background-small-circle: yellow;
    }

    &__small__circle--green {
      --color-background-small-circle: green;
    }

    &__left {
      margin: 0 20px;
      display: flex;

      .pokedex-left-panel__design__small__circle {
        margin-left: 30px;
      }

      .pokedex-left-panel__design__small__circle ~ .pokedex-left-panel__design__small__circle {
        margin-left: 7px;
      }
    }

    &__right {
      width: 175px;
      height: 80px;
      background-color: var(--color-background-red-dark);
      position: absolute;
      right: 0;
      top: 20px;

      &::after {
        position: absolute;
        left: 0;
        content: "";
        border-right: 100px solid transparent;
        border-top: 80px solid var(--color-background-red-light);
      }
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-around;

    &__design {
      position: relative;
      width: 150px;
      height: 50px;
      background-color: var(--color-background-brown-dark);
      border-radius: 5px;

      &::before {
          position: absolute;
          top: 0;
          left: -75%;
          z-index: 2;
          display: block;
          content: '';
          width: 10%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
          transform: skewX(-25deg);
          animation: shine 2.5s linear infinite;
      }
    }
  }
}

@keyframes shine {
  0% {
    left: 0;
  }

  100% {
    left: 80%;
  }
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
