# Radiorecord SDK utility: make_context
require_relative '../core/context'
module RadiorecordUtilities
  MakeContext = ->(ctxmap, basectx) {
    RadiorecordContext.new(ctxmap, basectx)
  }
end
