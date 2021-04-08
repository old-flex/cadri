<template>
          <q-markup-table  separator="cell" flat bordered dense>
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
                <q-select borderless dense v-model="model" :options="options"/>
              </td>
            </tr>
            <tr>
              <td class="text-center" v-for="index in 31" :key="index">
                8
              </td>
            </tr>
            </tbody>

          </q-markup-table>
</template>

<script>
export default {
name: "EditReport",
  data () {
    return {
      model: ["Я"],
      options: [
        'Я', 'Н', 'Б', 'ОО', 'ГГ'
      ]
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
