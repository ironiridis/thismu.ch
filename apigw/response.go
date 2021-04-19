package apigw

import (
	"encoding/json"
	"fmt"
	"html/template"
)

type Response struct {
	Status        int               `json:"statusCode"`
	Cookies       []string          `json:"cookies,omitempty"`
	Base64Encoded bool              `json:"isBase64Encoded"`
	Headers       map[string]string `json:"headers"`
	Body          string            `json:"body"`
}

func NewResponse() *Response {
	return &Response{
		Cookies: []string{},
		Status:  200,
		Headers: map[string]string{},
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

func (o *Response) BodyJSON(status int, d interface{}) error {
	buf, err := json.Marshal(d)
	if err != nil {
		return err
	}
	o.Status = status
	o.Body = string(buf)
	o.Headers["content-type"] = "application/json"
	return nil
}

func (o *Response) BodyHTML(status int, t *template.Template, d interface{}) error {
	o.Status = status
	o.Headers["content-type"] = "text/html"
	return t.Execute(o, d)
}
