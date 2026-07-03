package voxgigradiorecordsdk

import (
	"github.com/voxgig-sdk/radiorecord-sdk/go/core"
	"github.com/voxgig-sdk/radiorecord-sdk/go/entity"
	"github.com/voxgig-sdk/radiorecord-sdk/go/feature"
	_ "github.com/voxgig-sdk/radiorecord-sdk/go/utility"
)

// Type aliases preserve external API.
type RadiorecordSDK = core.RadiorecordSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type RadiorecordEntity = core.RadiorecordEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type RadiorecordError = core.RadiorecordError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewChartEntityFunc = func(client *core.RadiorecordSDK, entopts map[string]any) core.RadiorecordEntity {
		return entity.NewChartEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewRadiorecordSDK = core.NewRadiorecordSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewRadiorecordSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *RadiorecordSDK  { return NewRadiorecordSDK(nil) }
func Test() *RadiorecordSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
