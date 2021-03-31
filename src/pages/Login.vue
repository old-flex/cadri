<template>
  <q-layout view="lHr lpR lFr">
    <q-page-container>
      <q-page>
        <div class="absolute-center ">
          <q-card class="q-pa-md flex flex-center column">
            <h5>Пожалуйста, авторизуйтесь</h5>
            <q-input
              filled
              v-model="login"
              label="Введите логин"
              hint="Ваш логин"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите логин']"
            />

            <q-input
              class="q-pt-md"
              filled
              v-model="password"
              label="Введите пароль"
              hint="Ваш пароль"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите пароль']"
            />

            <q-btn class="q-mt-md" label="Войти" @click="$router.push('/')" />
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
name: "Login",
  data() {
    return {
      login: '',
      password: '',
    }
  }
}
</script>

<style scoped>

</style>
