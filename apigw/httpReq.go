package apigw

type HTTPReq struct {
	Headers        map[string]string `json:"headers"`
	Query          map[string]string `json:"queryStringParameters"`
	RouteKey       string            `json:"routeKey"`
	PathParameters map[string]string `json:"pathParameters"`
	Req            struct {
		HTTP struct {
			Method   string `json:"method"`
			Path     string `json:"path"`
			SourceIP string `json:"sourceIp"`
		} `json:"http"`
	} `json:"requestContext"`
	Body string `json:"body"`
}
