# Radiorecord SDK feature factory

from radiorecord_sdk.feature.base_feature import RadiorecordBaseFeature
from radiorecord_sdk.feature.ratelimit_feature import RadiorecordRatelimitFeature
from radiorecord_sdk.feature.retry_feature import RadiorecordRetryFeature
from radiorecord_sdk.feature.test_feature import RadiorecordTestFeature
from radiorecord_sdk.feature.timeout_feature import RadiorecordTimeoutFeature


_FEATURES = {
    "base": lambda: RadiorecordBaseFeature(),
    "ratelimit": lambda: RadiorecordRatelimitFeature(),
    "retry": lambda: RadiorecordRetryFeature(),
    "test": lambda: RadiorecordTestFeature(),
    "timeout": lambda: RadiorecordTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
