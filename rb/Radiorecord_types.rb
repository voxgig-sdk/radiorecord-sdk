# frozen_string_literal: true

# Typed models for the Radiorecord SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Chart entity data model.
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] position
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Chart = Struct.new(
  :artist,
  :duration,
  :id,
  :image,
  :position,
  :title,
  keyword_init: true
)

# Match filter for Chart#list (any subset of Chart fields).
#
# @!attribute [rw] artist
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] position
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
ChartListMatch = Struct.new(
  :artist,
  :duration,
  :id,
  :image,
  :position,
  :title,
  keyword_init: true
)

