package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/ironiridis/thismu.ch/apigw"
)

type req map[string]interface{}

func HandleRequest(ctx context.Context, r req) (*apigw.Response, error) {
	out := apigw.NewResponse("application/json")
	out.Body = fmt.Sprintf(`{"msg":"Hello via ws","r":%q}`, r)
	return out, nil
}

func main() {
	lambda.Start(HandleRequest)
}
