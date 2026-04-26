export const useElemHeight = (
  elemRef: Ref<HTMLElement | null>,
  propertyName: string
) => {
  let resizeObserver: ResizeObserver | null = null

  const update = () => {
    if (!elemRef.value) return

    const height = elemRef.value.offsetHeight
    document.documentElement.style.setProperty(
      `--${propertyName}`,
      `${height}px`
    )
  }

  onMounted(() => {
    update()

    resizeObserver = new ResizeObserver(() => {
      update()
    })

    if (elemRef.value) {
      resizeObserver.observe(elemRef.value)
    }

    window.addEventListener('resize', debounce(200, update))
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
    window.removeEventListener('resize', update)
  })
}