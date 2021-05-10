<template>
  <q-layout>
    <MainHeader/>
    <q-page-container>
      <q-page>
          <div class="flex row items-center justify-between q-ml-md q-ma-sm">
            <div class="flex row items-center">
              Дата составления
              <q-input class="q-ml-md" filled v-model="date" mask="date" :rules="['date']">
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" minimal>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div class="q-ml-md">
                На год: {{nextYear}}
              </div>
              <div class="q-ml-md">
                Номер документа
              </div>
              <div class="q-ml-md text-center">
                <q-input v-model="cardNumber" />
              </div>
            </div>
            <div class="q-mr-md">
              <q-btn class="bg-secondary text-white" label="Печать" @click="test"/>
              <q-btn class="bg-secondary text-white q-ml-lg" label="Сохранить" @click="saveVacation"/>
              <q-btn class="bg-negative text-white q-ml-lg" label="Удалить" @click="deleteVacation"/>
            </div>
          </div>
          <q-table
            title="Создание графика отпусков"
            :columns="columns"
            :data="data"
            :rows-per-page-options="[ 100 ]"
            row-key="name"
          >
            <template #body="props">
              <q-tr :props="props">
                <q-td key="profession" :props="props">
                  {{ props.row.profession }}
                </q-td>
                <q-td key="fio" :props="props">
                  {{ props.row.fio }}
                </q-td>
                <q-td key="number" :props="props">
                  {{ props.row.number }}
                </q-td>
                <q-td key="daysAmount" :props="props">
                  {{ props.row.daysAmount }}
                </q-td>
                <q-td key="planned" :props="props">
                  {{ props.row.planned }}
                  <q-popup-edit  v-model.number="props.row.planned" auto-save>
                    <q-input filled v-model="props.row.planned" mask="date" :rules="['date']">
                      <template #append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="props.row.planned">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-td>
                <q-td key="fact" :props="props">
                  {{ props.row.fact }}
                  <q-popup-edit  v-model.number="props.row.fact" auto-save>
                    <q-input filled v-model="props.row.fact" mask="date" :rules="['date']">
                      <template #append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="props.row.fact">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-td>
                <q-td key="moving" :props="props">
                  {{ props.row.moving }}
                  <q-popup-edit v-model="props.row.moving" auto-save>
                    <q-input v-model="props.row.moving" dense autofocus />
                  </q-popup-edit>
                </q-td>
                <q-td key="movingDate" :props="props">
                  {{ props.row.movingDate }}
                  <q-popup-edit  v-model.number="props.row.movingDate" auto-save>
                    <q-input filled v-model="props.row.movingDate" mask="date" :rules="['date']">
                      <template #append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="props.row.movingDate">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-td>
                <q-td key="additionalFacts" :props="props">
                  {{ props.row.additionalFacts }}
                  <q-popup-edit v-model="props.row.additionalFacts" auto-save>
                    <q-input v-model="props.row.additionalFacts" dense autofocus />
                  </q-popup-edit>
                </q-td>
              </q-tr>
            </template>
          </q-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainHeader from "components/MainHeader";
export default {
  name: "EditVacations",
  components: {MainHeader},
  data() {
    return {
      isSubdivisionSelected: false,
      subdivision: null,
      isLoading: false,
      cardId: null,
      cardNumber: null,
      date: '',
      org: null,
      nextYear: null,
      columns: [
        {
          name: 'profession',
          field: "profession",
          label: 'Должность',
          style: 'max-width: 10px',
          align: 'center',
          sortable: true,
          headerStyle: 'max-width: 80px'
        },
        { name: 'fio', field: 'fio',  label: 'ФИО', align: 'center', sortable: true, style: 'white-space: pre-line', headerStyle: 'max-width: 120px'},
        { name: 'number', field: 'number', label: 'Табельный номер', align: 'center', sortable: true, style: '',  headerStyle: 'max-width: 100px; white-space: pre-line'},
        { name: 'daysAmount', field: 'daysAmount', label: 'Количество календарных дней отпуска', align: 'center',style: '', headerStyle: 'max-width: 100px; white-space: pre-line'},
        { name: 'planned', field: 'planned', align: 'center', label: 'Запланированная дата',style: '', headerStyle: 'max-width: 100px; white-space: pre-line'},
        { name: 'fact', field: 'fact', align: 'center', label: 'Фактическая дата',style: '', headerStyle: 'max-width: 100px; white-space: pre-line'},
        { name: 'moving', field: 'moving', align: 'center', label: 'Основание на перенесение', sortable: true,style: '',  headerStyle: 'max-width: 100px; white-space: pre-line'},
        { name: 'movingDate', field: 'movingDate', align: 'center', label: 'Дата предполагаемого отпуска', sortable: true,style: '', headerStyle: 'max-width: 100px; white-space: pre-line'},
        { name: 'additionalFacts', field: 'additionalFacts', align: 'center', label: 'Примечание', sortable: true,style: 'max-width: 100px; white-space: pre-line', headerStyle: 'max-width: 100px; white-space: pre-line'}
      ],
      data: []
    }
  },
  computed: {
    subdivisions() {
      return this.$store.getters['data/subdivisions']
    },
    id() {
      return this.$route.params.id
    }
  },
  async mounted() {
    try {
      let response = await fetch(`http://192.168.1.188:8080/api/getVacationForEditing/${this.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body:
          JSON.stringify({id: this.id})
      });
      response = await response.json()
      this.date = response.report[0].date_start
      this.cardNumber = response.report[0].number
      this.nextYear = response.report[0].date_end
      this.subdivision = response.report[0].name
      this.org = response.org
      this.data = response.strings.map((str) =>{
        return{
          profession: str.position,
          fio: `${str.lastname} ${str.firstname} ${str.patronymic}`,
          number: str.passport_number,
          daysAmount: str.calendar_days_of_vacation,
          planned: str.planned_date,
          fact: str.fact_date,
          moving: str.basis_for_transfer,
          movingDate: str.date_of_expected_vacation,
          additionalFacts: str.appendix,
          id: str.id
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async deleteVacation() {
      await fetch('http://192.168.1.188:8080/api/deleteVacation', {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({id: this.id})
      })
      await this.$router.push('/')
    },
    test() {
      fetch('http://127.0.0.1:5000/createXml', {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
          org: this.org,
          date_end: this.nextYear,
          number: this.cardNumber,
          date_start: this.date,
          data: this.data,
          subdivision: this.subdivision
        })
      })
    },
    getTables() {
      this.isSubdivisionSelected = true;
      this.getUsersBySubdivision()
    },
    async saveVacation() {
      const actionPayload = {
        date_start: this.date,
        number: this.cardNumber,
        id: this.id,
      }

      const response = await fetch('http://192.168.1.188:8080/api/updateVacation', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionPayload)
      });

      for (const employee of this.data) {
        const payload = {
          id: employee.id,
          calendar_days_of_vacation: employee.daysAmount,
          planned_date: employee.planned,
          fact_date: employee.fact,
          basis_for_transfer: employee.moving,
          date_of_expected_vacation: employee.movingDate,
          appendix: employee.additionalFacts
        }

        console.log(payload)

        await fetch('http://192.168.1.188:8080/api/updateVacationString', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload)
        });
      }
      await this.$router.push('/')
    },
    async getUsersBySubdivision() {
      this.isLoading = true;
      try {
        const response = await fetch('http://192.168.1.188:8080/api/users');
        this.employees = await response.json();
        this.employees = this.employees.filter((e) => {
          return e.subdivision_id === this.subdivision.id;
        })
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false;
      console.log(this.employees)
      this.data = this.employees.map((e) => {
        return {
          profession: e.position,
          fio: `${e.lastname} ${e.firstname} ${e.patronymic}`,
          number: e.passport_number,
          id: e.id
        }
      })
    }
  }
}
</script>

<style>
.q-table th, .q-table-td {
  padding: 4px 4px;
}
</style>
