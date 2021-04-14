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

            <q-btn class="q-mt-md" label="Войти" @click="auth()" />
            <div style="min-height: 20px; margin-top: 10px;" class="text-red">
              {{errMess}}
            </div>
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
      role: null,
      errMess: '',
    }
  },
  methods: {
    async auth(){
      this.errMess = '';
      const response = await fetch('http://localhost:8080/api/login', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({login: this.login, password: this.password})
      })

      const result = await response.json();

      if(result.length > 0) {
        this.role = result[0].role
        localStorage.setItem('role', this.role)

        if(this.role === 'vacation_operator'){
          await this.$router.push('/createVacation')
        }

        if(this.role === 'report_operator') {
          await this.$router.push('/createReport')
        }
      } else {
        this.errMess = 'Такого пользователя не существует'
      }
      console.log(result)
    }
  }
}
</script>

<style scoped>

</style>
