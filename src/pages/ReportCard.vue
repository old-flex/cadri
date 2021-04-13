<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-grey-7 text-white">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back"  @click="$router.go(-1)"/>

        <q-toolbar-title>
          Помощь кадрам

          <q-btn style="margin-left: 40px" color="secondary" label="Табель" icon-right="expand_more">
            <q-menu fit>
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section @click="$router.push('/')">
                    Табели на текущий месяц
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="$router.push('/reportCard')">
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
                  <q-item-section @click="$router.push({name: 'vacations'})">
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
export default {
name: "ReportCard",
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
