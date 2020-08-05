<template>
  <div>
    Asesi
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'default',
  head: {
    title: 'Dashboard - User - Asesi - Admin'
  }
}
</script>
