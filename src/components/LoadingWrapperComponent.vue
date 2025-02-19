<script setup lang="ts">

defineProps<{ loading: boolean }>()
</script>

<template>
  <div class="relative">
    <div :class="{ 'opacity-50 pointer-events-none': loading }">
      <slot />
    </div>
    <div v-if="loading" class="loader-overlay">
      <PrimeProgressSpinner style="width: 50px; height: 50px" />
    </div>
  </div>
</template>

<style scoped>
.relative {
  position: relative;
}

.loader-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1px);
  border-radius: inherit;
}
</style>
