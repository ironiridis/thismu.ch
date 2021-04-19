package main

import (
	"context"
	"embed"
	"fmt"
	"html/template"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/ironiridis/thismu.ch/apigw"
)

//go:embed *.html
var embededFS embed.FS

func HandleRequest(ctx context.Context, r *apigw.HTTPReq) (*apigw.Response, error) {
	var err error
	out := apigw.NewResponse("text/html")
	t, err := template.ParseFS(embededFS, "shell.html")
	if err != nil {
		return out.InternalError(err)
	}
	err = t.Execute(out, fmt.Sprintf("%#v", *r))
	if err != nil {
		return out.InternalError(err)
	}
	return out, err
}

func main() {
	lambda.Start(HandleRequest)
}
