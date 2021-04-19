package apigw

import "fmt"

type Response struct {
	Status        int               `json:"statusCode"`
	Cookies       []string          `json:"cookies,omitempty"`
	Base64Encoded bool              `json:"isBase64Encoded"`
	Headers       map[string]string `json:"headers"`
	Body          string            `json:"body"`
}

func NewResponse(contentType string) *Response {
	return &Response{
		Cookies: []string{},
		Status:  200,
		Headers: map[string]string{
			"content-type": contentType,
		},
	}
}

func (o *Response) InternalError(err error) (*Response, error) {
	o.Status = 500
	o.Headers = map[string]string{"content-type": "application/json"}
	o.Body = fmt.Sprintf(`{"error": %q}`, err.Error())
	return o, err
}

func (o *Response) Write(p []byte) (n int, err error) {
	o.Body += string(p)
	n = len(p)
	return
}
