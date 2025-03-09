export interface ISnapValue {
  id: string | number;
  value: number;
  [x: string | number]: any;
}

export interface SnapAxisOptions {
  snapValues?: ISnapValue[];
  debug?: boolean;
  getSnapUnitValue?: (scale?: number) => number;
}

export enum SnapDirection {
  PREV = 0,
  NEXT = 1,
  BOTH = 2,
}

export interface SnapOptions {
  distance: number;
  minStep?: number;
}

export interface SnapToNearestOptions {
  direction?: SnapDirection;
  distance?: number;
}

export interface SnapToNearestResult {
  /**
   * 是否触发了吸附
   */
  snapped: boolean;
  value: number;
}

export interface SnapToResult {
  /**
   * 是否触发了吸附
   */
  snapped: boolean;
  value: number;
}

export interface SnapUpdaterOptions {
  distance?: number; // 吸附距离
  scale?: number; // 缩放比例
  disableSnap?: boolean; // 是否禁用吸附
}

export interface SnapUpdaterOverrideOptions extends SnapUpdaterOptions {
  initValue?: number; // 同步外部最新值
  delta?: number; // 自定义偏移量，可能存在一些特殊场景，通常不建议使用
}

export interface SnapGroupUpdaterOverrideOptions extends SnapUpdaterOptions {
  initValues?: number[]; // 同步外部最新值
  delta?: number; // 自定义偏移量，可能存在一些特殊场景，通常不建议使用
}

export interface SnapGroupToResults {
  /**
   * 是否触发了吸附
   */
  snapped: boolean;
  values: number[];
}
