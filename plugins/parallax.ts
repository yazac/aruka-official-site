interface IOOptions {
  speed?: number;
  initPosition?: string;
}

const defaultOptions: IOOptions = {
  speed: 1,
  initPosition: '0%',
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("parallax", {
    mounted(el: HTMLElement, binding: DirectiveBinding<IOOptions>) {
      const options = { ...defaultOptions, ...(binding.value ?? {}) };

      const update = () => {
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const delta = elementCenter - viewportCenter;

        const y = delta * options.speed!;
        el.style.transform = `translateY(calc(${options.initPosition} + ${y}px))`;
      };

      const onScroll = throttle(200, update);

      el.style.transition = "transform 0.5s ease-out";
      (el as any).__parallaxOnScroll__ = onScroll;
      window.addEventListener("scroll", onScroll);
      onScroll();
    },

    unmounted(el: HTMLElement) {
      const onScroll = (el as any).__parallaxOnScroll__;
      if (onScroll) {
        window.removeEventListener("scroll", onScroll);
        delete (el as any).__parallaxOnScroll__;
      }
    },
  });
});