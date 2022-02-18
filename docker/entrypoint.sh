#!/bin/sh

set -e

docker/init_db.sh

exec "$@"
