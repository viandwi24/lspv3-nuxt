<template>
  <div>
    <overlay-loading v-if="loading" />
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    ...mapGetters(['GET_APP'])
  },
  head () {
    const app = this.GET_APP()
    return {
      titleTemplate: `%s - ${app.name.toUpperCase()} ${app.institute.toUpperCase()}`,
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  }
}
</script>
