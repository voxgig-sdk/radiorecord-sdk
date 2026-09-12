export interface Chart {
    artist?: string;
    duration?: number;
    id?: number;
    image?: string;
    position?: number;
    title?: string;
}
export interface ChartListMatch {
    artist?: string;
    duration?: number;
    id?: number;
    image?: string;
    position?: number;
    title?: string;
    $action?: string;
    [action: string]: any;
}
