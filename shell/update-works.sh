set -a
source .env
set +a

wget -O assets/json/works.json "https://script.google.com/macros/s/${USER_KEY}/exec"