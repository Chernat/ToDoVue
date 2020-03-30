import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg'
  },
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1,
        secondary: colors.red.lighten4,
        accent: colors.indigo.base
      }
    }
  }
})
