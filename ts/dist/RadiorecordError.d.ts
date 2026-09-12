import { Context } from './Context';
declare class RadiorecordError extends Error {
    isRadiorecordError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { RadiorecordError };
