<template>
  <div />
</template>

<script>
export default {
  created () {
    if (this.$auth.loggedIn) {
      const role = this.$auth.user.role
      this.$router.push({ name: (`${role}`).toLowerCase() })
    }
  }
}
</script>
