<script setup lang="ts">
import { onMounted } from 'vue'
import PokedexLeftPanel from './PokedexLeftPanel.vue'
import PokedexRightPanel from './PokedexRightPanel.vue'
import { usePokemonStore } from '../stores/PokemonStore.ts'

const store = usePokemonStore()

onMounted(async () => {
  await store.getPokemonById(store.currentPokemonId)
})
</script>

<template>
  <main class="pokedex">
    <div class="pokedex__layout">
      <PokedexLeftPanel
        :pokemon-list="store.pokemonCarrousel"
        :current-pokemon="store.pokemon"
        :handle-on-click-current-pokemon-id="store.getPokemonById"
        :handle-on-click-get-random-pokemon="store.getRandomPokemon"
        :handle-on-click-search-pokemon="store.getPokemonBySearchString"
        :update-current-pokemon-id="store.updateCurrentPokemonId"
      />
      <div class="pokedex__layout__center" />
      <PokedexRightPanel :pokemon-current-type="store.pokemonType" :pokemon-current-stat="store.pokemonStat" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../style.scss' as *;

.pokedex {
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: inherit;
  align-items: center;
  justify-content: center;

  &__layout {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: inherit;

    @include medium {
      flex-direction: row;
    }

    @include medium {
      &__center {
        height: 600px;
        width: 20px;
        margin-bottom: 50px;
        background-color: var(--color-background-red-dark);
        box-shadow: inset 0 1px 5px 2px black;
        z-index: 10;
      }
    }
  }
}
</style>
