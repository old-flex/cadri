<template>
<q-layout view="lHr lpR lFr">
  <MainHeader/>
  <q-page-container>
    <q-page class="q-pa-md">
      <div class="flex flex-center" v-if="role === 'report_operator'">
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
            title="Табели учета рабочего времени за текущий месяц"
            @row-click="onRowClick"
          >
          </q-table>
        </q-card>
      </div>


      <div class="flex flex-center" v-else>
        <div style="width: 80%;" class="flex flex-center row justify-between">
          <q-btn @click="$router.push('/createVacationCard')" label="Создать новый" class="bg-amber-2" style="height: 55px;"/>
<!--          <q-select v-if="tableName === 'Архив графиков отпусков'" style="max-width: 210px;"  filled v-model="currentSubdivision" :options="allSubdivisions"/>-->
        </div>
        <q-card style="width: 80%;">
          <q-table
            :columns="columns"
            :data="data"
            row-key="name"
            title="Графики отпусков на текущий год"
            @row-click="onRowClickVacations"
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
import EditReport from "pages/Reports/EditReport";
import MainHeader from "components/MainHeader";
export default {
  name: "MainPage",
  components: {MainHeader},
  data() {
    return {
      filter: '',
      currentSubdivision: null,
      left: false,
      data: [],
      columns: [
        {name: 'number', required: true, label: '№', align: 'left', field: 'number', sortable: true,},
        {name: 'date_start', required: true, label: 'Дата начала', align: 'left', field: 'date_start', sortable: true},
        {name: 'date_end', required: true, label: 'Дата окончания', align: 'left', field: 'date_end', sortable: true},
        {name: 'edit', required: true, align: 'left', field: 'edit'},
      ],
    }
  },
  watch: {
    currentSubdivision: function(newVal) {
      this.getReports();
    }
  },
  async created() {
    if(this.role === 'vacation_operator') {
      const response = await fetch('http://localhost:8080/api/getVacations');
      this.data = await response.json();
      this.data = this.data.map((d) => {
        return {
          ...d,
          edit: 'Редактировать'
        }
      })
    }
  },
  methods: {
    async onRowClickVacations(evt, row) {
      console.log(row.id)
      await this.$router.push({
        name: 'editVacation',
        params: {id: row.id}
      })
    },
    async onRowClick(evt, row) {
      await this.$router.push({
        name: 'editCard',
        params: {id: row.id}
      })
    },
    async getReports() {
       this.isLoading = true;
       this.data = []
       try {
         const response = await fetch('http://localhost:8080/api/getReports');
         this.data = await response.json();
         this.data = this.data.filter((d) => {
           return d.subdivision_id === this.currentSubdivision.id
         })
         this.data = this.data.map((d) => {
           return {
             ...d,
             edit: 'Редактировать'
           }
         })
       } catch (err) {
         console.log(err)
       }
       this.isLoading = false;
    },
  },
  computed: {
    filterEmployees() {
      return this.employees.filter((e) => {
        return e.subdivision === this.currentSubdivision;
      })
    },
    allSubdivisions(){
      return this.$store.getters['data/subdivisions']
    },
    role() {
      return localStorage.getItem("role");
    }
  }
}
</script>

<style>
th {
  font-weight: 700;
}
</style>
