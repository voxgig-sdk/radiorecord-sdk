"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadiorecordError = void 0;
class RadiorecordError extends Error {
    isRadiorecordError = true;
    sdk = 'Radiorecord';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.RadiorecordError = RadiorecordError;
//# sourceMappingURL=RadiorecordError.js.map