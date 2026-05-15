# Radiorecord SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module RadiorecordFeatures
  def self.make_feature(name)
    case name
    when "base"
      RadiorecordBaseFeature.new
    when "test"
      RadiorecordTestFeature.new
    else
      RadiorecordBaseFeature.new
    end
  end
end
