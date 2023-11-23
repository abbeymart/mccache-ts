/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-16
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mccache types
 */

type ValueType =
    Record<string, unknown>
    | Array<Record<string, unknown>>
    | string
    | number
    | Array<string>
    | Array<number>
    | boolean
    | Array<boolean>;

type KeyType = string | Record<string, unknown> | number

export interface CacheParamsType {
    key: KeyType;
    value: ValueType;
    expire?: number;
}

export interface HashCacheParamsType {
    key: KeyType;
    hash: KeyType;
    value: ValueType;
    expire?: number;
}

export type ByType = "hash" | "key"

export interface QueryHashCacheParamsType {
    key: KeyType;
    hash: KeyType;
    by?: ByType;
}

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