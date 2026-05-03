const isEnglishPath = (path: string) => path.startsWith('/en/') || path === '/en'

const useCurrentLanguage = (): Ref<'jp' | 'en'> => {
  const route = useRoute()
  return computed(() => isEnglishPath(route.path) ? 'en' : 'jp')
}

export function getCurrentLanguage() {
  return useCurrentLanguage().value
}

export function getBasePath() {
  const { path } = useRoute()
  return path.replace(/^\/en/, '') || '/'
}

export function getLocalizedPath(basePath: string): string {
  const { path } = useRoute()
  return isEnglishPath(path) ? `/en${basePath}` : basePath
}

export function isCurrentPage(targetPath: string): boolean {
  const { path } = useRoute()
  const enPath = targetPath === '/' ? '/en' : `/en${targetPath}`
  return path === targetPath || path === enPath
}