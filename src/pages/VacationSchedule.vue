<template>
<q-layout view="hHh lpR fFf">
<q-header elevated class="bg-primary text-white">
  <q-toolbar>
    <q-btn flat round dense icon="arrow_back"  @click="$router.go(-1)"/>

    <q-toolbar-title>
      Помощь кадрам

      <q-btn style="margin-left: 40px" color="secondary" label="Табель" icon-right="expand_more">
        <q-menu fit>
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section @click="$router.push('reportCard')">
                Табели на текущий год
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                Архив табелей
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn style="margin-left: 40px" color="secondary" label="График отпусков" icon-right="expand_more">
        <q-menu fit>
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                Графики
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                Печать
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

    </q-toolbar-title>
    <q-btn flat round dense icon="logout" />
  </q-toolbar>
</q-header>



<q-page-container>
  <q-page class="q-pa-md">

    <div class="flex flex-center">
      <div style="width: 80%;" class="flex flex-center row justify-between">
        <q-btn @click="$router.push('/vacationCreate')" v-if="tableName !== 'Архив графиков отпусков'" label="Создать новый" class="bg-amber-2" style="height: 55px;"/>
        <q-select v-if="tableName === 'Архив графиков отпусков'" style="max-width: 210px;"  filled v-model="currentSubdivision" :options="allSubdivisions"/>
      </div>
      <q-card style="width: 80%;">
        <q-table
          :columns="columns"
          :data="data"
          row-key="name"
          :title="tableName"
        >
          <template #top-right>
            <q-input  dense debounce="300" v-model="filter" placeholder="Поиск">
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

        </q-table>
      </q-card>
    </div>

  </q-page>
</q-page-container>
</q-layout>
</template>

<script>
export default {
name: "VacationSchedule",
  data() {
    return {
      filter: '',
      currentSubdivision: "2012",
      allSubdivisions: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
      left: false,
      tableName: 'Графики отпусков на текущий год',
      data: [
        {number: 1, date: '2012', otdel: 'Бухгалтерия', edit: 'Редактировать'},
        {number: 2, date: '2013', otdel: 'Учебный отдел', edit: 'Редактировать'},
        {number: 3, date: '2014', otdel: 'Отдел кадров', edit: 'Редактировать'},
        {number: 4, date: '2015', otdel: 'Бухгалтерия', edit: 'Редактировать'},
        {number: 5, date: '2016', otdel: 'Отдел кадров', edit: 'Редактировать'},
        {number: 6, date: '2017', otdel: 'Бухгалтерия', edit: 'Редактировать'},
        {number: 7, date: '2018', otdel: 'Учебный отдел', edit: 'Редактировать'},
        {number: 8, date: '2019', otdel: 'Учебный отдел', edit: 'Редактировать'},
      ],
      columns: [
        {name: 'number', required: true, label: '№', align: 'left', field: 'number', sortable: true,},
        {name: 'date', required: true, label: 'Дата', align: 'left', field: 'date', sortable: true},
        {name: 'otdel', required: true, label: 'Подразделение', align: 'left', field: 'otdel', sortable: true},
        {name: 'edit', required: true, align: 'left', field: 'edit'},
      ],
    }
  }
}
</script>

<style scoped>

</style>
