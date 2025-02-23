import { SnapAxis } from "../src/index";

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
    { value: 30, id: "30" },
    { value: 70, id: "70" },
    { value: 80, id: "80" },
  ];

  return new SnapAxis({
    snapValues,
  });
}

describe("SnapAxis.getSnapGroupUpdater", () => {
  it("getSnapGroupUpdater - 01", () => {
    const saX = createSnapAxis01();

    let pageX = 0;
    const updater = saX.getSnapGroupUpdater([100, 50, 33], pageX);

    let nextPageX = pageX - 1; // [99, 49, 32]
    expect(updater(nextPageX)).toMatchObject({
      values: [97, 47, 30],
      snapped: true,
    });

    nextPageX--; // [98, 48, 31]
    expect(updater(nextPageX)).toMatchObject({
      values: [97, 47, 30],
      snapped: false,
    });

    nextPageX--; // [97, 47, 30]
    expect(updater(nextPageX)).toMatchObject({
      values: [97, 47, 30],
      snapped: false,
    });

    nextPageX--; // [96, 46, 29]
    expect(updater(nextPageX)).toMatchObject({
      values: [97, 47, 30],
      snapped: false,
    });

    nextPageX--; // [95, 45, 28]
    expect(updater(nextPageX)).toMatchObject({
      values: [97, 47, 30],
      snapped: false,
    });

    nextPageX--; // [94, 44, 27]
    expect(updater(nextPageX)).toMatchObject({
      values: [97, 47, 30],
      snapped: false,
    });

    nextPageX--; // [93, 43, 26]
    expect(updater(nextPageX)).toMatchObject({
      values: [97, 47, 30],
      snapped: false,
    });
  });
});
