<script setup lang="ts">
import { PokemonType } from '../types/Pokemon.ts'
import { computed } from 'vue'

const props = defineProps<{
  pokemonType: PokemonType,
  active: {
    type: boolean,
    required: false,
    default: false
  }
}>()

const pokemonTypeItemClassnames = computed(() => {
  const classnames = []
  classnames.push(`pokemon-type-item--${props.pokemonType}`)
  if (props.active) {
    classnames.push('pokemon-type-item--active')
  }
  return classnames
})
</script>

<template>
  <article
    class="pokemon-type-item"
    :class="pokemonTypeItemClassnames"
  >
    <img
      v-if="pokemonType !== 'unknown' && pokemonType !== 'shadow' "
      class="pokemon-type-item__image"
      :src="`${pokemonType}.svg`"
      :alt="`pokemon type ${pokemonType}`"
    >
    <h2 class="pokemon-type-item__title">
      {{ pokemonType }}
    </h2>
  </article>
</template>

<style scoped lang="scss">
.pokemon-type-item {
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 20px;
  opacity: 0.5;
  --pokemon-type-background-color: #ffffff;
  background-color: var(--pokemon-type-background-color);

  &--normal {
    --pokemon-type-background-color: #A1A2A1;
  }

  &--fighting {
    --pokemon-type-background-color: #EF8833;
  }

  &--flying {
    --pokemon-type-background-color: #8EB9EB;
  }

  &--poison {
    --pokemon-type-background-color: #8844C5;
  }

  &--ground {
    --pokemon-type-background-color: #895328;
  }

  &--rock {
    --pokemon-type-background-color: #AFAB86;
  }

  &--bug {
    --pokemon-type-background-color: #95A236;
  }

  &--ghost {
    --pokemon-type-background-color: #6A416E;
  }

  &--steel {
    --pokemon-type-background-color: #6FA1B7;
  }

  &--fire {
    --pokemon-type-background-color: #D43A31;
  }

  &--water {
    --pokemon-type-background-color: #427FE8;
  }

  &--grass {
    --pokemon-type-background-color: #5AA03B;
  }

  &--electric {
    --pokemon-type-background-color: #F1C442;
  }

  &--psychic {
    --pokemon-type-background-color: #DD4E7A;
  }

  &--ice {
    --pokemon-type-background-color: #70D6FB;
  }

  &--dragon {
    --pokemon-type-background-color: #525FDA;
  }

  &--dark {
    --pokemon-type-background-color: #4C3F3D;
  }

  &--fairy {
    --pokemon-type-background-color: #E078E9;
  }

  &--unknown {
    --pokemon-type-background-color: #73998E;
  }

  &--shadow {
    --pokemon-type-background-color: #45454A;
  }

  &--active {
    opacity: 1;
  }

  &__image {
    width: 16px;
    height: 16px;
  }

  &__title {
    font-size: 16px;
    font-weight: bold;
    color: var(--color-background-white);
    margin: 0;
  }
}
</style>
