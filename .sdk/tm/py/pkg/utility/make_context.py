# Radiorecord SDK utility: make_context

from projectname_sdk.core.context import RadiorecordContext


def make_context_util(ctxmap, basectx):
    return RadiorecordContext(ctxmap, basectx)
