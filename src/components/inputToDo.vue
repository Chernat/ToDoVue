<template>
  <div class="mb-3">
    <v-form>
      <v-row class="align-items-baseline position-relative">
        <v-col :cols="activeInput ? 9 : 12">
          <v-text-field label="Add new task"
            v-model="text"
            aria-autocomplete="false"
            @keydown.prevent.enter="inputFunction"
            @keyup="activeInput = text.length > 0"></v-text-field>
        </v-col>
        <div :class="[activeInput ? 'animation' : 'animation-back' ]" v-show="activeInput">
          <v-btn text x-small class="p0" @click.prevent="inputFunction">
            <v-icon color="#000" class="icons">mdi-plus</v-icon>
          </v-btn>
          <v-btn text x-small color="error" @click.prevent="clearInput">
            <v-icon color="#000" class="icons">mdi-close</v-icon>
          </v-btn>
        </div>
      </v-row>
      <v-expand-transition>
        <div v-show="activeInput" height="100">
          <v-row v-show="text.length">
            <v-col>
              <p class="mr-3 d-inline-block">Marker: </p>
              <v-expand-transition
                v-for="marker in markersList" :key="marker.id">
                <v-btn
                  @click="addToActiveTips(marker)"
                  :class="markerColor(marker)"
                  rounded
                  depressed
                  x-small>{{ marker }}</v-btn>
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
      text: '',
      activeMarkers: [],
      activeInput: false
    }
  },
  computed: {
    colors () {
      return this.$store.getters.colorsList
    },
    markersList () {
      return this.$store.getters.markersList
    }
  },
  methods: {
    inputFunction () {
      if (this.text.length > 0) {
        const date = Date.now()
        this.$store.dispatch('addItem', { text: this.text, time: date, markers: this.activeMarkers })
        this.clearInput()
      }
    },
    addToActiveTips (markerName) {
      if (this.activeMarkers.includes(markerName)) {
        this.activeMarkers.splice(this.activeMarkers.indexOf(markerName), 1)
      } else {
        this.activeMarkers.push(markerName)
      }
    },
    clearInput () {
      this.text = ''
      this.activeMarkers = []
      this.activeInput = false
    },
    markerColor (markerName) {
      if (this.activeMarkers.includes(markerName)) {
        return 'btn__' + this.colors[markerName]
      }
    }
  }
}
</script>

<style>
</style>
