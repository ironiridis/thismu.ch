package main

import (
	"context"
	"embed"
	"html/template"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/ironiridis/thismu.ch/apigw"
)

//go:embed *.html
var embededFS embed.FS

var templateShell = template.Must(template.ParseFS(embededFS, "shell.html"))

func HandleRequest(ctx context.Context, r *apigw.HTTPReq) (*apigw.Response, error) {
	out := apigw.NewResponse()
	err := out.BodyHTML(200, templateShell, r)
	if err != nil {
		return out.InternalError(err)
	}
	return out, err
}

func main() {
	lambda.Start(HandleRequest)
}
