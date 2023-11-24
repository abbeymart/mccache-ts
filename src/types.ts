/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-16, 2023-11-23
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mccache types
 */

export interface ObjectType {
    [key: string]: any;
}

export type KeyType = string | Record<string, unknown> | number | ObjectType

export interface CacheParamsType<T> {
    key: KeyType;
    value: T;
    expire?: number;
}

export interface HashCacheParamsType<T> {
    key: KeyType;
    hash: KeyType;
    value: T;
    expire?: number;
}

export type ByType = "hash" | "key"

export interface QueryHashCacheParamsType {
    key: KeyType;
    hash: KeyType;
    by?: ByType;
}

export interface CacheValueType<T> {
    value?: T;
    expire?: number;
}

export interface CacheResponseType<T> {
    ok: boolean;
    message?: string;
    value?: T;
}

export type HashCacheValueType<T> = Map<string, CacheValueType<T>>;