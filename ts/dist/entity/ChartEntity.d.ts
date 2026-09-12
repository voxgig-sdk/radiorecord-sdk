import { RadiorecordEntityBase } from '../RadiorecordEntityBase';
import type { RadiorecordSDK } from '../RadiorecordSDK';
import type { Control } from '../types';
import type { Chart, ChartListMatch } from '../RadiorecordTypes';
declare class ChartEntity extends RadiorecordEntityBase<Chart> {
    constructor(client: RadiorecordSDK, entopts: any);
    make(this: ChartEntity): ChartEntity;
    list(this: any, reqmatch?: ChartListMatch, ctrl?: Control): Promise<ChartEntity[]>;
}
export { ChartEntity };
