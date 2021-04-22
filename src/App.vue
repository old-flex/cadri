<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('data/loadSubdivisions')
    this.$store.dispatch('data/loadMarks')
  }
}
</script>
