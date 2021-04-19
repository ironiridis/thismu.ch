package main

import (
	"context"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/ironiridis/thismu.ch/apigw"
)

func HandleRequest(ctx context.Context, r apigw.WSReq) (*apigw.Response, error) {
	out := apigw.NewResponse()
	err := out.BodyJSON(200, r)
	if err != nil {
		return out.InternalError(err)
	}
	return out, err
}

func main() {
	lambda.Start(HandleRequest)
}
