<template>
  <q-layout view="hHh lpR fFf">
    <MainHeader/>
    <q-page-container>
      <q-page>
        <div class="flex row items-center justify-between q-ml-md">
          <div class="flex row items-center">
            Месяц отчетного периода
            <q-select style="width: 90px;" :options="month" v-model="test"/>
            <div class="q-ml-lg">
              Номер документа
            </div>
            <div class="q-ml-md text-center">
              <q-input v-model="reportNumber"/>
            </div>
          </div>
          <div class="q-mr-md">
            <q-btn class="bg-secondary text-white" label="Печать" @click="createXls"/>
            <q-btn class="bg-secondary text-white" label="Сохранить" @click="editReport"/>
          </div>
        </div>
        <div class="q-mt-md q-ml-md">
          Отдел: {{ report[0].name }}
        </div>
        <EditReportComponent v-for="string in strings" :data="string" :trigger="trigger" :key="string.id"/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainHeader from "components/MainHeader";
import ReportTableComponent from "pages/Reports/ReportTableComponent";
import EditReportComponent from "pages/Reports/EditReportComponent";

export default {
  name: "EditReport",
  components: {EditReportComponent, MainHeader},
  data() {
    return {
      model: ["Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я"],
      options: [
        'Я', 'Н', 'Б', 'ОО', 'ГГ'
      ],
      month: ["Январь", "Февраль", "Март", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      test: null,
      report: null,
      strings: null,
      reportNumber: null,
      trigger: 0
    }
  },
  methods: {
    async createXls() {
      console.log(this.strings)
      await fetch('http://127.0.0.1:5000/createXmlOrder',{
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
          employees: this.strings
        })
      } )
    },
    async editReport() {
      let month_end = this.month.indexOf(this.test)
      if (month_end === 12) {
        month_end = 0
      }
      const actionPayload = {
        date_end: this.month[month_end],
        id: this.id,
        number: this.reportNumber,
      }
      console.log(actionPayload)
      const response = await fetch('http://localhost:8080/api/editReport', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionPayload)
      });
      this.trigger += 1
      // this.reportId = await response.json();
      // await this.$router.push('/')
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  async mounted() {
    try {
      let response = await fetch(`http://localhost:8080/api/getReportForEditing/${this.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body:
          JSON.stringify({id: this.id})
      });
      response = await response.json()
      this.report = response.report
      this.strings = response.strings
      this.test = this.report[0].date_end
      this.reportNumber = this.report[0].number
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>
.q-field__append.q-field__marginal.row.no-wrap.items-center.q-anchor--skip {
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

.q-table--dense .q-table th, .q-table--dense .q-table td {
  padding: 0;
}

.q-table--dense .q-table th:last-child, .q-table--dense .q-table td:last-child {
  padding: 0;
}

.q-table--dense .q-table th:first-child, .q-table--dense .q-table td:first-child {
  padding: 0;
}

.q-field__native.row.items-center {
  display: flex;
  justify-content: center;
}

th {
  font-weight: 700;
}

.q-markup-table {
  overflow: hidden;
}

@media (max-width: 1300px) {
  table {
    width: 90%;
  }
}
</style>
