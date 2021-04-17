package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-lambda-go/lambdacontext"
)

type req struct {
	Headers map[string]string `json:"headers"`
	Query   map[string]string `json:"queryStringParameters"`
	HTTP    map[string]string `json:"http"`
	Body    string            `json:"body"`
}

func HandleRequest(ctx context.Context, r *req) (string, error) {
	lc, b := lambdacontext.FromContext(ctx)

	return fmt.Sprintf("Hello! b=%v.\nlc=%#v\nr=%#v", b, lc, *r), nil
}

func main() {
	lambda.Start(HandleRequest)
}
