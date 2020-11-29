/**
 * @Author: abbeymart | Abi Akindele | @Created: 2020-07-09
 * @Company: Copyright 2020 Abi Akindele  | mConnect.biz
 * @License: All Rights Reserved | LICENSE.md
 * @Description: mc: simple cache (key-value)
 */
import { ValueType, CacheResponse } from "../config/cacheTypes";
export declare function setCache(key: string, value: ValueType, expire?: number): CacheResponse;
export declare function getCache(key: string): CacheResponse;
export declare function deleteCache(key: string): CacheResponse;
export declare function clearCache(): CacheResponse;
