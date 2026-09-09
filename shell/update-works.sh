set -a
source .env
set +a

wget -O assets/json/works.json "${VERCEL_DEPLOY_HOOK}/export"
