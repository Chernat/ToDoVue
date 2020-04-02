<template>
  <div>
    <v-container style="max-width: 400px">
      <todoinput></todoinput>
      <todolist></todolist>
    </v-container>
  </div>
</template>

<script>
import todoinput from '@/components/inputToDo.vue'
import todolist from '@/components/todoList.vue'

export default {
  components: {
    todoinput,
    todolist
  }
}
</script>

<style>

</style>
