#!/bin/sh
# CMS の /export を取得して assets/json/works.json を更新する。
# 取得や JSON の検証に失敗したら、原因が追えるよう内容を出力してビルドを止める
set -eu

if [ -z "${CMS_API_URL:-}" ]; then
  echo "update-works: CMS_API_URL is not set" >&2
  exit 1
fi

url="${CMS_API_URL%/}/export"
tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

status="$(curl -sS --retry 3 -o "$tmp" -w '%{http_code}' "$url")"
if [ "$status" != "200" ] || ! node -e 'JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"))' "$tmp"; then
  echo "update-works: failed to fetch $url (HTTP $status). Response head:" >&2
  head -c 500 "$tmp" >&2
  echo >&2
  exit 1
fi

mv "$tmp" assets/json/works.json
echo "update-works: fetched $url"
