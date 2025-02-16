

export interface ISnapValue {
  id: string | number
  value: number
  [x: string | number]: any
}

export interface SnapAxisOptions {
  snapValues?: ISnapValue[];
  debug?: boolean
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
  snapped: boolean;
  value: number;
}

export interface SnapToResult {
  snapped: boolean;
  value: number;
}
