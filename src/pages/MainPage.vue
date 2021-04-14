<template>
<q-layout view="lHr lpR lFr">
  <MainHeader/>
  <q-page-container>
    <q-page class="q-pa-md">
      <div class="flex flex-center">
        <div style="width: 80%;" class="flex flex-center row justify-between">
          <div class="flex items-center">
            Выберите подразделение
            <q-select style="width: 210px; margin-left: 10px;"  filled v-model="currentSubdivision" :options="allSubdivisions"/>
          </div>
          <q-btn @click="$router.push('/createReport')" label="Создать новый" class="bg-secondary text-white" style="height: 55px"/>
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
import EditReport from "pages/Reports/EditReport";
import MainHeader from "components/MainHeader";
export default {
  name: "MainPage",
  components: {MainHeader},
  data() {
    return {
      filter: '',
      currentSubdivision: 'Бухгалтерия',
      allSubdivisions: ['Бухгалтерия', 'Учебный отдел', 'Отдел кадров'],
      left: false,
      tableName: 'Табели учета рабочего времени за текущий месяц',
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
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
       this.isLoading = true;
       try {
         const response = await fetch('http://localhost:8080/api/users');
         this.employees = await response.json();
         console.log(this.employees);
       } catch (err) {
         console.log(err)
       }
       this.isLoading = false;
    },
  },
  computed: {
    filterEmployees() {
      console.log(123)
      return this.employees.filter((e) => {
        return e.subdivision === this.currentSubdivision;
      })
    }
  }
}
</script>

<style>
th {
  font-weight: 700;
}
</style>
