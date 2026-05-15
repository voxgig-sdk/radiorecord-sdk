-- Radiorecord SDK error

local RadiorecordError = {}
RadiorecordError.__index = RadiorecordError


function RadiorecordError.new(code, msg, ctx)
  local self = setmetatable({}, RadiorecordError)
  self.is_sdk_error = true
  self.sdk = "Radiorecord"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function RadiorecordError:error()
  return self.msg
end


function RadiorecordError:__tostring()
  return self.msg
end


return RadiorecordError
