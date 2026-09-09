set -a
source .env
set +a

wget -O assets/json/works.json "${CMS_API_URL}/export"
