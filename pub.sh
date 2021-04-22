#!/bin/bash
set -euo pipefail

go mod tidy

deployLambda () {
    if [ ! -e $1.zip ] || [ $(find $1/ -type f -newer $1.zip | wc -l) -gt 0 ]
    then
        echo rebuilding and uploading $1 to $2
        go build -ldflags='-w -s' -o $1/$1 ./$1/
        zip -qjm9 $1.zip $1/$1
        aws lambda update-function-code --function-name "$2" --zip-file "fileb://$1.zip" --publish
    else
        echo zip file seems up-to-date. rm $1.zip to force.
    fi
}

deployLambda http thismuchHTTP
deployLambda ws thismuchWS
aws s3 sync static/ s3://static.thismu.ch/
