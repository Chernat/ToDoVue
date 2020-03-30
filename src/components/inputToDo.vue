<template>
  <div class="mb-3" transition="fade-transition">
    <v-form>
      <v-row
        class="align-items-baseline">
        <v-col
          cols="9">
          <v-text-field
            label="Task"
            hide-details="auto"
            @keydown.prevent.enter="inputFunction"
            v-model="item"
            @keydown="active = item.length >= 0"></v-text-field>
        </v-col>
        <v-col
          v-show="active"
          width='100'
          cols='3'
          class="align-items-center align-end text-right">
          <span
            text
            small
            @click.prevent="inputFunction">
            <v-icon color="#000" class="icons" >mdi-plus</v-icon></span>
          <span
            text
            small
            color="error"
            @click.prevent="clearInput">
            <v-icon color="#000" class="icons" >mdi-close</v-icon></span>
        </v-col>
      </v-row>
      <v-expand-transition>
        <div
          v-show="active"
          height="100">
          <v-row>
            <v-col>
              <span v-show="activeTips.length">
                <v-btn
                v-for="item in activeTips" :key="item"
                @click="activeTips.splice(activeTips.indexOf(item), 1)"
                depressed
                rounded
                dark
                x-small>{{ item }}</v-btn>
              </span>
            </v-col>
          </v-row>
          <v-row v-show="item.length">
            <v-col>
              <v-expand-transition
                v-for="item in $store.state.tips" :key="item.name">
                <v-btn
                  @click="addToActiveTips(item.name)"
                  v-show="activeTips.indexOf(item.name) < 0"
                  :color="item.color"
                  x-small
                  text>{{ item.name }}</v-btn>
              </v-expand-transition>
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'todoinput',
  data () {
    return {
      item: '',
      activeTips: [],
      active: false
    }
  },
  methods: {
    inputFunction () {
      if (this.item.length > 0) {
        const date = Date.now()
        this.$store.commit('ADD_LIST', { item: this.item, time: date, tips: this.activeTips })
        this.item = ''
        this.activeTips = []
      }
    },
    addToActiveTips (item) {
      if (this.activeTips.indexOf(item) < 0) {
        this.activeTips.push(item)
      }
    },
    clearInput () {
      this.item = ''
      this.activeTips = []
      this.focus = false
    }
  }
}
</script>

<style>
</style>
