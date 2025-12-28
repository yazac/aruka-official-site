// ローディング
export const useLoadingState = (): Ref<boolean> =>
  useState('loading', () => true)

// メニュー開閉
export const useMenuOpenState = (): Ref<boolean> =>
  useState('menu-open', () => false)

// モーダル種別
export type ModalType = 'login' | 'signup' | null
export const useModalState = (): Ref<ModalType> =>
  useState('modal', () => null)

// ページ遷移中フラグ
export const usePageTransitionState = (): Ref<boolean> =>
  useState('page-transition', () => false)
