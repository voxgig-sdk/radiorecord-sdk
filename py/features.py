# Radiorecord SDK feature factory

from feature.base_feature import RadiorecordBaseFeature
from feature.test_feature import RadiorecordTestFeature


def _make_feature(name):
    features = {
        "base": lambda: RadiorecordBaseFeature(),
        "test": lambda: RadiorecordTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
