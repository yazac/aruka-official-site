// フラグ管理系

// ローディング
export const useLoadingState = (): Ref<boolean> =>
  useState('loading', () => true)

// スプラッシュのオンオフステータス
export const useSplashState = (): Ref<boolean> =>
  useState('splash', () => true)

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

export const useArukuchanClickNumState = (): Ref<number> =>
  useState('arukuchan-click-num', () => 0)

// UI管理系

// マウス座標
export const useMousePositionState = (): Ref<{ x: number; y: number }> =>
  useState('mouse-position', () => ({ x: 0, y: 0 }))