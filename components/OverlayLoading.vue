<template>
  <div>
    <div class="z-50 fixed top-0 left-0 min-h-full min-w-full overlay-loading-bg" />
    <div class="overlay-loading z-50 bg-gray-100 fixed rounded-md shadow-2xl flex flex-row justify-center">
      <div class="self-center text-4xl text-blue-500">
        <icon icon="circle-notch" spin />
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay-loading-bg {
  background: rgba(0, 0, 0, .3);
}
.overlay-loading {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}
</style>
