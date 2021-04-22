<template>
  <q-layout view="hHh lpR fFf">
    <MainHeader/>

    <q-page-container>
      <q-page>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainHeader from "components/MainHeader";
export default {
  name: "VacationCard",
  components: {MainHeader},
  data() {
    return {
      date: '2019/02/01',
    }
  }
}
</script>

<style >
.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: normal;
}
.q-field--with-bottom{
  padding-bottom: 0;
}
</style>
