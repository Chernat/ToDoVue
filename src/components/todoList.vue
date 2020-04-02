<template>
  <div>
    <v-row
      v-show="items.length"
      height="100">
      <v-col
        class="align-items-center d-flex">
        <p class="mr-3 d-inline-block mb-0">Sort: </p>
        <v-btn
          v-for="sortMarker in sortList"
          :key="sortMarker"
          :dark="sortMarker === sortVal"
          @click="sortVal = sortMarker"
          x-small
          rounded
          depressed>{{ sortMarker }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-list-item
        two-line
        v-for="(item, index) in items"
        :key="index"
        :class="[sortItems().includes(index) ? 'd-block' : 'd-none',
          item.done ? 'done' : 'done-not']">
        <v-list-item-content>
          <v-col cols="8">
            <v-list-item-subtitle class="d-flex">
            <p class="mr-1">{{ createdTime(index) }}</p>
            <v-btn
              v-for="markerName in item.markers"
              :key="markerName"
              :class="markerColor(markerName)"
              depressed
              rounded
              x-small>{{ markerName }}</v-btn>
            </v-list-item-subtitle>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-col>
          <v-col cols="4" class="text-right">
            <span @click="itemDone(index)">
              <v-icon
                v-show="!item.done"
                color="#000"
                class="icons">mdi-check</v-icon>
              <v-icon
                v-show="item.done"
                color="#000"
                class="icons">mdi-minus</v-icon>
            </span>
            <span @click="deleteItem(index)">
              <v-icon color="#000" class="icons" >mdi-close</v-icon>
            </span>
          </v-col>
        </v-list-item-content>
      </v-list-item>
      <div class="text-center w-100" v-show="items.length">
        <v-btn
        @click="clearAll"
        text
        x-small>Clear All</v-btn>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'todolist',
  data () {
    return {
      sortVal: 'all'
    }
  },
  computed: {
    items () {
      return this.$store.getters.itemList
    },
    colors () {
      return this.$store.getters.colorsList
    },
    sortList () {
      return this.$store.getters.sortList
    }
  },
  methods: {
    deleteItem (i) {
      this.$store.dispatch('deleteItem', i)
    },
    itemDone (i) {
      this.$store.dispatch('doneItem', i)
    },
    clearAll () {
      this.$store.dispatch('clearAll')
    },
    markerColor (markerName) {
      return 'btn__' + this.colors[markerName]
    },
    sortItems () {
      if (this.sortVal === 'all') {
        return this.items.map((item, i) => i)
      } else {
        return this.items
          .map((item, i) => item.markers.includes(this.sortVal) ? i : false)
          .filter(item => item !== false)
      }
    },
    createdTime (index) {
      const min = Math.floor((Date.now() - this.$store.getters.itemList[index].time) / 60000)
      if (min < 60) {
        return min + ' m'
      } else if (min < 1440) {
        return Math.floor(min / 60) + ' h'
      } else {
        return Math.floor(min / 1440) + ' d'
      }
    }
  }
}
</script>

<style>

</style>
