#!/bin/bash
set -euo pipefail

handler=main
funcName=thismuchDefault

go mod tidy

# use -w -s to strip symbol info for smaller binaries
go build -ldflags='-w -s' -o $handler

if advzip -a3 $handler.zip $handler ; then
	true # nice, advzip worked
else
	echo "Consider installing advzip, part of advancecomp, for smaller zips"
	zip -9 $handler.zip $handler
fi

aws lambda update-function-code --function-name "$funcName" --zip-file "fileb://$handler.zip" --publish
rm $handler.zip
