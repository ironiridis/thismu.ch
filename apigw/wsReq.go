package apigw

type WSReq struct {
	Req struct {
		API          string `json:"apiId"`
		ConnectionID string `json:"connectionId"`
		Domain       string `json:"domainName"`
		EventType    string `json:"eventType"`
	} `json:"requestContext"`
	Body string `json:"body"`
}
