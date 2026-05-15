package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewChartEntityFunc func(client *RadiorecordSDK, entopts map[string]any) RadiorecordEntity

