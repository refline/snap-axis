import { SnapAxis } from "../src/index";
import { SnapDirection } from "../src/types";

function createSnapAxis01() {
  const snapValues = [
    { value: -80, id: "-80" },
    { value: -70, id: "-70" },
    { value: -55, id: "-55" },
    { value: -40, id: "-40" },
    { value: -25, id: "-25" },
    { value: -22, id: "-22" },
    { value: -11, id: "-11" },
    { value: -10, id: "-10" },
    { value: -8, id: "-8" },
    { value: -7, id: "-7" },
    { value: -6, id: "-6" },
    { value: -5.9, id: "-5.9" },
    { value: -5.7, id: "-5.7" },
    { value: -5.5, id: "-5.5" },
    { value: -5.4, id: "-5.4" },
    { value: -5.3, id: "-5.3" },
    { value: -5.2, id: "-5.2" },
    { value: -5.1, id: "-5.1" },
    { value: -5, id: "-5" },
    { value: -4, id: "-4" },
    { value: -3, id: "-3" },
    { value: -2, id: "-2" },
    { value: -1, id: "-1" },
    { value: 0, id: "0" },
    { value: 1, id: "1" },
    { value: 2, id: "2" },
    { value: 3, id: "3" },
    { value: 4, id: "4" },
    { value: 5, id: "5" },
    { value: 5.1, id: "5.1" },
    { value: 5.2, id: "5.2" },
    { value: 5.3, id: "5.3" },
    { value: 5.4, id: "5.4" },
    { value: 5.5, id: "5.5" },
    { value: 5.7, id: "5.7" },
    { value: 5.9, id: "5.9" },
    { value: 6, id: "6" },
    { value: 7, id: "7" },
    { value: 8, id: "8" },
    { value: 10, id: "10" },
    { value: 11, id: "11" },
    { value: 22, id: "22" },
    { value: 25, id: "25" },
    { value: 40, id: "40" },
    { value: 55, id: "55" },
    { value: 70, id: "70" },
    { value: 80, id: "80" },
  ]

  return new SnapAxis({
    snapValues,
  });
}

function createSnapAxis02() {
  const snapValues = [
    { value: -80, id: "-80" },
    { value: -70, id: "-70" },
    { value: -55, id: "-55" },
    { value: -40, id: "-40" },
    { value: -25, id: "-25" },
    { value: -22, id: "-22" },
    { value: -11, id: "-11" },
    { value: -10, id: "-10" },
    { value: -8, id: "-8" },
    { value: -7, id: "-7" },
    { value: -6, id: "-6" },
    { value: -5.9, id: "-5.9" },
    { value: -5.7, id: "-5.7" },
    { value: -5.5, id: "-5.5" },
    { value: -5.4, id: "-5.4" },
    { value: -5.3, id: "-5.3" },
    { value: -5.2, id: "-5.2" },
    { value: -5.1, id: "-5.1" },
    { value: -5, id: "-5" },
    { value: -4, id: "-4" },
    { value: -3, id: "-3" },
    { value: -2, id: "-2" },
    { value: -1, id: "-1" },
    { value: -0.2, id: "-0.2" },
    { value: -0.3, id: "-0.3" },
    { value: -0.31, id: "-0.31" },
    { value: -0.4, id: "-0.4" },
    { value: -0.5, id: "-0.5" },
    { value: -0.7, id: "-0.7" },
    { value: -0.9, id: "-0.9" },
    { value: 0, id: "0" },
    { value: 0.2, id: "0.2" },
    { value: 0.3, id: "0.3" },
    { value: 0.31, id: "0.31" },
    { value: 0.4, id: "0.4" },
    { value: 0.5, id: "0.5" },
    { value: 0.7, id: "0.7" },
    { value: 0.9, id: "0.9" },
    { value: 1, id: "1" },
    { value: 2, id: "2" },
    { value: 3, id: "3" },
    { value: 4, id: "4" },
    { value: 5, id: "5" },
    { value: 5.1, id: "5.1" },
    { value: 5.2, id: "5.2" },
    { value: 5.3, id: "5.3" },
    { value: 5.4, id: "5.4" },
    { value: 5.5, id: "5.5" },
    { value: 5.7, id: "5.7" },
    { value: 5.9, id: "5.9" },
    { value: 6, id: "6" },
    { value: 7, id: "7" },
    { value: 8, id: "8" },
    { value: 10, id: "10" },
    { value: 11, id: "11" },
    { value: 22, id: "22" },
    { value: 25, id: "25" },
    { value: 40, id: "40" },
    { value: 55, id: "55" },
    { value: 70, id: "70" },
    { value: 80, id: "80" },
  ]

  return new SnapAxis({
    snapValues,
  });
}



describe("SnapAxis", () => {
  it("SnapAxis constructor", () => {
    const sp = new SnapAxis({
      snapValues: [
        { value: 1, id: "1" },
        { value: 2, id: "2" },
        { value: 3, id: "3" },
        { value: 4, id: "4" },
        { value: 5, id: "5" },
        { value: 6, id: "6" },
        { value: 7, id: "7" },
        { value: 10, id: "10" },
        { value: 11, id: "11" },
        { value: 20, id: "20" },
      ],
    });

    {
      const r = sp.snapTo(1, 2, {
        distance: 5,
      }).value;

      expect(r).toEqual(3);
    }

    {
      const r = sp.snapTo(10, 6, {
        distance: 5,
      }).value;

      expect(r).toEqual(20);
    }

    {
      const r = sp.snapTo(10, 4, {
        distance: 5,
      }).value;

      expect(r).toEqual(10); // 14
    }

    {
      const r = sp.snapTo(10, 5, {
        distance: 5,
      }).value;

      expect(r).toEqual(10);
    }

    {
      const r = sp.snapTo(10, 5.1, {
        // dir: SnapDirection.RIGHT,
        distance: 5,
      }).value;

      expect(r).toEqual(20);
    }

    {
      const r = sp.snapTo(10, 6, {
        distance: 5,
      }).value;

      expect(r).toEqual(20);
    }
  });

  // 测试 distance 为 0 的情况
  it("SnapAxis snapTo - 01", () => {
    const sp = createSnapAxis01();

    const offset = [1, 2, 3, 4, 5, 6, -1, -2, -3, -4, -5, -6];

    offset.forEach((o) => {
      const r = sp.snapTo(5, o, {
        distance: 0,
      }).value;
      expect(r).toEqual(5 + o);
    });

  });
  // 测试 offset 为 0 的情况
  it("SnapAxis snapTo - 02", () => {
    const sp = createSnapAxis01();

    {
      const r = sp.snapTo(5, 0, {
        distance: 5,
      }).value;
      expect(r).toEqual(5);
    }

  });

  // 测试准确吸附的情况
  it("SnapAxis snapTo - 03", () => {
    const sp = createSnapAxis01();

    const offset = [
      1, 2, 3, 4, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.7, 5.9, 6, 7, 8, 10, 11, 22, 25, 40, 55, 70, 80,
      -1, -2, -3, -4, -5, -5.1, -5.2, -5.3, -5.4, -5.5, -5.7, -5.9, -6, -7, -8, -10, -11, -22, -25,
      -40, -55, -70, -80,
    ];

    const values1 = offset.map((o) => {
      return sp.snapTo(0, o, {
        distance: 5,
      }).value;
    });
    expect(values1).toEqual(offset);

  });

  // 测试处于非吸附状态下吸附到最近的点
  it("SnapAxis snapTo - 04", () => {
    const sp = createSnapAxis01();

    const axisValue = 20;
    const offset = [1, 15, 29, -10.1, -14.24, -25.44, -9.9];
    const expectValues = [22, 40, 49, 8, 5.7, -5.5, 10];

    const values1 = offset.map((o) => {
      return sp.snapTo(axisValue, o, {
        distance: 5,
      }).value;
    });

    expect(values1).toEqual(expectValues);


  });

  // 测试处于吸附状态下最近的点超过吸附距离
  it("SnapAxis snapTo - 05", () => {
    const sp = new SnapAxis({
      snapValues: [
        {value: -30, id: "-30"},  
        {value: -20, id: "-20"},
        {value: -10, id: "-10"},
        {value: 0, id: "0"},
        {value: 15, id: "15"},
        {value: 20, id: "20"},
        {value: 25, id: "25"},
        {value: 30, id: "30"},
      ],
    })

    const axisValue = 0;
    const offset = [4, -4, 5, -5, 1, -1, 6, -6, 21, -21, 26, -25, 29, -29];
    const expectValues = [0, 0, 0, 0, 0, 0, 6, -10, 25, -21, 30, -30, 30, -30];

    const values1 = offset.map((o) => {
      return sp.snapTo(axisValue, o, {
        distance: 5,
      }).value;
    });

    expect(values1).toEqual(expectValues);

  });

  // 测试处于吸附状态下最近的点超过吸附距离
  it("SnapAxis snapTo - 06", () => {
    const sp = new SnapAxis({
      snapValues: [
        { value: -30, id: "-30" },
        { value: -20, id: "-20" },
        { value: -10, id: "-10" },
        { value: 0, id: "0" },
        { value: 15, id: "15" },
        { value: 20, id: "20" },
        { value: 25, id: "25" },
        { value: 30, id: "30" },
      ]
    })

    const axisValue = 0;
    const offset = [11, -11, 31, -31, -15];
    const expectValues = [15, -11, 31, -31, -20];

    const values1 = offset.map((o) => {
      return sp.snapTo(axisValue, o, {
        distance: 5,
      }).value;
    });

    expect(values1).toEqual(expectValues);


  });

  it("SnapAxis snapTo - 07", () => {
    const sp = createSnapAxis01();
    {
      const axisValue = 0
      const offset = [0.5, -0.5];
      const expectValues = [0, 0];

      const values1 = offset.map((o) => {
        return sp.snapTo(axisValue, o, {
          distance: 5,
        }).value;
      });
      expect(values1).toEqual(expectValues);


    }

    {
      const axisValue = 0
      const offset = [0.8, -0.8];
      const expectValues = [1, -1];

      const values1 = offset.map((o) => {
        return sp.snapTo(axisValue, o, {
          distance: 5,
        }).value;
      });
      expect(values1).toEqual(expectValues);

    }
  })

  it("SnapAxis snapTo - 08", () => {
    const sp = createSnapAxis02();
    {
      const axisValue = 0
      const offset = [0.6, -0.6];
      const expectValues = [0.4, -0.4];

      const values1 = offset.map((o) => {
        return sp.snapTo(axisValue, o, {
          distance: 5,
        }).value;
      });
      expect(values1).toEqual(expectValues);

    }
  })

  it("SnapAxis snapTo - 09", () => {
    const sp = new SnapAxis({
      snapValues: [
        { value: -30, id: "-30" },
        { value: -20, id: "-20" },
        { value: -10, id: "-10" },
        { value: -3, id: "-3" },
        { value: 0, id: "0" },
        { value: 3, id: "3" },
        { value: 6, id: "6" },
        { value: 15, id: "15" },
        { value: 20, id: "20" },
        { value: 25, id: "25" },
        { value: 30, id: "30" },
      ]
    })
    {
      const axisValue = 0
      const offset = [1.1, -1.1, 1.5, -1.5, 1.4, -1.4, 2, -2, 3.1, -3.1];
      const expectValues = [0, 0, 3, -3, 0, 0, 3, -3, 0, 0];

      const values1 = offset.map((o) => {
        return sp.snapTo(axisValue, o, {
          distance: 5,
        }).value;
      });
      expect(values1).toEqual(expectValues);


    }
  })

  it("SnapAxis getSnappedValues - 01", () => {
    const sa = createSnapAxis02();
    sa.addSnapValue({ value: 0.3, id: "0.3_1" });
    sa.addSnapValue({ value: 0.3, id: "0.3_2" });

    const values = sa.getSnappedValues(0.3);

    expect(values).toEqual([
      { value: 0.3, id: "0.3" },
      { value: 0.3, id: "0.3_1" },
      { value: 0.3, id: "0.3_2" },
    ]);

    expect(sa.getSnappedValues(0.44)).toEqual([]);
  });

  it("SnapAxis add-delete SnapValue - 01", () => {
    const sa = new SnapAxis();

    const m = sa.getSnapValueManager()

    {
      const snapValue = { value: 1, id: "1" }
      sa.addSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeTruthy();    // 1
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy(); // 1
    }

    {
      const snapValue = { value: 2, id: "2" }
      sa.addSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeTruthy(); // 2
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy(); // 2
    }

    {
      const snapValue = { value: 3, id: "3" }
      sa.addSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeTruthy(); // 3
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy(); // 3
    }

    {
      const snapValue = { value: 4, id: "4" }
      sa.addSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeTruthy(); // 4
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy(); // 4
    }

    {
      const snapValue = { value: 4, id: "5" }
      sa.addSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeTruthy(); // 5
      expect(sa.getSnappedValues(snapValue.value).length).toBe(2);
      expect(m.has(snapValue.value)).toBeTruthy(); // 5
    }

    {
      const snapValue = { value: 3, id: "6" }
      sa.addSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeTruthy(); // 6
      expect(sa.getSnappedValues(snapValue.value).length).toBe(2);
      expect(m.has(snapValue.value)).toBeTruthy(); // 6
    }

    {
      const snapValue = { value: 1, id: "1" }
      sa.deleteSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeFalsy();    // 1 delete
      expect(sa.getSnappedValues(snapValue.value).length).toBe(0);
      expect(m.has(snapValue.value)).toBeFalsy(); // 1 delete
    }

    {
      const snapValue = { value: 2, id: "2" }
      sa.deleteSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeFalsy(); // 2 toBeFalsy
      expect(sa.getSnappedValues(snapValue.value).length).toBe(0);
      expect(m.has(snapValue.value)).toBeFalsy(); // 2 toBeFalsy
    }

    {
      const snapValue = { value: 3, id: "3" }
      sa.deleteSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeTruthy(); // 3 toBeFalsy
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy(); // 3 toBeFalsy
    }

    {
      const snapValue = { value: 4, id: "4" }
      sa.deleteSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeTruthy(); // 4 toBeTruthy
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy(); // 4 toBeTruthy
    }

    {
      const snapValue = { value: 4, id: "5" }
      sa.deleteSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeFalsy(); // 5
      expect(sa.getSnappedValues(snapValue.value).length).toBe(0);
      expect(m.has(snapValue.value)).toBeFalsy(); // 5
    }

    {
      const snapValue = { value: 3, id: "6" }
      sa.deleteSnapValue(snapValue);
      expect(sa.hasValue(snapValue.value)).toBeFalsy(); // 6
      expect(sa.getSnappedValues(snapValue.value).length).toBe(0);
      expect(m.has(snapValue.value)).toBeFalsy(); // 6
    }

  });

  it("SnapAxis add-delete SnapValues - 01", () => {
    const sa = new SnapAxis();

    const m = sa.getSnapValueManager()

    const snapValues = [
      { value: 1, id: "1" },
      { value: 2, id: "2" },
      { value: 3, id: "3" },
      { value: 4, id: "4" },
      { value: 4, id: "5" },
      { value: 3, id: "6" },
    ];

    sa.addSnapValues(snapValues);

    {
      const snapValue = snapValues[0]
      expect(sa.hasValue(snapValue.value)).toBeTruthy();    // 1
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy(); // 1
    }

    {
      const snapValue = snapValues[1]
      expect(sa.hasValue(snapValue.value)).toBeTruthy(); // 2
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy(); // 2
    }

    {
      const snapValue = snapValues[4]
      expect(sa.hasValue(snapValue.value)).toBeTruthy(); // 5
      expect(sa.getSnappedValues(snapValue.value).length).toBe(2);
      expect(m.has(snapValue.value)).toBeTruthy(); // 5
    }

    {
      const snapValue = snapValues[5]
      expect(sa.hasValue(snapValue.value)).toBeTruthy(); // 6
      expect(sa.getSnappedValues(snapValue.value).length).toBe(2);
      expect(m.has(snapValue.value)).toBeTruthy(); // 6
    }

    sa.deleteSnapValues(snapValues);

    {
      const snapValue = snapValues[0]
      expect(sa.hasValue(snapValue.value)).toBeFalsy();    // 1 delete
      expect(sa.getSnappedValues(snapValue.value).length).toBe(0);
      expect(m.has(snapValue.value)).toBeFalsy(); // 1 delete
    }

    {
      const snapValue = snapValues[1]
      expect(sa.hasValue(snapValue.value)).toBeFalsy(); // 2 toBeFalsy
      expect(sa.getSnappedValues(snapValue.value).length).toBe(0);
      expect(m.has(snapValue.value)).toBeFalsy(); // 2 toBeFalsy
    }

    {
      const snapValue = snapValues[2]
      expect(sa.hasValue(snapValue.value)).toBeFalsy(); // 5
      expect(sa.getSnappedValues(snapValue.value).length).toBe(0);
      expect(m.has(snapValue.value)).toBeFalsy(); // 5
    }

    {
      const snapValue = snapValues[3]
      expect(sa.hasValue(snapValue.value)).toBeFalsy(); // 6
      expect(sa.getSnappedValues(snapValue.value).length).toBe(0);
      expect(m.has(snapValue.value)).toBeFalsy(); // 6
    }
  });

  it("SnapAxis update - 01", () => {
    const sa = new SnapAxis();

    const m = sa.getSnapValueManager()

    const snapValues = [
      { value: 1, id: "1" },
      { value: 2, id: "2" },
      { value: 3, id: "3" },
      { value: 3, id: "4" },
    ];

    sa.addSnapValues(snapValues);

    {
      const snapValue = snapValues[0]
      expect(sa.hasValue(snapValue.value)).toBeTruthy();
      expect(sa.has(snapValue.id)).toBeTruthy();
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy();
    }

    sa.addSnapValue({
      value: 111,
      id: "1",
    })

    {
      const snapValue = snapValues[0]
      expect(sa.hasValue(snapValue.value)).toBeFalsy();
      expect(sa.has(snapValue.id)).toBeTruthy();
      expect(sa.getSnappedValues(snapValue.value).length).toBe(0);
      expect(m.has(snapValue.value)).toBeFalsy();
    }

    {
      const snapValue = {
        value: 111,
        id: "1",
      }
      expect(sa.hasValue(snapValue.value)).toBeTruthy();
      expect(sa.has(snapValue.id)).toBeTruthy();
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy();
    }

  });

  it("SnapAxis update - 02", () => {
    const sa = new SnapAxis();

    const m = sa.getSnapValueManager()

    const snapValues = [
      { value: 1, id: "1" },
      { value: 2, id: "2" },
      { value: 3, id: "3" },
      { value: 3, id: "4" },
    ];

    sa.addSnapValues(snapValues);

    {
      const snapValue = snapValues[0]
      expect(sa.hasValue(snapValue.value)).toBeTruthy();
      expect(sa.has(snapValue.id)).toBeTruthy();
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy();
    }

    sa.updateSnapValue({
      value: 111,
      id: "1",
    })

    {
      const snapValue = snapValues[0]
      expect(sa.hasValue(snapValue.value)).toBeFalsy();
      expect(sa.has(snapValue.id)).toBeTruthy();
      expect(sa.getSnappedValues(snapValue.value).length).toBe(0);
      expect(m.has(snapValue.value)).toBeFalsy();
    }

    {
      const snapValue = {
        value: 111,
        id: "1",
      }
      expect(sa.hasValue(snapValue.value)).toBeTruthy();
      expect(sa.has(snapValue.id)).toBeTruthy();
      expect(sa.getSnappedValues(snapValue.value).length).toBe(1);
      expect(m.has(snapValue.value)).toBeTruthy();
    }

  });

  it("SnapAxis checkSnapped - 01", () => {
    const sa = createSnapAxis02();
    expect(sa.checkSnapped(0.1 + 0.2)).toBeFalsy();

    const svm = sa.getSnapValueManager();
    svm.getValues().forEach((value) => {
      expect(sa.checkSnapped(value)).toBeTruthy();
    });

  })

  it("SnapAxis snapToNearest - 01", () => {
    const sa = new SnapAxis()

    expect(sa.snapToNearest(10)).toEqual({
      snapped: false,
      value: 10,
    });

  });

  it("SnapAxis snapToNearest - 02", () => {
    const sa = new SnapAxis({
      snapValues: [
        { value: -10, id: "1" },
        { value: 20, id: "2" },
      ]
    })

    expect(sa.snapToNearest(50)).toEqual({
      snapped: true,
      value: 20,
    });

    expect(sa.snapToNearest(-30)).toEqual({
      snapped: true,
      value: -10,
    });

  });

  it("SnapAxis snapToNearest - 03", () => {
    const sa = new SnapAxis({
      snapValues: [
        { value: -10, id: "1" },
        { value: 20, id: "2" },
      ]
    })

    expect(sa.snapToNearest(2)).toEqual({
      snapped: true,
      value: -10,
    });

    expect(sa.snapToNearest(10)).toEqual({
      snapped: true,
      value: 20,
    });

    expect(sa.snapToNearest(5)).toEqual({
      snapped: true,
      value: 20,
    });

  });

  it("SnapAxis snapToNearest - 04", () => {
    const sa = new SnapAxis({
      snapValues: [
        { value: -10, id: "1" },
        { value: 20, id: "2" },
      ]
    })

    expect(sa.snapToNearest(20)).toEqual({
      snapped: true,
      value: -10,
    });

    expect(sa.snapToNearest(-10)).toEqual({
      snapped: true,
      value: 20,
    });

  });

  it("SnapAxis snapToNearestIfNeeded - 04", () => {
    const sa = new SnapAxis({
      snapValues: [
        { value: -10, id: "1" },
        { value: 20, id: "2" },
        { value: 30, id: "3" },
      ]
    })

    expect(sa.snapToNearestIfNeeded(20)).toEqual({
      snapped: false,
      value: 20,
    });

    expect(sa.snapToNearestIfNeeded(21)).toEqual({
      snapped: true,
      value: 20,
    });

    expect(sa.snapToNearestIfNeeded(-10)).toEqual({
      snapped: false,
      value: -10,
    });

  });

  it("SnapAxis snapToNearest with distance", () => {
    const sa = new SnapAxis({
      snapValues: [
        { value: -30, id: "-3" },
        { value: -10, id: "1" },
        { value: 20, id: "2" },
        { value: 40, id: "3" },
      ]
    })

    expect(sa.snapToNearest(30, {
      distance: 5,
    })).toEqual({
      snapped: false,
      value: 30,
    });

    expect(sa.snapToNearest(31, {
      distance: 25,
    })).toEqual({
      snapped: true,
      value: 40,
    });

    expect(sa.snapToNearest(1, {
      distance: 25,
    })).toEqual({
      snapped: true,
      value: -10,
    });

    expect(sa.snapToNearest(-19, {
      distance: 5,
    })).toEqual({
      snapped: false,
      value: -19,
    });

    expect(sa.snapToNearest(-20, {
      distance: 30,
    })).toEqual({
      snapped: true,
      value: -10,
    });

    expect(sa.snapToNearest(-200, {
      distance: 30,
    })).toEqual({
      snapped: false,
      value: -200,
    });

    expect(sa.snapToNearest(200, {
      distance: 30,
    })).toEqual({
      snapped: false,
      value: 200,
    });

  });

  it("SnapAxis snapToNearest with direction - 01", () => {
    const sa = new SnapAxis({
      snapValues: [
        { value: -30, id: "-3" },
        { value: -10, id: "1" },
        { value: 20, id: "2" },
        { value: 40, id: "3" },
      ]
    })

    expect(sa.snapToNearest(44, {
      direction: SnapDirection.NEXT
    })).toEqual({
      snapped: false,
      value: 44,
    });

    expect(sa.snapToNearest(44, {
      direction: SnapDirection.PREV
    })).toEqual({
      snapped: true,
      value: 40,
    });

    expect(sa.snapToNearest(-44, {
      direction: SnapDirection.PREV
    })).toEqual({
      snapped: false,
      value: -44,
    });

    expect(sa.snapToNearest(-44, {
      direction: SnapDirection.NEXT
    })).toEqual({
      snapped: true,
      value: -30,
    });

    expect(sa.snapToNearest(19, {
      direction: SnapDirection.NEXT
    })).toEqual({
      snapped: true,
      value: 20,
    });

    expect(sa.snapToNearest(19, {
      direction: SnapDirection.PREV
    })).toEqual({
      snapped: true,
      value: -10,
    });

  });

  it("SnapAxis snapToNearest with direction - 02", () => {
    const sa = new SnapAxis({
      snapValues: [
        { value: -30, id: "-3" },
        { value: -10, id: "1" },
        { value: 20, id: "2" },
        { value: 40, id: "3" },
      ]
    })

    expect(sa.snapToNearest(44, {
      direction: SnapDirection.NEXT,
      distance: 2
    })).toEqual({
      snapped: false,
      value: 44,
    });

    expect(sa.snapToNearest(44, {
      direction: SnapDirection.PREV,
      distance: 2
    })).toEqual({
      snapped: false,
      value: 44,
    });

    expect(sa.snapToNearest(-44, {
      direction: SnapDirection.PREV,
      distance: 2
    })).toEqual({
      snapped: false,
      value: -44,
    });

    expect(sa.snapToNearest(-44, {
      direction: SnapDirection.NEXT,
      distance: 2
    })).toEqual({
      snapped: false,
      value: -44,
    });

    expect(sa.snapToNearest(19, {
      direction: SnapDirection.NEXT,
      distance: 2
    })).toEqual({
      snapped: true,
      value: 20,
    });

    expect(sa.snapToNearest(19, {
      direction: SnapDirection.PREV,
      distance: 2
    })).toEqual({
      snapped: false,
      value: 19,
    });

  });

});
