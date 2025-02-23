export interface ISnapValue {
  id: string | number;
  value: number;
  [x: string | number]: any;
}

export interface SnapAxisOptions {
  snapValues?: ISnapValue[];
  debug?: boolean;
  getSnapUnitValue?: () => number;
}

export enum SnapDirection {
  PREV = 0,
  NEXT = 1,
  BOTH = 2,
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
  disableSnap?: boolean; // 是否禁用吸附
}
