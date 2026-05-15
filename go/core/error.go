package core

type RadiorecordError struct {
	IsRadiorecordError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewRadiorecordError(code string, msg string, ctx *Context) *RadiorecordError {
	return &RadiorecordError{
		IsRadiorecordError: true,
		Sdk:              "Radiorecord",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *RadiorecordError) Error() string {
	return e.Msg
}
