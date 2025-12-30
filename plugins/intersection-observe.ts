import type { DirectiveBinding } from 'vue'

type PixelValue = `${number}px`;

interface IOoptions {
  root?: HTMLElement | null
  rootMargin?: PixelValue
  scrollMargin?: PixelValue
  threshold?: number
  className?: string
  retrigger?: boolean
  onEnter?: (entry: IntersectionObserverEntry) => void
  onLeave?: (entry: IntersectionObserverEntry) => void
}

const defaultOptions: IOoptions = {
  root: null,
  rootMargin: "0px",
  scrollMargin: "0px",
  threshold: 1.0,
  className: 'js-active',
  retrigger: false,
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('intersection-observe', {
    mounted(el: HTMLElement, binding: DirectiveBinding<IOoptions>) {
      const opt: IOoptions = {
        ...defaultOptions,
        ...(binding.value ?? {}),
      }

      function callback(entries: IntersectionObserverEntry[]): void {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add(opt.className!)

            opt.onEnter?.(entry)

            if (!opt.retrigger) {
              observer.unobserve(el)
            }
          }
          
          else if (opt.retrigger) {
            el.classList.remove(opt.className!)

            opt.onLeave?.(entry)
          }
        })
      }
      const observer = new IntersectionObserver(callback, opt)
      observer.observe(el)

      ;(el as any).__io__ = observer
    },

    unmounted(el: HTMLElement) {
      const observer = (el as any).__io__ as IntersectionObserver | undefined
      observer?.disconnect()
      delete (el as any).__io__
    },
  })})