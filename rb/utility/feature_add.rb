# Radiorecord SDK utility: feature_add
module RadiorecordUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
