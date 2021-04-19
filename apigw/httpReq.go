package apigw

type HTTPReq struct {
	Headers map[string]string `json:"headers"`
	Query   map[string]string `json:"queryStringParameters"`
	Req     struct {
		HTTP struct {
			Method string `json:"method"`
			Path   string `json:"path"`
		} `json:"http"`
	} `json:"requestContext"`
	Body string `json:"body"`
}
