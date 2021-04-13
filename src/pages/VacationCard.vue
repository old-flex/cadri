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
                  <q-item-section @click="$router.push('reportCard')">
                    Табели на текущий год
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>
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
                  <q-item-section>
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
              На год 2021
            </div>
          </div>
          <div class="q-mr-md">
            <q-btn class="bg-secondary text-white" label="Сохранить"/>
          </div>
        </div>
        <q-table
          title="Создание графика отпусков"
          :columns="columns"
          :data="data"
          :rows-per-page-options="[]"
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "VacationCard",
  data() {
    return {
      date: '2019/02/01',
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
      data: [
        {
          profession: 'Начальник отдела',
          fio: 'Красилов Иван Павлович',
          number: 48,
          daysAmount: 28,
          planned: '24.04.2021',
          fact: ' ',
          moving: ' ',
          movingDate: '24.03.2021',
          additionalFacts: ''
        },
        {
          profession: 'Главный бугалтер',
          fio: 'Барышев Альберт Никонорович',
          number: 156,
          daysAmount: 28,
          planned: '24.08.2021',
          fact: ' ',
          moving: ' ',
          movingDate: '24.04.2021',
          additionalFacts: ''
        },
        {
          profession: 'Бухгалтер',
          fio: 'Петров Александр Васильевич',
          number: 159,
          daysAmount: 28,
          planned: '24.04.2021',
          fact: ' ',
          moving: ' ',
          movingDate: '24.04.2021',
          additionalFacts: ''
        },
      ]
    }
  }
}
</script>

<style >
.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: normal;
}
.q-field--with-bottom{
  padding-bottom: 0;
}
</style>
