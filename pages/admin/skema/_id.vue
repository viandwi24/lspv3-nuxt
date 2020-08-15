<template>
  <div>
    {{ skema.title }}
  </div>
</template>

<script>
import { useOurCrudSchema } from '@/api/admin/schema.js'
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ params, app, redirect }) {
    const { read } = useOurCrudSchema(app)
    const id = params.id
    let skema

    try {
      skema = (await read(id)).data
    } catch (error) {
      await redirect({ name: 'admin-skema' })
    }

    return {
      id,
      skema
    }
  }
}
</script>
