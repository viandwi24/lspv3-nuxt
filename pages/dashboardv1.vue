<template>
  <div>
    <div class="flex flex-row flex-grow h-full">
      <!-- sidebar -->
      <div class="sidebar shadow-2xl flex flex-col flex-grow">
        <div class="text-center mt-8">
          <div class="rounded-full bg-gray-400 inline-block p-2">
            <img src="@/assets/images/avatar.png" alt="Avatar" class="avatar">
          </div>
          <div class="text-indigo-500 mt-2">
            Alfian Dwi Nugraha
          </div>
        </div>
        <div class="container px-16 py-8 flex-1">
          <!-- menu -->
          <div class="grid grid-cols-2 row-gap-8 text-center mt-4">
            <div>
              <a href="#" class="bg-indigo-500 text-gray-100 px-4 py-3 rounded-md shadow-md">
                <icon icon="home" />
              </a>
              <div class="mt-3 font-semibold text-sm text-indigo-500">
                Dashboard
              </div>
            </div>
            <div>
              <a href="#" class="bg-gray-200 text-indigo-500 px-5 py-3 rounded-md shadow-sm">
                <icon icon="user-alt" />
              </a>
              <div class="mt-3 text-sm text-indigo-500">
                Profile
              </div>
            </div>
            <div>
              <a href="#" class="bg-gray-200 text-indigo-500 px-5 py-3 rounded-md shadow-sm">
                <icon icon="list-alt" />
              </a>
              <div class="mt-3 text-sm text-indigo-500">
                Asesmen
              </div>
            </div>
            <div>
              <a href="#" class="bg-gray-200 text-indigo-500 px-5 py-3 rounded-md shadow-sm">
                <icon icon="cogs" />
              </a>
              <div class="mt-3 text-sm text-indigo-500">
                Setting
              </div>
            </div>
          </div>
        </div>
        <div class="mx-4 mb-4">
          <a href="#" class="bg-indigo-500 px-6 py-3 inline-block w-full text-center text-gray-100 rounded-lg">
            Logout
            <icon icon="sign-out-alt" class="ml-2" />
          </a>
        </div>
      </div>
      <!-- content -->
      <div class="flex-1 bg-blue-500">
        <h1>aweawe</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>

<style lang="scss" scoped>
@media (max-width: 512px) {
  .sidebar {
    @apply hidden;
  }
}
@media (min-width: 512px) {
  .sidebar {
    $width-md: 320px;
    width: 100%;
    max-width: $width-md;
    min-width: $width-md;
    @apply min-h-screen max-h-screen;
  }
}
.avatar {
  width: 64px;
  @apply rounded-full inline-block;
}
</style>
