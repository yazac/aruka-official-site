// CMS の /export は作品画像を R2 の公開 URL（https://images.aruka-earth.net/works/...）で返す。
// Cloudflare の画像変換を通すため、cloudflare provider（baseURL = 画像ドメイン）用のパスに変換して渡す
const WORK_IMAGE_PLACEHOLDER = 'https://placehold.jp/800x800.png'

export function workImageSrc(url?: string | null): string {
  return url ? new URL(url).pathname : WORK_IMAGE_PLACEHOLDER
}

export function workImageProvider(url?: string | null): string | undefined {
  return url ? 'cloudflare' : undefined
}
