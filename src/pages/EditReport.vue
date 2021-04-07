<template>
  <q-layout view="lHr lpR lFr">
    <q-page-container>
      <q-page>
        <div class="flex items-center">
          <q-markup-table separator="cell" flat bordered dense>
            <tbody v-for="index1 in 10" :key="index1">
            <tr>
              <td v-if="index1 === 1" rowspan="2" class="text-center">Фамилия, инициалы, должность</td>
              <td v-if="index1 === 1" rowspan="2" class="text-center">Табельный номер</td>
              <td v-if="index1 === 1" colspan="31" class="text-center">Отметки о явках и неявках</td>
            </tr>
            <tr>
              <td v-for="index in 31" :key="index">
                {{ index }}
              </td>
            </tr>
            <tr>
              <td rowspan="2"  class="text-center">Витя Петров, <p>инженер</p></td>
              <td rowspan="2"  class="text-center">1123</td>
              <td class="text-center" v-for="index in 31" :key="index">
                <q-select dense v-model="model[index]" :options="options"/>
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
export default {
name: "EditReport",
  data () {
    return {
      model: [],
      options: [
        'Я', 'Н', 'Б', 'ОО', 'ГГ'
      ]
    }
  }
}
</script>

<style scoped>

</style>
