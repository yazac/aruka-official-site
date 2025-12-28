import type { DirectiveBinding } from 'vue'
import { useStepAnimation } from '~/composables/useStepAnimation'
import type { StepAnimationOptions } from '~/composables/useStepAnimation'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('step-animation', {
    mounted(el: HTMLElement, binding: DirectiveBinding<StepAnimationOptions>) {
      const anim = useStepAnimation(el, binding.value)

      const observer = new MutationObserver(() => {
        if (el.classList.contains('js-active')) {
          anim.start()
        }
      })

      observer.observe(el, {
        attributes: true,
        attributeFilter: ['class']
      })

      if (el.classList.contains('js-active')) {
        anim.start()
      }

      ;(el as any)._stepAnimCleanup = () => {
        observer.disconnect()
        anim.destroy()
      }
    },

    // unmounted(el: HTMLElement) {
    //   ;(el as any)._stepAnimCleanup?.()
    // },

    // getSSRProps(binding, vnode) {
    //   return {}
    // }
  })
})