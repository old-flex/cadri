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
      <td rowspan="2" style="max-width: 35px; white-space: pre-line" class="text-center">{{employee.firstname}} {{employee.lastname}} <p>{{employee.position}}</p></td>
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
  name: "ReportTableComponent",
  props: {
    employee: {
      default: null,
      type: Object,
    },
    reportId: {
      type: Number,
      default: null
    }
  },
  watch: {
    reportId: async function (newVal) {
      const actionPayload = {
        days_model: this.model,
        user_id: this.employee.id,
        report_card_id: this.reportId
      }
      const response = await fetch('http://192.168.1.188:8080/api/createNewReportString', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionPayload)
      });
      await this.$router.push('/')

    }
  },
  computed: {
    options() {
      return this.$store.getters['data/marks']
    }
  },
  data() {
    return {
      model: ["Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я"],
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
@media (max-width:1300px) {
  table{
    width: 90%;
  }
}
</style>
