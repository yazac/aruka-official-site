const useCurrentLanguage = (): Ref<'jp' | 'en'> => {
  const route = useRoute()
  return computed(() => {
    const path = route.path
    return path.startsWith('/en/') || path === '/en' ? 'en' : 'jp'
  })
}

export function getCurrentLanguage() {
  const currentLanguage = useCurrentLanguage()
  return currentLanguage.value
}

export function getLocalizedPath(basePath: string): string {
  const route = useRoute()
  const lang = route.path.startsWith('/en/') || route.path === '/en' ? 'en' : 'jp'
  return lang === 'en' ? `/en${basePath}` : basePath
}

export function isCurrentPage(targetPath: string): boolean {
  const route = useRoute()
  const jpPath = targetPath
  const enPath = targetPath === '/' ? '/en' : `/en${targetPath}`
  
  return route.path === jpPath || route.path === enPath
}