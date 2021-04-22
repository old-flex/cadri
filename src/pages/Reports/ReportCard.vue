<template>
  <q-layout view="hHh lpR fFf">
    <MainHeader/>

    <q-page-container>
      <q-page class="q-pa-md">

        <div class="flex flex-center">
          <div style="width: 80%;" class="flex items-center row">
            Выберите подразделение
            <q-select style="max-width: 210px; margin-left: 10px"  filled v-model="currentSubdivision" :options="allSubdivisions"/>
          </div>
          <q-card style="width: 80%;">
            <q-table
              :columns="columns"
              :data="data"
              row-key="name"
              :title="tableName"
            >

            </q-table>
          </q-card>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainHeader from "components/MainHeader";
export default {
name: "ReportCard",
  components: {MainHeader},
  data() {
    return {
      currentSubdivision: 'Бухгалтерия',
      allSubdivisions: ['Бухгалтерия', 'Учебный отдел', 'Отдел кадров'],
    }
  }
}
</script>

<style scoped>

</style>
