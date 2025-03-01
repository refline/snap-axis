import { hasAddSnapValue, isCloseEqual, isNil } from "./helpers";
import { SnapValueManager } from "./SnapValueManager";
import {
  SnapGroupToResults,
  ISnapValue,
  SnapAxisOptions,
  SnapDirection,
  SnapToNearestOptions,
  SnapToNearestResult,
  SnapToResult,
  SnapUpdaterOptions,
} from "./types";

const DefaultGetUpdaterOptions: SnapUpdaterOptions = {
  disableSnap: false,
  distance: 5,
};

/**
 * SnapAxis 是一个用于管理吸附轴（如水平轴或垂直轴）的类，支持吸附点的添加、删除、更新以及吸附逻辑的实现。
 */
export class SnapAxis {
  private _debug = false;
  /**
   * 用于管理吸附值的存储和查询
   */
  private snapValueManager: SnapValueManager = new SnapValueManager();
  /**
   * 用于存储所有吸附点的详细信息，键为吸附点的唯一标识符 id，值为吸附点的完整数据。
   */
  private snapValueMap: Map<ISnapValue["id"], ISnapValue> = new Map();
  /**
   * 用于存储每个吸附值对应的吸附点 id 集合。键为吸附值，值为吸附点 id 的集合。
   */
  private snapValueToIdsMap: Map<ISnapValue["id"], Set<ISnapValue["id"]>> = new Map();
  /**
   * 构造函数，初始化吸附轴。
   * @param {SnapAxisOptions} options - 配置选项，包含吸附点数组和获取吸附单位值的函数。
   */
  constructor(options: SnapAxisOptions = {}) {
    const { snapValues = [], getSnapUnitValue, debug = false } = options;

    this._debug = debug;

    if (getSnapUnitValue) {
      this.__getSnapUnitValue__ = getSnapUnitValue;
    }

    // 初始化吸附点
    this._initSnapValues(snapValues);
  }

  /**
   * 安全获取某个吸附值对应的 id 集合。如果不存在，则创建一个新的集合并返回。
   * @param {number} value - 吸附值
   * @returns {Set<ISnapValue['id']>} - 吸附值对应的 id 集合
   */
  private _safeGetIdsSet(value: number): Set<ISnapValue["id"]> {
    const map = this.snapValueToIdsMap;

    if (!map.has(value)) {
      const set = new Set<ISnapValue["id"]>();
      map.set(value, set);
      return set;
    }

    return map.get(value);
  }

  /**
   * 初始化吸附点，将吸附点数据存储到 snapValueMap 和 snapValueToIdsMap 中。
   * @param {ISnapValue[]} snapValues - 吸附点数组
   */
  private _initSnapValues(snapValues: ISnapValue[]) {
    const values: number[] = [];

    for (let i = 0; i < snapValues.length; i++) {
      const snapValue = snapValues[i];
      const id = snapValue.id;
      const value = snapValue.value;

      if (!Number.isFinite(value) || id == null) {
        if (this._debug) {
          // process.env.NODE_ENV === 'development'
          console.warn("[SnapAxis] Invalid snap value:", snapValue);
        }
        continue;
      }

      values.push(snapValue.value);
      this.snapValueMap.set(id, snapValue);
      this._safeGetIdsSet(value).add(id);
    }

    this.snapValueManager.addBatch(values);
  }
  /**
   * 获取吸附单位值的默认实现。
   * @returns {number} - 吸附单位值
   */
  private __getSnapUnitValue__ = () => 1;
  /**
   * 获取吸附单位值。
   * @returns {number} - 吸附单位值
   */
  private getSnapUnitValue(): number {
    const c = this.__getSnapUnitValue__;
    return c();
  }
  /**
   * 判断是否存在指定 id 的吸附点。
   * @param {ISnapValue['id']} id - 吸附点 id
   * @returns {boolean} - 是否存在
   */
  has(id: ISnapValue["id"]): boolean {
    return this.snapValueMap.has(id);
  }
  /**
   * 判断是否存在指定值的吸附点。
   * @param {number} value - 吸附值
   * @returns {boolean} - 是否存在
   */
  hasValue(value: ISnapValue["value"]): boolean {
    return this.snapValueToIdsMap.has(value);
  }

  /**
   * 添加吸附点。
   * @param {ISnapValue} snapValue - 要添加的吸附点
   */
  addSnapValue(snapValue: ISnapValue) {
    const { id, value } = snapValue;

    if (!Number.isFinite(value) || id == null) {
      if (this._debug) {
        // process.env.NODE_ENV === 'development'
        console.warn("[SnapAxis] Invalid snap value:", snapValue);
      }
      return;
    }

    if (this.snapValueMap.has(id)) {
      const oldSnapValue = this.snapValueMap.get(id);
      this.deleteSnapValue(oldSnapValue);
    }

    this.snapValueMap.set(id, snapValue);

    const snapValueToIdsMap = this.snapValueToIdsMap;

    if (!hasAddSnapValue(snapValueToIdsMap, value)) {
      this.snapValueManager.add(value);
    }

    this._safeGetIdsSet(value).add(id);
  }
  /**
   * 更新吸附点。
   * @param {ISnapValue} snapValue - 要更新的吸附点
   * @returns {boolean} - 是否更新成功
   */
  updateSnapValue(snapValue: ISnapValue): boolean {
    if (!this.snapValueMap.has(snapValue.id)) {
      return false;
    }

    const oldSnapValue = this.snapValueMap.get(snapValue.id);
    this.deleteSnapValue(oldSnapValue);
    this.addSnapValue(snapValue);

    return true;
  }

  /**
   * 批量添加吸附点。
   * @param {ISnapValue[]} snapValues - 要添加的吸附点数组
   */
  addSnapValues(snapValues: ISnapValue[]) {
    snapValues.forEach((snapValue) => this.addSnapValue(snapValue));
  }

  /**
   * 删除吸附点。
   * @param {ISnapValue} snapValue - 要删除的吸附点
   * @returns {boolean} - 是否删除成功
   */
  deleteSnapValue(snapValue: ISnapValue): boolean {
    const { id, value } = snapValue;

    this.snapValueMap.delete(id);

    const idsSet = this.snapValueToIdsMap.get(value);
    if (idsSet) {
      idsSet.delete(id);
      if (idsSet.size === 0) {
        this.snapValueToIdsMap.delete(value);
        this.snapValueManager.delete(value);
      }
    }

    return true;
  }
  /**
   * 根据 id 删除吸附点。
   * @param {ISnapValue['id']} id - 吸附点 id
   * @returns {boolean} - 是否删除成功
   */
  deleteSnapValueById(id: ISnapValue["id"]): boolean {
    const snapValue = this.snapValueMap.get(id);

    if (!snapValue) {
      return false;
    }

    return this.deleteSnapValue(snapValue);
  }

  /**
   * 批量删除吸附点。
   * @param {ISnapValue[]} snapValues - 要删除的吸附点数组
   */
  deleteSnapValues(snapValues: ISnapValue[]) {
    snapValues.forEach((snapValue) => this.deleteSnapValue(snapValue));
  }
  /**
   * 根据 id 数组批量删除吸附点。
   * @param {ISnapValue['id'][]} ids - 吸附点 id 数组
   */
  deleteSnapValueByIds(ids: ISnapValue["id"][]) {
    ids.forEach((id) => this.deleteSnapValueById(id));
  }

  /**
   * 判断是否处于吸附状态。
   * @param {number} value - 吸附值
   * @returns {boolean} - 是否处于吸附状态
   */
  checkSnapped(value: number): boolean {
    // return this.snapValueManager.has(value)

    const idsSet = this.snapValueToIdsMap.get(value);
    if (!idsSet) {
      return false;
    }

    return idsSet.size > 0;
  }

  /**
   * 根据当前值和偏移量，计算吸附后的目标值。
   * @param {number} axisValue - 当前坐标轴的值
   * @param {number} offset - 偏移量
   * @param {Object} options - 吸附选项
   * @param {number} options.distance - 吸附距离
   * @returns {value:number, snapped: boolean} - 吸附后的目标值及状态
   */
  snapTo(axisValue: number, offset: number, options: { distance: number }): SnapToResult {
    const unitValue = this.getSnapUnitValue(); // 吸附单位值
    const newSnapValue = axisValue + offset;
    const targetAxisValue = axisValue + offset;
    const absOffset = Math.abs(offset);
    // const halfUnitValue = unitValue * 0.5
    // const minStepValue = halfUnitValue
    const { distance } = options;

    if (isCloseEqual(absOffset, 0)) {
      return { value: axisValue, snapped: false };
    }

    if (distance <= 0) {
      return { value: newSnapValue, snapped: false };
    }

    // if (distance < minStepValue) {
    //   return newSnapValue
    // }

    let snapped = absOffset > distance ? false : this.checkSnapped(axisValue); //axis === SnapAxis.X ? this.hasXAxisSnapPoints(axisValue) : this.hasYAxisSnapPoints(axisValue)

    // if (snapped) {
    // 移动距离小于等于 distance 时，优先准确吸附
    // if (offset <= distance) {
    if (this.checkSnapped(targetAxisValue)) {
      return { value: targetAxisValue, snapped: true };
    }
    // }
    // }
    // 判断移动方向
    const moveLeft = offset < 0;
    const svm = this.snapValueManager;
    const startSnapValue = snapped ? axisValue : targetAxisValue;
    let snapValues = moveLeft ? svm.prevIterator(startSnapValue) : svm.nextIterator(startSnapValue); // 从当前值开始查找

    const canSnapTo = (value: number, distance: number) => {
      // 用于非吸附状态或者吸附状态下，offset>distance 场景
      if (!isCloseEqual(value, targetAxisValue)) {
        // move left
        // eg: snapValues=[1, 2, 3, 4, 5] 移动目标 axisValue=8 ->(offset=-4.3) targetAxisValue=3.7 ，应该吸附到 3
        if (moveLeft && value > targetAxisValue) {
          return false;
        }

        // move right
        // eg: snapValues=[1, 2, 3, 4, 5] 移动目标 axisValue=1 ->(offset=3.3) targetAxisValue=4.3 ，应该吸附到 5
        if (!moveLeft && value < targetAxisValue) {
          return false;
        }
      }

      if (isCloseEqual(value, targetAxisValue, distance)) {
        return true;
      }

      return false;
    };

    for (let { value } of snapValues) {
      if (value === null) {
        continue;
      }

      if (snapped) {
        // 当处于吸附状态下试，如果吸附点和初始位置的距离大于 distance，则不会移动
        // eg: snapValues=[11, 20, ...]，当前axisValue=10(snapped=true)，offset=4 targetAxisValue=14，此时不会移动，还是10
        if (Math.abs(value - axisValue) > distance) {
          return { value: axisValue, snapped: false };
        }

        // 移动距离小于等于单位步长时，吸附到[axisValue + offset - unitValue * 0.25, axisValue+offset+ unitValue* 0.25]之间的值
        if (absOffset <= unitValue) {
          const a = targetAxisValue - unitValue * 0.25;
          const b = targetAxisValue + unitValue * 0.25;

          if (moveLeft && value < a) {
            return { value: axisValue, snapped: false };
          }

          if (!moveLeft && value > b) {
            return { value: axisValue, snapped: false };
          }

          if (value >= a && value <= b) {
            return { value, snapped: true };
          }
        } else {
          // 移动距离大于单位步长时，吸附距离调整为对应的吸附点到初始点的一半，并执行吸附检测
          const d = Math.min(Math.abs(value - axisValue) / 2, distance);

          if (canSnapTo(value, d)) {
            return { value, snapped: true };
          } else {
            return { value: axisValue, snapped: false };
          }
        }
      } else {
        if (canSnapTo(value, distance)) {
          return { value, snapped: true };
        }
      }
    }

    if (snapped) {
      if (absOffset <= distance) {
        return { value: axisValue, snapped: false };
      }
    }

    return { value: targetAxisValue, snapped: false };
  }

  /**
   * 根据给定多个值和偏移量，计算吸附后的目标值。
   * @param {number[]} axisValues - 当前坐标轴的多值
   * @param {number} offset - 偏移量
   * @param {Object} options - 吸附选项
   * @param {number} options.distance - 吸附距离
   * @returns {values:number[], snapped: boolean} - 吸附后的目标值及状态
   */
  snapGroupTo(
    axisValues: number[],
    offset: number,
    options: { distance: number }
  ): SnapGroupToResults {
    if (!axisValues.length) {
      return {
        values: [],
        snapped: false,
      };
    }

    if (axisValues.length === 1) {
      const result = this.snapTo(axisValues[0], offset, options);
      return {
        values: [result.value],
        snapped: result.snapped,
      };
    }

    // 是否存在吸附点
    let hasSnapValue = false;
    // 是否发生了吸附
    let snapped = false;
    // 最小偏移量
    let minOffset = 0;
    let d1 = Infinity;

    for (let i = 0; i < axisValues.length; i++) {
      const value = axisValues[i];
      const result = this.snapTo(value, offset, options);

      const d2 = Math.abs(result.value - value);
      if (!d2) {
        hasSnapValue = true;
      }

      if (result.snapped) {
        snapped = true;

        if (d2 < d1) {
          d1 = d2;
          minOffset = result.value - value;
        }
      }
    }

    if (!hasSnapValue && !snapped) {
      return {
        values: axisValues.map((value) => value + offset),
        snapped: false,
      };
    }

    if (hasSnapValue && !snapped) {
      return {
        values: [...axisValues],
        snapped: false,
      };
    }

    if (hasSnapValue && snapped) {
      return {
        values: axisValues.map((value) => value + minOffset),
        snapped: true,
      };
    }

    if (!hasSnapValue && snapped) {
      return {
        values: axisValues.map((value) => value + minOffset),
        snapped: true,
      };
    }

    return {
      values: axisValues.map((value) => value + offset),
      snapped: false,
    };
  }

  /**
   * 获取吸附点的详细信息。
   * @param {number} value - 吸附值
   * @returns {ISnapValue[]} - 吸附点数组
   */
  getSnappedValues(value: number): ISnapValue[] {
    // const snappedValues: ISnapValue[] = []

    // const idsSet = this.snapValueToIdsMap.get(value)
    // if (!idsSet) {
    //   return snappedValues
    // }

    // idsSet.forEach(id => {
    //   const snapValue = this.snapValueMap.get(id)
    //   snappedValues.push(snapValue)
    // })

    // return snappedValues

    const idsSet = this.snapValueToIdsMap.get(value);
    if (!idsSet) {
      return [];
    }
    return Array.from(idsSet).map((id) => this.snapValueMap.get(id));
  }
  /**
   * 获取所有吸附点。
   * @returns {ISnapValue[]} - 所有吸附点数组
   */
  getSnapValues(): ISnapValue[] {
    return Array.from(this.snapValueMap.values());
  }
  /**
   * 获取吸附值管理器。
   * @returns {SnapValueManager} - 吸附值管理器
   */
  getSnapValueManager(): SnapValueManager {
    return this.snapValueManager;
  }

  /**
   * 吸附到最近的吸附点。
   * @param value
   * @param options
   * @returns
   */
  snapToNearest(value: number, options: SnapToNearestOptions = {}): SnapToNearestResult {
    const { direction = SnapDirection.BOTH, distance } = options;
    const result = {
      snapped: false,
      value: value,
    };

    let prevValue = null;
    let nextValue = null;
    const issetDistance = !isNil(distance) && distance > 0;

    if (direction === SnapDirection.BOTH || direction === SnapDirection.PREV) {
      const prev = this.snapValueManager.getPrev(value);
      prevValue = prev.value;

      if (issetDistance) {
        prevValue = isCloseEqual(prevValue, value, distance) ? prevValue : null;
      }
    }

    if (direction === SnapDirection.BOTH || direction === SnapDirection.NEXT) {
      const next = this.snapValueManager.getNext(value);
      nextValue = next.value;

      if (issetDistance) {
        nextValue = isCloseEqual(nextValue, value, distance) ? nextValue : null;
      }
    }

    if (prevValue === null && nextValue === null) {
      return result;
    }

    if (prevValue === null) {
      result.snapped = true;
      result.value = nextValue;
      return result;
    }

    if (nextValue === null) {
      result.snapped = true;
      result.value = prevValue;
      return result;
    }

    const d1 = Math.abs(value - prevValue);
    const d2 = Math.abs(value - nextValue);

    result.snapped = true;
    result.value = d1 < d2 ? prevValue : nextValue;

    return result;
  }

  /**
   * 如果当前值处于非吸附状态，则吸附到最近的吸附点。
   * @param {number} value - 当前值
   * @param {string} direction - 吸附方向
   * @returns {Object} - 吸附结果
   */
  snapToNearestIfNeeded(value: number, options?: SnapToNearestOptions): SnapToNearestResult {
    if (this.checkSnapped(value)) {
      return {
        snapped: false,
        value: value,
      };
    }

    return this.snapToNearest(value, options);
  }

  /**
   * 吸附到上一个吸附点。
   * @param value
   * @param options
   * @returns
   */
  snapToPrev(
    value: number,
    options: Omit<SnapToNearestOptions, "direction"> = {}
  ): SnapToNearestResult {
    return this.snapToNearest(value, { ...options, direction: SnapDirection.PREV });
  }

  /**
   * 吸附到下一个吸附点。
   * @param value
   * @param options
   * @returns
   */
  snapToNext(
    value: number,
    options: Omit<SnapToNearestOptions, "direction"> = {}
  ): SnapToNearestResult {
    return this.snapToNearest(value, { ...options, direction: SnapDirection.NEXT });
  }

  getSnapGroupUpdater(
    initValues: number[],
    startAxisValue: number,
    options?: SnapUpdaterOptions
  ): (currentAxisValue: number, options?: SnapUpdaterOptions) => SnapGroupToResults {
    if (initValues.length === 0) {
      return () => {
        return { values: [], snapped: false };
      };
    }

    let currentValues = initValues;
    let lastAxisValue = startAxisValue;
    let opts = options
      ? {
          ...DefaultGetUpdaterOptions,
          ...options,
        }
      : DefaultGetUpdaterOptions;

    return (currentAxisValue: number, options?: SnapUpdaterOptions): SnapGroupToResults => {
      if (isCloseEqual(currentAxisValue, lastAxisValue)) {
        return { values: currentValues, snapped: false };
      }

      const direction = currentAxisValue > lastAxisValue ? SnapDirection.NEXT : SnapDirection.PREV;

      lastAxisValue = currentAxisValue;

      const noSnapValue = initValues[0] + currentAxisValue - startAxisValue;

      let offset = noSnapValue - currentValues[0];

      if (direction === SnapDirection.PREV) {
        if (offset > 0) {
          offset = 0;
        }
      } else {
        if (offset < 0) {
          offset = 0;
        }
      }

      if (!offset) {
        return { values: currentValues, snapped: false };
      }

      if (options) {
        opts = {
          ...opts,
          ...options,
        };
      }

      const result = opts.disableSnap
        ? { values: currentValues.map((value) => value + offset), snapped: false }
        : this.snapGroupTo(currentValues, offset, { distance: opts.distance });

      currentValues = result.values;

      return result;
    };
  }

  /**
   * 获取吸附更新器。
   * @param initValue 初始值
   * @param startAxisValue 起始坐标轴值（例如事件的pageX或pageY）
   * @param options
   * @returns {Function} - 吸附更新器
   */
  getSnapUpdater(
    initValue: number,
    startAxisValue: number,
    options?: SnapUpdaterOptions
  ): (currentAxisValue: number, options?: SnapUpdaterOptions) => SnapToResult {
    const updater = this.getSnapGroupUpdater([initValue], startAxisValue, options);

    return (currentAxisValue: number, options?: SnapUpdaterOptions): SnapToResult => {
      const result = updater(currentAxisValue, options);

      return {
        value: result.values[0],
        snapped: result.snapped,
      };
    };
  }
}
