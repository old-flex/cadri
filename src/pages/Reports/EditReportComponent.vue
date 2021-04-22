<template>
  <q-markup-table class="q-mt-md q-ma-lg"  separator="cell" flat bordered dense>
    <tbody>
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
      <td rowspan="2" style="max-width: 35px; white-space: pre-line" class="text-center">{{employee.firstname}} {{employee.lastname}}<p>{{employee.position}}</p></td>
      <td rowspan="2" style="max-width: 35px;"  class="text-center">{{employee.passport_series}}</td>
      <td  v-for="index in 31" :key="index">
        <q-select borderless dense v-model="model[index - 1]" :options="options" emit-value map-options/>
      </td>
    </tr>
    <tr>
      <td class="text-center" v-for="index in 31" :key="index">
        <div v-if="model[index - 1] === 'Я'">
          {{8 * employee.rate}}
        </div>
      </td>
    </tr>
    </tbody>
  </q-markup-table>
</template>

<script>
export default {
  name: "EditReportComponent",
  props: {
    data: {
      default: null,
      type: Object,
    },
    trigger: {
      type: Number,
      default: null
    }
  },
  watch: {
    trigger: async function (newVal) {
      const actionPayload = {
        days_model: this.model,
        str_id: this.data.id
      }
      const response = await fetch('http://192.168.1.188:8080/api/editReportString', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionPayload)
      });
      await this.$router.push('/')

    }
  },
  created() {
    this.model = [this.data.day1, this.data.day2, this.data.day3, this.data.day4, this.data.day5, this.data.day6, this.data.day7, this.data.day8, this.data.day9, this.data.day10,
      this.data.day11, this.data.day12, this.data.day13, this.data.day14, this.data.day15, this.data.day16, this.data.day17, this.data.day18, this.data.day19, this.data.day20,
      this.data.day21, this.data.day22, this.data.day23, this.data.day24, this.data.day25, this.data.day26, this.data.day27, this.data.day28, this.data.day29, this.data.day30,
      this.data.day31]
    this.employee = {
      firstname: this.data.firstname,
      lastname: this.data.lastname,
      passport_series: this.data.passport_series,
      rate: this.data.rate,
      position: this.data.position
    }
  },
  methods: {},
  computed: {
    options() {
      return this.$store.getters['data/marks']
    }
  },
  data() {
    return {
      model: [],
      employee: [],
    }
  }
}
</script>

<style>
td{
  min-width: 20px;
}
.q-field__append.q-field__marginal.row.no-wrap.items-center.q-anchor--skip{
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
.q-table--dense .q-table thead tr, .q-table--dense .q-table tbody tr, .q-table--dense .q-table tbody td {
  height: 20px;
}
@media (max-width:1300px) {
  table{
    width: 90%;
  }
}
</style>
