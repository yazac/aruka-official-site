export const useHeaderHeight = (
  headerRef: Ref<HTMLElement | null>
) => {
  let resizeObserver: ResizeObserver | null = null

  const update = () => {
    if (!headerRef.value) return

    const height = headerRef.value.offsetHeight
    document.documentElement.style.setProperty(
      '--header-height',
      `${height}px`
    )
  }

  onMounted(() => {
    update()

    resizeObserver = new ResizeObserver(() => {
      update()
    })

    if (headerRef.value) {
      resizeObserver.observe(headerRef.value)
    }

    window.addEventListener('resize', debounce(200, update))
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
    window.removeEventListener('resize', update)
  })
}