<template>
<q-layout view="lHr lpR lFr">
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>

      <q-avatar>
        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
      </q-avatar>
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
                <q-item-section @click="$router.push({name: 'vacations'})">
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
    <q-page class="q-pa-md">
      <div class="flex  column">
        <div style="max-width: 210px;" class="text-center text-bold">
          Выберите подразделение
        </div>
        <q-select style="max-width: 210px;"  filled v-model="currentSubdivision" :options="allSubdivisions"/>
      </div>
        <EditReport class="q-mb-sm" v-for="index in 5" :key="index"/>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import EditReport from "pages/EditReport";
export default {
  name: "MainPage",
  components: {EditReport},
  data() {
    return {
      currentSubdivision: "Бухгалтерия",
      allSubdivisions: ['Бухгалтерия', 'Учебный отдел', 'Отдел кадров'],
      isLoading: false,
      filter: '',
      columns: [
        {name: 'lastname', required: true, label: 'Фамилия', align: 'left', field: 'lastname', sortable: true,},
        {name: 'firstname', required: true, label: 'Имя', align: 'left', field: 'firstname', sortable: true},
        {name: 'patronymic', required: true, label: 'Отчество', align: 'left', field: 'patronymic', sortable: true},
        {name: 'position', required: true, label: 'Должность', align: 'left', field: 'position', sortable: true},
        {name: 'subdivision', required: true, label: 'Подразделение', align: 'left', field: 'subdivision', sortable: true},
        {name: 'phone', required: true, label: 'Телефон', align: 'left', field: 'phone', sortable: true},
      ],
      employees: [],
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
