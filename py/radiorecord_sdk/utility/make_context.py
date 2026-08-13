# Radiorecord SDK utility: make_context

from radiorecord_sdk.core.context import RadiorecordContext


def make_context_util(ctxmap, basectx):
    return RadiorecordContext(ctxmap, basectx)
