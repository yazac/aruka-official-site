<template>
  <Transition name="modal">
    <div class="c-modal" role="dialog" aria-modal="true" v-if="modal.isOpen">
      <div class="c-modal-inner">
        <WorksModalContent v-if="modal.payload?.id" :id="modal.payload.id" />
      </div>
      <button 
        type="button"
        class="c-modal-background"
        @click="closeModal()"
      ></button>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const { modal, closeModal } = useModal()
const lenis = useLenis()

const escKey = (e: KeyboardEvent) => {
  if (e.key === "Escape" && modal.value.isOpen) closeModal()
}

onMounted(() => document.addEventListener("keydown", escKey))
onUnmounted(() => {
  document.removeEventListener("keydown", escKey)
  lenis.value?.start()
})

watch(
  () => modal.value.isOpen,
  (isOpen) => {
    if (isOpen) {
      lenis.value?.stop()
    } else {
      lenis.value?.start()
    }
  }
)

</script>

<style lang="scss" scoped>
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.c-modal {
  width: 100%;
  height: 100vh;
  position: relative;
}

.c-modal-inner {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
}

.c-modal-background {
  width: 100%;
  height: 100%;
  background-color: rgba(1,1,1,0.2);
  backdrop-filter: blur(0.2rem);
  position: absolute;
  top: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.1s ease;

  .c-modal-inner {
    transition: opacity 0.1s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .c-modal-inner {
    opacity: 0;
  }
}
</style>
