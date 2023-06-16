<script setup lang="ts">
import { Pokemon } from '../types/Pokemon.ts'
defineProps<{ pokemon: Pokemon }>()
</script>

<template>
  <article class="pokemon-card">
    <div class="pokemon-card__content">
      <div class="pokemon-card__id">
        {{ pokemon?.id }}
      </div>
      <img
        class="pokemon-card__sprite"
        :src="pokemon?.sprites?.front_default || ''"
        alt="Sprites showing the front design of the current pokemon"
      >
      <h2 class="pokemon-card__title">
        {{ pokemon?.name }}
      </h2>
    </div>
    <div class="pokemon-card__design">
      <div class="pokemon-card__design__button" />
      <div class="pokemon-card__design__grid">
        <p class="pokemon-card__design__grid__line" />
        <p class="pokemon-card__design__grid__line" />
        <p class="pokemon-card__design__grid__line" />
        <p class="pokemon-card__design__grid__line" />
        <p class="pokemon-card__design__grid__line" />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  background-color: var(--color-background-white);
  border-radius: 20px 20px 20px 50px;
  height: 275px;

  &__content {
    background-color: var(--color-background-brown-dark);
    width: 225px;
    height: 175px;
    margin: 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  &__id {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: var(--color-background-white);
    color: var(--color-title);
    font-weight: bold;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__sprite {
    width: 150px;
    height: auto;
    margin: auto;
  }

  &__title {
    color: var(--color-background-white);
    margin: 0;
    padding: 0;
  }

  &__design {
    height: 75px;
    width: 100%;
    position: relative;

    &__button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: var(--color-background-red-light);
      position: absolute;
      left: 50px;
    }

    &__grid {
      position: absolute;
      right: 50px;

      &__line {
        width: 60px;
        height: 4px;
        background-color: var(--color-background-grey-light);
        margin: 3px;
      }
    }
  }
}
</style>
