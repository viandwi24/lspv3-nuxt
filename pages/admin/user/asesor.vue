<template>
  <div>
    Asesor
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: ['auth', 'is_admin'],
  transition: 'default',
  head: {
    title: 'Dashboard - User - Asesor - Admin'
  }
}
</script>
