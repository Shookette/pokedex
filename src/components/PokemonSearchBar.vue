<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  handleOnClickSearchPokemon: (searchString: string) => void
}>()

const searchString = ref('')
</script>

<template>
  <div class="pokemon-search-bar">
    <input v-model="searchString" class="pokemon-search-bar__input" />
    <button class="pokemon-search-bar__button" @click="() => handleOnClickSearchPokemon(searchString)" />
  </div>
</template>

<style scoped lang="scss">
.pokemon-search-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;

  &__input {
    width: 200px;
    margin-right: 20px;
  }

  &__button {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }
}
</style>
