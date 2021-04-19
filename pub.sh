#!/bin/bash
set -euo pipefail

go mod tidy

go build -ldflags='-w -s' -o http/http ./http/
go build -ldflags='-w -s' -o ws/ws ./ws/

zip -qjm9 http.zip http/http
zip -qjm9 ws.zip ws/ws

aws lambda update-function-code --function-name "thismuchHTTP" --zip-file "fileb://http.zip" --publish
aws lambda update-function-code --function-name "thismuchWS" --zip-file "fileb://ws.zip" --publish

rm -f http.zip ws.zip

