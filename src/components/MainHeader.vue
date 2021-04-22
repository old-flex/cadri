<template>
  <q-header elevated class="bg-grey-7 text-white">
    <q-toolbar>
      <q-btn flat round dense icon="arrow_back"  @click="$router.go(-1)"/>

      <q-toolbar-title>
        Помощь кадрам

        <q-btn v-if="role === 'report_operator'"  style="margin-left: 40px" color="secondary" label="Табель" icon-right="expand_more">
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

        <q-btn v-if="role === 'vacation_operator'" style="margin-left: 40px" color="secondary" label="График отпусков" icon-right="expand_more">
          <q-menu fit>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section @click="$router.push('/')">
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
      <q-btn flat round dense icon="logout" @click="logout"/>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "MainHeader",
  methods: {
    logout() {
      this.$router.push('/login')
      localStorage.removeItem('role')
    }
  },
  computed: {
    role() {
      return  localStorage.getItem('role')
    }
  }
}
</script>

<style scoped>

</style>
