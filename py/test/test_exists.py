# ProjectName SDK exists test

import pytest
from radiorecord_sdk import RadiorecordSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = RadiorecordSDK.test(None, None)
        assert testsdk is not None
