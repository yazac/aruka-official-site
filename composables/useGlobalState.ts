// フラグ管理系

// ブラウザタブのアクティブ/非アクティブ状態
export const usePageVisibleState = (): Ref<boolean> =>
  useState('page-visible', () => true)

// ローディング
export const useLoadingState = (): Ref<boolean> =>
  useState('loading', () => true)

// スプラッシュのオンオフステータス
export const useSplashState = (): Ref<boolean> =>
  useState('splash', () => true)

// KV リソース（3D オブジェクト・テクスチャ）読み込み完了フラグ
export const useKVResourcesLoadedState = (): Ref<boolean> =>
  useState('kv-resources-loaded', () => false)

// footer交差
export const useFooterIntersectingState = (): Ref<boolean> =>
  useState('footer-intersecting', () => false)

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