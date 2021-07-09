#!/bin/sh
# wait-for-elasticsearch.sh

set -e

host="$1"
  
until curl -f -X GET "$host:9200/_cluster/health?wait_for_status=yellow&timeout=1s"; do
  >&2 echo "Elastic Search is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Elastic Search is up - executing command"
yarn run start