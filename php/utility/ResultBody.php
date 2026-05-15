<?php
declare(strict_types=1);

// Radiorecord SDK utility: result_body

class RadiorecordResultBody
{
    public static function call(RadiorecordContext $ctx): ?RadiorecordResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
