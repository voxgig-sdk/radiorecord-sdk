# Radiorecord SDK feature factory

from radiorecord_sdk.feature.base_feature import RadiorecordBaseFeature
from radiorecord_sdk.feature.test_feature import RadiorecordTestFeature


def _make_feature(name):
    features = {
        "base": lambda: RadiorecordBaseFeature(),
        "test": lambda: RadiorecordTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
