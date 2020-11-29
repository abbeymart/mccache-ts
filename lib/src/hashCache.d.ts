/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-09
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: hash cache (key-hash-value)
 */
import { ValueType, CacheResponse } from "../config/cacheTypes";
export declare function setHashCache(key: string, hash: string, value: ValueType, expire?: number): CacheResponse;
export declare function getHashCache(key: string, hash: string): CacheResponse;
export declare function deleteHashCache(key: string, hash: string, by?: string): CacheResponse;
export declare function clearHashCache(): CacheResponse;
