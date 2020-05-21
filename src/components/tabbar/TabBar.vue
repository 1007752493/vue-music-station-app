<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #d33a31;
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
</style>
