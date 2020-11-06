<template>
  <div />
</template>

<script>
export default {
  created () {
    if (this.$auth.loggedIn) {
      const role = this.$auth.user.role
      const route = (role === 'Accession' ? 'Asesi' : (role === 'assessor' ? 'Asesor' : 'Admin'))
      this.$router.push({ name: (route).toLowerCase() })
    }
  },
  middleware: 'auth',
  transition: 'default'
}
</script>
