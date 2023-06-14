<script setup lang="ts">
defineProps<{ updateCurrentPokemonId:(string, number) => void}>()

</script>

<template>
  <section class="pokedex-right-panel">
    <button @click="() => updateCurrentPokemonId('decrease', 1)">
      previous
    </button>
    <button @click="() => updateCurrentPokemonId('increase', 1)">
      next
    </button>
  </section>
</template>

<style lang="scss" scoped>
.pokedex-right-panel {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 80vh;
  background-color: var(--color-background-red-light);
  margin: 100px 50px 50px 0;
  border-radius: 10px;
  border: 10px solid var(--color-background-red-dark);

}
</style>
