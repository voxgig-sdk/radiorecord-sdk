package voxgigradiorecordsdk

import (
	"github.com/voxgig-sdk/radiorecord-sdk/core"
	"github.com/voxgig-sdk/radiorecord-sdk/entity"
	"github.com/voxgig-sdk/radiorecord-sdk/feature"
	_ "github.com/voxgig-sdk/radiorecord-sdk/utility"
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
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
