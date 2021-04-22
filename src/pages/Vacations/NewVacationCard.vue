<template>
<q-layout>
  <MainHeader/>
  <q-page-container>
    <q-page>
      <div v-if="!isSubdivisionSelected" class="absolute-center">
        <q-card class="q-pa-lg flex flex-center column text-center">
          <div class="q-mt-lg">
            Выберите подразделение
            <q-select style="width: 100%;" :options="subdivisions" v-model="subdivision"/>
          </div>

          <q-btn class="q-mt-md" :disabled="!subdivision" @click="getTables">
            Сохранить
          </q-btn>
        </q-card>
      </div>
      <div v-else>
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
          </div>
          <div class="q-mr-md">
            <q-btn class="bg-secondary text-white" label="Сохранить" @click="saveCard"/>
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
                <q-popup-edit v-model.number="props.row.daysAmount">
                  <q-input type="number" v-model.number="props.row.daysAmount" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="planned" :props="props">
                {{ props.row.planned }}
                <q-popup-edit v-model.number="props.row.planned">
                  <q-date v-model="props.row.planned" minimal />
                </q-popup-edit>
              </q-td>
              <q-td key="fact" :props="props">
                {{ props.row.fact }}
                <q-popup-edit v-model.number="props.row.fact">
                  <q-date type="number" v-model="props.row.fact"  minimal />
                </q-popup-edit>
              </q-td>
              <q-td key="moving" :props="props">
                {{ props.row.moving }}
                <q-popup-edit v-model="props.row.moving">
                  <q-input v-model="props.row.moving" dense autofocus />
                </q-popup-edit>
              </q-td>
              <q-td key="movingDate" :props="props">
                {{ props.row.movingDate }}
                <q-popup-edit v-model="props.row.movingDate">
                  <q-date v-model="props.row.movingDate" minimal />
                </q-popup-edit>
              </q-td>
              <q-td key="additionalFacts" :props="props">
                {{ props.row.additionalFacts }}
                <q-popup-edit v-model="props.row.additionalFacts">
                  <q-input v-model="props.row.additionalFacts" dense autofocus />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import MainHeader from "components/MainHeader";
export default {
  name: "NewVacationCard",
  components: {MainHeader},
  data() {
    return {
      isSubdivisionSelected: false,
      subdivision: null,
      isLoading: false,
      cardId: null,
      date: '',
      columns: [
        {
          name: 'profession',
          field: "profession",
          required: true,
          label: 'Должность по штатному расписанию',
          align: 'center',
          sortable: true
        },
        { name: 'fio', field: 'fio',  label: 'ФИО', align: 'center', sortable: true },
        { name: 'number', field: 'number', label: 'Табельный номер', align: 'center', sortable: true },
        { name: 'daysAmount', field: 'daysAmount', label: 'Количество календарных дней отпуска', align: 'center', },
        { name: 'planned', field: 'planned', align: 'center', label: 'Запланированная дата' },
        { name: 'fact', field: 'fact', align: 'center', label: 'Фактическая дата' },
        { name: 'moving', field: 'moving', align: 'center', label: 'Основание на перенесение', sortable: true  },
        { name: 'movingDate', field: 'movingDate', align: 'center', label: 'Дата предполагаемого отпуска', sortable: true },
        { name: 'additionalFacts', field: 'additionalFacts', align: 'center', label: 'Примечание', sortable: true }
      ],
      data: []
    }
  },
  computed: {
    subdivisions() {
      return this.$store.getters['data/subdivisions']
    },
    nextYear() {
      let today = new Date();
      let year = today.getFullYear();
      return year + 1
    }
  },
  methods: {
    getTables() {
      this.isSubdivisionSelected = true;
      this.getUsersBySubdivision()
    },
    async saveCard() {
      const actionPayload = {
        number: 123,
        date_start: this.date,
        date_end: this.nextYear,
        subdivision_id: this.subdivision.id
      }

      const response = await fetch('http://localhost:8080/api/createNewVacation', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionPayload)
      });

      this.cardId = await response.json()

      for (const employee of this.data) {
        const payload = {
          user_id: employee.id,
          vacation_card_id: this.cardId,
          calendar_days_of_vacation: employee.daysAmount,
          planned_date: employee.planned,
          fact_date: employee.fact,
          basis_for_transfer: employee.moving,
          date_of_expected_vacation: employee.movingDate,
          appendix: employee.additionalFacts
        }

        await fetch('http://localhost:8080/api/createNewVacationString', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload)
        });
      }
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
      console.log(this.employees)
      this.data = this.employees.map((e) => {
        return {
          profession: 'Инженер',
          fio: `${e.lastname} ${e.firstname} ${e.patronymic}`,
          number: e.passport_number,
          id: e.id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
