import { SnapValueManager } from "../src/SnapValueManager";
describe("SnapValueManager", () => {
  it("init svm", () => {
    const svm = new SnapValueManager([-2, 1, -3, 4, 7, 3, 5]);
    expect(svm.getAllValues()).toEqual([-3, -2, 1, 3, 4, 5, 7]);
  });

  it("SnapValueManager.getSnapValues", () => {
    const svm = new SnapValueManager([-2, 1, 1, 1, 1, -3, 4, 7, 3, 5]);
    expect(svm.getAllValues()).toEqual([-3, -2, 1, 1, 1, 1, 3, 4, 5, 7]);
    expect(svm.getValues()).toEqual([-3, -2, 1, 3, 4, 5, 7]);
  });

  it("SnapValueManager.add", () => {
    const svm = new SnapValueManager([-2, 1, -3, 4, 7, 3, 5]);
    svm.add(-1);
    svm.add(6);
    svm.add(9);
    expect(svm.getAllValues()).toEqual([-3, -2, -1, 1, 3, 4, 5, 6, 7, 9]);
  });

  it("SnapValueManager.addBatch", () => {
    const svm = new SnapValueManager([-2, 1, -3, 4, 7, 3, 5]);
    svm.addBatch([-1, 6, 9]);
    expect(svm.getAllValues()).toEqual([-3, -2, -1, 1, 3, 4, 5, 6, 7, 9]);
  });

  it("SnapValueManager.delete", () => {
    const svm = new SnapValueManager([-2, 1, -3, 4, 7, 3, 5]);
    svm.add(-1);
    svm.add(6);
    svm.add(9);
    expect(svm.getAllValues()).toEqual([-3, -2, -1, 1, 3, 4, 5, 6, 7, 9]);
    svm.delete(-1);
    svm.delete(6);
    svm.delete(9);
    expect(svm.getAllValues()).toEqual([-3, -2, 1, 3, 4, 5, 7]);
  });

  it("SnapValueManager.deleteBatch", () => {
    const svm = new SnapValueManager([-2, 1, -3, 4, 7, 3, 5]);
    svm.add(-1);
    svm.add(6);
    svm.add(9);
    expect(svm.getAllValues()).toEqual([-3, -2, -1, 1, 3, 4, 5, 6, 7, 9]);
    svm.deleteBatch([-1, 6, 9]);
    expect(svm.getAllValues()).toEqual([-3, -2, 1, 3, 4, 5, 7]);
  });

  it("SnapValueManager.has - 01", () => {
    const svm = new SnapValueManager([-2, 1, -3, 4, 7, 3, 5]);
    expect(svm.has(1)).toBeTruthy();
    expect(svm.has(6)).toBeFalsy();
  });

  it("SnapValueManager.has - 02", () => {
    const svm = new SnapValueManager([-2, 1, 0.3, -3, 4, 7, 3, 5]);
    expect(svm.has(0.1 + 0.2)).toBeTruthy();
  });

  it("SnapValueManager.getIndexByValue - 01", () => {
    const svm = new SnapValueManager([-2, 1, -3, 4, 7, 3, 5]);
    expect(svm.getIndexByValue(1)).toBe(2);
    expect(svm.getIndexByValue(6)).toBe(-1);
  });

  it("SnapValueManager.getIndexByValue - 02", () => {
    const svm = new SnapValueManager([-2, 1, 1, 1, 1, -3, 4, 7, 3, 5]);
    expect(svm.getIndexByValue(1)).toBe(4);
    expect(svm.getIndexByValue(6)).toBe(-1);
  });

  it("SnapValueManager.getIndexByValue - 03", () => {
    const svm = new SnapValueManager([-2, 1, 1, 1, 1, 1, 1, 1, 1, -3, 4, 7, 3, 5]);
    expect(svm.getIndexByValue(1)).toBe(6);
    expect(svm.getIndexByValue(6)).toBe(-1);
  });

  it("SnapValueManager.getIndexByValue - 04", () => {
    const svm = new SnapValueManager([-2, 1, -3, 4, 7, 3, 5, 0.3]);
    expect(svm.getIndexByValue(0.1 + 0.2)).toBe(2);
  });

});
