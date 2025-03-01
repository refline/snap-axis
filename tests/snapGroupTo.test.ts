import { SnapAxis } from "../src";

function createSnapAxis01() {
  const snapValues = [
    { value: 40, id: "40" },
    { value: 55, id: "55" },
    { value: 70, id: "70" },
    { value: 80, id: "80" },
  ];

  return new SnapAxis({
    snapValues,
  });
}

describe("snapGroupTo", () => {
  it("snapGroupTo - 01", () => {
    const sp = createSnapAxis01();

    const groupValues = [50, 100, 150];

    {
      const r = sp.snapGroupTo(groupValues, 1, {
        distance: 5,
      });

      expect(r).toEqual({
        values: [55, 105, 155],
        snapped: true,
      });
    }

    {
      const r = sp.snapGroupTo(groupValues, 10, {
        distance: 5,
      });

      expect(r).toEqual({
        values: [60, 110, 160],
        snapped: false,
      });
    }
  });

  it("snapGroupTo - 02", () => {
    const sp = new SnapAxis({
      snapValues: [
        { value: 20, id: "20" },
        { value: 25, id: "25" },
        { value: 30, id: "30" },
        { value: 40, id: "40" },
        { value: 60, id: "60" },
      ],
    });

    const groupValues = [14, 33, 52];

    {
      const r = sp.snapGroupTo(groupValues, 1, {
        distance: 5,
      });

      expect(r).toEqual({
        values: [20, 39, 58],
        snapped: true,
      });
    }

    {
      const r = sp.snapGroupTo([20, 39, 58], 0.5, {
        distance: 5,
      });

      expect(r).toEqual({
        values: [21, 40, 59],
        snapped: true,
      });
    }

    {
      const r = sp.snapGroupTo([21, 40, 59], 0.5, {
        distance: 5,
      });

      expect(r).toEqual({
        values: [22, 41, 60],
        snapped: true,
      });
    }

    {
      const r = sp.snapGroupTo([22, 41, 60], 0.5, {
        distance: 5,
      });

      expect(r).toEqual({
        values: [25, 44, 63],
        snapped: true,
      });
    }

    {
      const r = sp.snapGroupTo([25, 80], 1, {
        distance: 5,
      });

      expect(r).toEqual({
        values: [25, 80],
        snapped: false,
      });
    }
  });
});
