<template>
  <div>
    <v-row>
      <v-list-item two-line v-for="(item, i) in items" :key="item.id">
      <v-list-item-content>
        <v-col
        cols="8">
          <v-list-item-subtitle>
          <v-btn
            v-for="item in item.tips"
            :key="item"
            depressed
            rounded
            dark
            x-small
            >{{ item }}</v-btn>
        </v-list-item-subtitle>
        <v-list-item-title>{{ i + 1 }}: {{ item.item }}</v-list-item-title>
        </v-col>
        <v-col
          cols="4"
          class="text-right">
          <span
            @click="itemDone(i)">
            <v-icon color="#000" class="icons" >mdi-check</v-icon>
          </span>
          <span
            text
            x-small
            @click="deleteItem(i)">
            <v-icon color="#000" class="icons" >mdi-close</v-icon>
          </span>
        </v-col>
      </v-list-item-content>
    </v-list-item>
    <div class="text-center">
      <v-btn
      v-show="items.length"
      @click="clearAll"
      text
      x-small
      >Clear All</v-btn>
    </div>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'todolist',
  data () {
    return {
      items: this.$store.state.todoList
    }
  },
  methods: {
    deleteItem (i) {
      this.$store.commit('DELETE_ITEM', i)
    },
    itemDone (i) {
      this.$store.commit('DONE_ITEM', i)
    },
    clearAll () {
      this.$store.commit('CLEAR_ALL')
    }
  }
}
</script>

<style>

</style>
