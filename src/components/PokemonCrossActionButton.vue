<script setup lang="ts">
import { updateMode } from '../types/PokedexMainType.js'

defineProps<{
  updateCurrentPokemonId:(mode: updateMode, value: number) => void
}>()
</script>
<template>
  <div class="directional-buttons">
    <button
      class="direction-button up"
      @click="() => updateCurrentPokemonId('increase', 10)"
    />
    <button
      class="direction-button right"
      @click="() => updateCurrentPokemonId('increase', 1)"
    />
    <button
      class="direction-button down"
      @click="() => updateCurrentPokemonId('decrease', 10)"
    />
    <button
      class="direction-button left"
      @click="() => updateCurrentPokemonId('decrease', 1)"
    />
  </div>
</template>
<style lang="scss" scoped>
.directional-buttons {
  width: 75px;
  height: 75px;
  position: relative;
}

.direction-button {
  background-color: #504D4E;
  border: none;
  position: absolute;
  padding: 0;
  cursor: pointer;
}

.left, .right {
  width: 30px;
  height: 16px;
}

.up, .down {
  height: 30px;
  width: 16px;
}

.left {
  left: 8px;
  bottom: calc(50% - 8px);
}

.up {
  left: calc(50% - 8px);
  top: 8px
}

.right {
  right: 8px;
  bottom: calc(50% - 8px);
}

.down {
  left: calc(50% - 8px);
  bottom: 8px;
}
</style>
