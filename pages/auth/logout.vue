<template>
  <div />
</template>

<script>
export default {
  async mounted () {
    try {
      await this.$auth.logout()
    } catch (e) {
      this.$router.push('/')
    }
  },
  layout: 'no-title',
  middleware: 'auth'
}
</script>
