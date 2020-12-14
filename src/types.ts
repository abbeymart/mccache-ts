/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-16
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mccache types
 */

// types
// export type ValueType = string | number | object | Array<number> | Array<string> | Array<object>;
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
