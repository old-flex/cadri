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
                  <q-item-section @click="$router.push('/')">
                    Табели на текущий месяц
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="$router.push('/reportCard')">
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
      <q-page>
        <div class="flex row items-center justify-between q-ml-md">
          <div class="flex row items-center">
            Месяц отчетного периода
            <q-select style="width: 90px;" :options="mounth" v-model="test"/>
          </div>
          <div class="q-mr-md">
            <q-btn class="bg-secondary text-white" label="Сохранить"/>
          </div>
        </div>
        <div class="q-mt-md q-ml-md">
          Отдел: Бухгатлтерия
        </div>
        <q-markup-table class="q-mt-md"  separator="cell" flat bordered dense>
          <tbody >
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
            <td rowspan="2"  class="text-center">Витя Петров, <p>инженер</p></td>
            <td rowspan="2"  class="text-center">1123</td>
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
name: "EditReport",
  data () {
    return {
      model: ["Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я", "Я"],
      options: [
        'Я', 'Н', 'Б', 'ОО', 'ГГ'
      ],
      mounth: ["Январь", "Февраль", "Март"],
      test: null,
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
