# Radiorecord SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

RadiorecordUtility.registrar = ->(u) {
  u.clean = RadiorecordUtilities::Clean
  u.done = RadiorecordUtilities::Done
  u.make_error = RadiorecordUtilities::MakeError
  u.feature_add = RadiorecordUtilities::FeatureAdd
  u.feature_hook = RadiorecordUtilities::FeatureHook
  u.feature_init = RadiorecordUtilities::FeatureInit
  u.fetcher = RadiorecordUtilities::Fetcher
  u.make_fetch_def = RadiorecordUtilities::MakeFetchDef
  u.make_context = RadiorecordUtilities::MakeContext
  u.make_options = RadiorecordUtilities::MakeOptions
  u.make_request = RadiorecordUtilities::MakeRequest
  u.make_response = RadiorecordUtilities::MakeResponse
  u.make_result = RadiorecordUtilities::MakeResult
  u.make_point = RadiorecordUtilities::MakePoint
  u.make_spec = RadiorecordUtilities::MakeSpec
  u.make_url = RadiorecordUtilities::MakeUrl
  u.param = RadiorecordUtilities::Param
  u.prepare_auth = RadiorecordUtilities::PrepareAuth
  u.prepare_body = RadiorecordUtilities::PrepareBody
  u.prepare_headers = RadiorecordUtilities::PrepareHeaders
  u.prepare_method = RadiorecordUtilities::PrepareMethod
  u.prepare_params = RadiorecordUtilities::PrepareParams
  u.prepare_path = RadiorecordUtilities::PreparePath
  u.prepare_query = RadiorecordUtilities::PrepareQuery
  u.graphql_body = RadiorecordUtilities::GraphqlBody
  u.graphql_errors = RadiorecordUtilities::GraphqlErrors
  u.result_basic = RadiorecordUtilities::ResultBasic
  u.result_body = RadiorecordUtilities::ResultBody
  u.result_headers = RadiorecordUtilities::ResultHeaders
  u.transform_request = RadiorecordUtilities::TransformRequest
  u.transform_response = RadiorecordUtilities::TransformResponse
}
