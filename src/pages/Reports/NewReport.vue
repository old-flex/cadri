<template>
  <q-layout view="hHh lpR fFf">
    <MainHeader/>
    <q-page-container>
      <q-page>
        <div v-if="!isMonthAndSubdivisionSelected" class="absolute-center">
          <q-card class="q-pa-lg flex flex-center column text-center">
            <div>
              Выберите месяц на который составляется
              <br>Табель учета рабочего времени
              <q-select style="width: 100%;" :options="month" v-model="currentMonth"/>
            </div>
            <div class="q-mt-lg">
              Выберите подразделение
              <q-select style="width: 100%;" :options="subdivisions" v-model="subdivision"/>
            </div>

            <q-btn :disabled="!currentMonth || !subdivision" @click="getTables">
              Сохранить
            </q-btn>
          </q-card>
        </div>
        <div v-else>
          <div class="flex row items-center justify-between q-ml-md">
            <div class="flex row items-center">
              Месяц отчетного периода:
              <q-select style="margin-left: 20px; width: 90px" :options="month" v-model="currentMonth"/>
            </div>
            <div class="q-mr-md">
              <q-btn @click="saveReport" class="bg-secondary text-white" label="Сохранить"/>
            </div>
          </div>
          <div class="q-mt-md q-ml-md">
            Отдел: {{subdivision.name}}
          </div>
          <ReportTableComponent v-for="employee in employees" :key="employee.id" :employee="employee" :report-id="reportId"/>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainHeader from "components/MainHeader";
import ReportTableComponent from "pages/Reports/ReportTableComponent";
export default {
  name: "NewReport",
  components: {ReportTableComponent, MainHeader},
  data () {
    return {
      isMonthAndSubdivisionSelected: false,
      currentMonth: null,
      subdivision: null,
      month: ["Январь", "Февраль", "Март", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      isLoading: false,
      employees: [],
      reportId: null,
    }
  },

  computed: {
    subdivisions() {
      return this.$store.getters['data/subdivisions']
    }
  },
  methods: {
    async saveReport() {
      let month_end = this.month.indexOf(this.currentMonth) + 1
      if(month_end === 12){
        month_end = 0
      }
      const actionPayload = {
        number: 123,
        date_start: this.currentMonth,
        date_end: this.month[month_end],
        subdivision_id: this.subdivision.id
      }
      const response = await fetch('http://localhost:8080/api/createNewReport', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionPayload)
      });
      this.reportId = await response.json();
      await this.$router.push('/')
    },
    async getSubdivisions(){
      console.log()
      const response = await fetch('http://localhost:8080/api/getSubdivisions');
      this.subdivisions = await response.json();
      this.subdivisions = this.subdivisions.map((s) => {
        return{
          ...s,
          label: s.name
        }
      });
    },
    getTables() {
      this.isMonthAndSubdivisionSelected = true;
      this.getUsersBySubdivision()
    },
    async getUsersBySubdivision() {
      this.isLoading = true;
      try {
        const response = await fetch('http://localhost:8080/api/users');
        this.employees = await response.json();
        this.employees = this.employees.filter((e) => {
          return e.subdivision_id === this.subdivision.id;
        })
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false;
    }
  }
}
</script>

<style>

</style>
