/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-16
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc-central-ts: bookmark socket.io
 */
export declare type ValueType = string | number | object | Array<number> | Array<string> | Array<object>;
export interface CacheValue {
    value?: ValueType;
    expire?: number;
}
export interface CacheResponse {
    ok: boolean;
    message?: string;
    value?: ValueType;
}
export interface HashValueType {
    value?: ValueType;
    expire?: number;
}
export declare type HashCacheValueType = Map<string, HashValueType>;
