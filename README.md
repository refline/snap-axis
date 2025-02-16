# snap-axis
SnapAxis 是一个用于管理吸附轴（如水平轴或垂直轴）的类，支持吸附点的添加、删除、更新以及吸附逻辑的实现。

## 使用

`yarn add snap-axis` 或 `npm install snap-axis`

```ts
import { SnapAxis } from 'snap-axis'

const snapAxis = new SnapAxis({
  snapValues: [
    ...
  ]
})

```

## API

```typescript

interface ISnapValue {
  id: string | number
  value: number
  [x: string | number]: any
}

interface SnapAxisOptions {
  snapValues?: ISnapValue[];
  debug?: boolean
  getSnapUnitValue?: () => number;
}

enum SnapDirection {
  PREV = 0,
  NEXT = 1,
  BOTH = 2,
}

interface SnapToNearestOptions {
  direction?: SnapDirection; 
  distance?: number;
}

interface SnapToNearestResult {
  snapped: boolean;
  value: number;
}

interface SnapToResult {
  snapped: boolean;
  value: number;
}


class SnapAxis {
    /**
     * 构造函数，初始化吸附轴。
     * @param {SnapAxisOptions} options - 配置选项，包含吸附点数组和获取吸附单位值的函数。
     */
    constructor(options?: SnapAxisOptions);
   
    has(id: ISnapValue['id']): boolean;
    /**
     * 判断是否存在指定值的吸附点。
     * @param {number} value - 吸附值
     * @returns {boolean} - 是否存在
     */
    hasValue(value: ISnapValue['value']): boolean;
    /**
     * 添加吸附点。
     * @param {ISnapValue} snapValue - 要添加的吸附点
     */
    addSnapValue(snapValue: ISnapValue): void;
    /**
     * 更新吸附点。
     * @param {ISnapValue} snapValue - 要更新的吸附点
     * @returns {boolean} - 是否更新成功
     */
    updateSnapValue(snapValue: ISnapValue): boolean;
    /**
     * 批量添加吸附点。
     * @param {ISnapValue[]} snapValues - 要添加的吸附点数组
     */
    addSnapValues(snapValues: ISnapValue[]): void;
    /**
      * 删除吸附点。
      * @param {ISnapValue} snapValue - 要删除的吸附点
      * @returns {boolean} - 是否删除成功
      */
    deleteSnapValue(snapValue: ISnapValue): boolean;
    /**
     * 根据 id 删除吸附点。
     * @param {ISnapValue['id']} id - 吸附点 id
     * @returns {boolean} - 是否删除成功
     */
    deleteSnapValueById(id: ISnapValue['id']): boolean;
    /**
     * 批量删除吸附点。
     * @param {ISnapValue[]} snapValues - 要删除的吸附点数组
     */
    deleteSnapValues(snapValues: ISnapValue[]): void;
    /**
     * 根据 id 数组批量删除吸附点。
     * @param {ISnapValue['id'][]} ids - 吸附点 id 数组
     */
    deleteSnapValueByIds(ids: ISnapValue['id'][]): void;
    /**
     * 判断是否处于吸附状态。
     * @param {number} value - 吸附值
     * @returns {boolean} - 是否处于吸附状态
     */
    checkSnapped(value: number): boolean;
    /**
     * 根据当前值和偏移量，计算吸附后的目标值。
     * @param {number} axisValue - 当前坐标轴的值
     * @param {number} offset - 偏移量
     * @param {Object} options - 吸附选项
     * @param {number} options.distance - 吸附距离
     * @returns {value:number, snapped: boolean} - 吸附后的目标值及状态
     */
    snapTo(axisValue: number, offset: number, options: {
        distance: number;
    }): SnapToResult;
    /**
     * 获取吸附点的详细信息。
     * @param {number} value - 吸附值
     * @returns {ISnapValue[]} - 吸附点数组
     */
    getSnappedValues(value: number): ISnapValue[];
    /**
     * 获取所有吸附点。
     * @returns {ISnapValue[]} - 所有吸附点数组
     */
    getSnapValues(): ISnapValue[];
    /**
     * 获取吸附值管理器。
     * @returns {SnapValueManager} - 吸附值管理器
     */
    getSnapValueManager(): SnapValueManager;
    /**
     * 吸附到最近的吸附点。
     * @param value
     * @param options
     * @returns
     */
    snapToNearest(value: number, options?: SnapToNearestOptions): SnapToNearestResult;
    /**
     * 如果当前值处于非吸附状态，则吸附到最近的吸附点。
     * @param {number} value - 当前值
     * @param {string} direction - 吸附方向
     * @returns {Object} - 吸附结果
     */
    snapToNearestIfNeeded(value: number, options?: SnapToNearestOptions): SnapToNearestResult;
    /**
     * 吸附到上一个吸附点。
     * @param value
     * @param options
     * @returns
     */
    snapToPrev(value: number, options?: Omit<SnapToNearestOptions, 'direction'>): SnapToNearestResult;
    /**
     * 吸附到下一个吸附点。
     * @param value
     * @param options
     * @returns
     */
    snapToNext(value: number, options?: Omit<SnapToNearestOptions, 'direction'>): SnapToNearestResult;
}
```