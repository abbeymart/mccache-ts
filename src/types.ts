/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-16
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mccache types
 */

export type ValueType = any

export interface CacheValueType {
    value?: ValueType;
    expire?: number;
}

export interface CacheResponseType {
    ok: boolean;
    message?: string;
    value?: ValueType;
}

export type HashCacheValueType = Map<string, CacheValueType>;
