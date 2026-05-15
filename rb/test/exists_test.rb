# Radiorecord SDK exists test

require "minitest/autorun"
require_relative "../Radiorecord_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = RadiorecordSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
