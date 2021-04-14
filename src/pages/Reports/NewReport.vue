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

            <q-btn :disabled="!month && !subdivision" @click="getTables">
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
              <q-btn class="bg-secondary text-white" label="Сохранить"/>
            </div>
          </div>
          <div class="q-mt-md q-ml-md">
            Отдел: {{subdivision}}
          </div>
          <q-markup-table class="q-mt-md"  separator="cell" flat bordered dense>
            <tbody v-for="employee in employees" :key="employee.id">
            <tr>
              <td rowspan="2" class="text-center">Фамилия, <div>инициалы,</div> <div>должность</div></td>
              <td  rowspan="2" class="text-center">Табельный <div>номер</div></td>
              <td  colspan="31" class="text-center">Отметки о явках и неявках</td>
            </tr>
            <tr>
              <td class="text-center" v-for="index in 31" :key="index">
                {{ index }}
              </td>
            </tr>
            <tr>
              <td rowspan="2"  class="text-center">{{employee.firstname}} {{employee.lastname}}, <p>инженер</p></td>
              <td rowspan="2"  class="text-center">{{employee.passport_series}}</td>
              <td  v-for="index in 31" :key="index">
                <q-select borderless dense v-model="model[index]" :options="options"/>
              </td>
            </tr>
            <tr>
              <td class="text-center" v-for="index in 31" :key="index">
                8
              </td>
            </tr>
            </tbody>
          </q-markup-table>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainHeader from "components/MainHeader";
export default {
  name: "NewReport",
  components: {MainHeader},
  data () {
    return {
      model: ["Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я"],
      options: [
        'Я', 'Н', 'Б', 'ОО', 'ГГ'
      ],
      isMonthAndSubdivisionSelected: false,
      currentMonth: null,
      subdivision: null,
      subdivisions: ['Бухгалтерия', 'Учебный отдел', 'Отдел кадров'],
      month: ["Январь", "Февраль", "Март", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      test: null,
      isLoading: false,
      employees: [],
    }
  },
  mounted() {
    // this.getUsersBySubdivision()
  },
  methods: {
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
          return e.subdivision_id === this.subdivision;
        })
        console.log(this.employees)
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false;
    }
  }
}
</script>

<style>
.q-field__append.q-field__marginal.row.no-wrap.items-center.q-anchor--skip{
  /*width: 0;*/
  /*height: 0;*/
  display: none;
}
.q-table tbody td {
  font-size: 0.7rem;
}
.q-field__native.row.items-center {
  font-size: 0.7rem;
}
.no-wrap {
  flex-wrap: wrap;
}
.q-table--dense .q-table th, .q-table--dense .q-table td{
  padding: 0;
}
.q-table--dense .q-table th:last-child, .q-table--dense .q-table td:last-child{
  padding: 0;
}
.q-table--dense .q-table th:first-child, .q-table--dense .q-table td:first-child{
  padding: 0;
}
.q-field__native.row.items-center{
  display: flex;
  justify-content: center;
}
th {
  font-weight: 700;
}
.q-markup-table{
  overflow: hidden;
}
@media (max-width:1300px) {
  table{
    width: 90%;
  }
}
</style>
