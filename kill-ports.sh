#!/bin/sh

set -eu

for port in 8081 8082 8083; do
  pids=$(lsof -tiTCP:"$port" -sTCP:LISTEN || true)

  if [ -n "$pids" ]; then
    echo "Killing process(es) listening on port $port: $pids"
    kill -9 $pids
  else
    echo "No process is listening on port $port"
  fi
done
