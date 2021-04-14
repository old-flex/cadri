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
      filter: '',
      currentSubdivision: 'Бухгалтерия',
      allSubdivisions: ['Бухгалтерия', 'Учебный отдел', 'Отдел кадров'],
      left: false,
      tableName: 'Табели учета рабочего времени за текущий год',
      data: [
        {number: 1, date: '01.06', edit: 'Редактировать'},
        {number: 2, date: '02.06', edit: 'Редактировать'},
        {number: 3, date: '03.06', edit: 'Редактировать'},
        {number: 4, date: '04.06', edit: 'Редактировать'},
        {number: 5, date: '05.06', edit: 'Редактировать'},
        {number: 6, date: '06.06', edit: 'Редактировать'},
        {number: 7, date: '07.05', edit: 'Редактировать'},
        {number: 8, date: '08.05', edit: 'Редактировать'},
      ],
      columns: [
        {name: 'number', required: true, label: '№', align: 'left', field: 'number', sortable: true,},
        {name: 'date', required: true, label: 'Дата', align: 'left', field: 'date', sortable: true},
        {name: 'edit', required: true, align: 'left', field: 'edit'},
      ],
    }
  }
}
</script>

<style scoped>

</style>
