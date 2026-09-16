# Radiorecord SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module RadiorecordFeatures
  def self.make_feature(name)
    case name
    when "base"
      RadiorecordBaseFeature.new
    when "ratelimit"
      RadiorecordRatelimitFeature.new
    when "retry"
      RadiorecordRetryFeature.new
    when "test"
      RadiorecordTestFeature.new
    when "timeout"
      RadiorecordTimeoutFeature.new
    else
      RadiorecordBaseFeature.new
    end
  end
end
