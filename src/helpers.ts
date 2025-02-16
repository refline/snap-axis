import type { ISnapValue } from "./types";
import type { SnapAxis } from "./SnapAxis";

export function hasAddSnapValue(map: SnapAxis['snapValueToIdsMap'], value: number) {
  if (!map.has(value)) {
    return false
  }

  const ids: Set<ISnapValue['id']> = map.get(value)
  if (ids.size === 0) {
    return false
  }

  return true
}


export function isCloseEqual(a: number, b: number, tolerance = 1e-9) {
  const diff = Math.abs(a - b)

  return diff <= tolerance
}

// 用于判断是否为 null 或 undefined
export function isNil<T>(value: T) {
  return value == null;
}
