import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#ee4238',
        secondary: '#FFB6C1',
        anchor: '#2c3e50'
      }
    }
  }
}

export default new Vuetify(opts)
