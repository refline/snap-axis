import { isCloseEqual, isNil } from "./helpers";
import { ISnapValue } from "./types";

export class SnapValueManager {
  private values: ISnapValue['value'][] = []

  constructor(initialValues: ISnapValue['value'][] = []) {
    // 初始化时对数据进行排序
    this.values = initialValues.slice().sort((a, b) => a - b);
  }

  get size() {
    return this.values.length
  }

  add(value: ISnapValue['value']) {
    const index = this._findInsertIndex(value);
    this.values.splice(index, 0, value); 
  }

  addBatch(values: ISnapValue['value'][]) {
    this.values = this.values.concat(values).sort((a, b) => a - b);
  }

  delete(value: ISnapValue['value']) {
    const index = this._binarySearch(value);
    if (index >= 0) {
      this.values.splice(index, 1);
      return true; 
    }
    return false; 
  }

  deleteBatch(values: ISnapValue['value'][]) {
    const toDelete = new Set(values); 
    this.values = this.values.filter((item) => !toDelete.has(item));
  }

  has(value: ISnapValue['value']) {
    return this._binarySearch(value) >= 0;
  }

  getIndexByValue(value: ISnapValue['value']) {
    return this._binarySearch(value)
  }
  getValueByIndex(index: number): number | undefined {
    return this.values[index]
  }

  getPrev(startValue: number, startIndex?: number) {
    const result: { value: ISnapValue['value'], index: number } = {
      value: null,
      index: null
    }

    if (isNil(startValue)) {
      return result
    }

    const index = isNil(startIndex) ? this._findInsertIndex(startValue) : startIndex;  // 找到插入位置

    let prevIndex = index - 1

    while (prevIndex >= 0) {
      const prevValue = this.values[prevIndex]

      if (isCloseEqual(prevValue, startValue)) {
        prevIndex--
        continue
      }

      result.value = prevValue
      result.index = prevIndex

      break
    }

    return result
  }

  prevIterator(initValue: ISnapValue['value']) {
    let value = initValue
    let index = undefined
    return {
      [Symbol.iterator]: () => {
        return {
          next: () => {
            const { value: prevValue, index: prevIndex } = this.getPrev(value, index)
            if (prevValue === null) {
              return {
                value: null,
                done: true
              }
            }
            value = prevValue
            index = prevIndex
            return {
              value: { value: prevValue, index: prevIndex },
              done: false
            }
          }
        }
      }
    }
  }

  getNext(startValue: ISnapValue['value'], startIndex?: number) {
    const result: { value: ISnapValue['value'], index: number } = {
      value: null,
      index: null
    }

    if (isNil(startValue)) {
      return result
    }

    const index = isNil(startIndex) ? this._findInsertIndex(startValue) : startIndex;  // 找到插入位置

    let nextIndex = index

    while (nextIndex < this.values.length) {
      const nextValue = this.values[nextIndex]

      if (isCloseEqual(nextValue, startValue)) {
        nextIndex++
        continue
      }

      result.value = nextValue
      result.index = nextIndex

      break
    }

    return result
  }

  nextIterator(initValue: ISnapValue['value']) {
    let value = initValue
    let index = undefined
    return {
      [Symbol.iterator]: () => {
        return {
          next: () => {
            const { value: nextValue, index: nextIndex } = this.getNext(value, index)
            if (nextValue === null) {
              return {
                value: null,
                done: true
              }
            }
            value = nextValue
            index = nextIndex
            return {
              value: { value: nextValue, index: nextIndex },
              done: false
            }
          }
        }
      }
    }
  }
  
  // 二分查找，返回数据索引（如果存在）
  protected _binarySearch(value: ISnapValue['value']) {
    let left = 0;
    let right = this.values.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (isCloseEqual(this.values[mid], value)) {
        return mid; // 找到数据，返回索引
      } else if (this.values[mid] < value) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1; // 数据不存在
  }

  // 查找插入位置，保持有序性
  protected _findInsertIndex(value: ISnapValue['value']) {
    let left = 0;
    let right = this.values.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this.values[mid] < value) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left; // 返回插入位置
  }

  /**
   * 返回去重后的数据集合
   * @returns 
   */
  getValues() {
    return Array.from(new Set(this.values));
  }

  // 返回当前数据集合
  getAllValues() {
    return [...this.values];
  }
 
}