<template>
        <div class="flex items-center">
          <q-markup-table separator="cell" flat bordered dense>
            <tbody >
            <tr>
              <td rowspan="2" class="text-center">Фамилия, инициалы, должность</td>
              <td  rowspan="2" class="text-center">Табельный номер</td>
              <td  colspan="31" class="text-center">Отметки о явках и неявках</td>
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
