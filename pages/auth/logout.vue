<template>
  <div />
</template>

<script>
export default {
  async mounted () {
    try {
      await this.$auth.logout()
    } catch (e) {
      return this.$router.push('/auth/login')
    }
    this.$router.push('/')
  },
  layout: 'no-title',
  middleware: 'auth'
}
</script>
