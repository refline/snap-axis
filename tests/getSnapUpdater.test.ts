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

function createSnapAxis02() {
  const snapValues = [
    { value: 20, id: "20" },
    { value: 25, id: "25" },
    { value: 30, id: "30" },
    { value: 35, id: "35" },
  ];

  return new SnapAxis({
    snapValues,
  });
}

describe("SnapAxis.getSnapUpdater", () => {
  it("getSnapUpdater - 01", () => {
    const saX = createSnapAxis01();

    let pageX = 0;
    const updater = saX.getSnapUpdater(100, pageX);

    let nextPageX = pageX - 10; // 90
    expect(updater(nextPageX)).toMatchObject({
      value: 90,
      snapped: false,
    });

    nextPageX = nextPageX - 5; // 85
    expect(updater(nextPageX)).toMatchObject({
      value: 80,
      snapped: true,
    });

    nextPageX = nextPageX - 3; // 82
    expect(updater(nextPageX)).toMatchObject({
      value: 80,
      snapped: false,
    });

    nextPageX = nextPageX - 6; // 76
    expect(updater(nextPageX)).toMatchObject({
      value: 80,
      snapped: false,
    });

    nextPageX = nextPageX - 2; // 74
    expect(updater(nextPageX)).toMatchObject({
      value: 70,
      snapped: true,
    });

    nextPageX = nextPageX + 2; // 76
    expect(updater(nextPageX)).toMatchObject({
      value: 80,
      snapped: true,
    });

    nextPageX = nextPageX - 3; // 73
    expect(updater(nextPageX)).toMatchObject({
      value: 70,
      snapped: true,
    });

    nextPageX = nextPageX - 1; // -72
    expect(updater(nextPageX)).toMatchObject({
      value: 70,
      snapped: false,
    });
  });

  it("getSnapUpdater - 02", () => {
    const saX = createSnapAxis01();

    let pageX = 0;
    const updater = saX.getSnapUpdater(50, pageX);

    let nextPageX = pageX + 10; // 60
    expect(updater(nextPageX)).toMatchObject({
      value: 60,
      snapped: false,
    });

    nextPageX = nextPageX + 5; // 65
    expect(updater(nextPageX)).toMatchObject({
      value: 70,
      snapped: true,
    });

    nextPageX = nextPageX + 3; // 68
    expect(updater(nextPageX)).toMatchObject({
      value: 70,
      snapped: false,
    });

    nextPageX = nextPageX + 6; // 74
    expect(updater(nextPageX)).toMatchObject({
      value: 70,
      snapped: false,
    });

    nextPageX = nextPageX - 2; // 72
    expect(updater(nextPageX)).toMatchObject({
      value: 70,
      snapped: false,
    });

    nextPageX = nextPageX + 3; // 75
    expect(updater(nextPageX)).toMatchObject({
      value: 70,
      snapped: false,
    });

    nextPageX = nextPageX + 1; // 76
    expect(updater(nextPageX)).toMatchObject({
      value: 80,
      snapped: true,
    });
  });

  it("getSnapUpdater - 03", () => {
    const saX = createSnapAxis02();

    let pageX = 0;
    const updater = saX.getSnapUpdater(26, pageX);

    let nextPageX = pageX + 1; // 27
    expect(updater(nextPageX)).toMatchObject({
      value: 30,
      snapped: true,
    });

    nextPageX++; // 28
    expect(updater(nextPageX)).toMatchObject({
      value: 30,
      snapped: false,
    });

    nextPageX++; // 29
    expect(updater(nextPageX)).toMatchObject({
      value: 30,
      snapped: false,
    });

    nextPageX++; // 30
    expect(updater(nextPageX)).toMatchObject({
      value: 30,
      snapped: false,
    });

    nextPageX++; // 31
    expect(updater(nextPageX)).toMatchObject({
      value: 30,
      snapped: false,
    });

    nextPageX++; // 32
    expect(updater(nextPageX)).toMatchObject({
      value: 30,
      snapped: false,
    });

    nextPageX++; // 33
    expect(updater(nextPageX)).toMatchObject({
      value: 35,
      snapped: true,
    });

    nextPageX++; // 34
    expect(updater(nextPageX)).toMatchObject({
      value: 35,
      snapped: false,
    });

    nextPageX++; // 35
    expect(updater(nextPageX)).toMatchObject({
      value: 35,
      snapped: false,
    });

    nextPageX++; // 36
    expect(updater(nextPageX)).toMatchObject({
      value: 35,
      snapped: false,
    });
  });

  it("getSnapUpdater - 04", () => {
    const saX = createSnapAxis02();

    let pageX = 0;
    const updater = saX.getSnapUpdater(31, pageX);

    let nextPageX = pageX - 1; // 30
    expect(updater(nextPageX)).toMatchObject({
      value: 30,
      snapped: true,
    });

    nextPageX--; // 29
    expect(updater(nextPageX)).toMatchObject({
      value: 30,
      snapped: false,
    });

    nextPageX--; // 28
    expect(updater(nextPageX)).toMatchObject({
      value: 30,
      snapped: false,
    });

    nextPageX--; // 27
    expect(updater(nextPageX)).toMatchObject({
      value: 25,
      snapped: true,
    });

    nextPageX--; // 26
    expect(updater(nextPageX)).toMatchObject({
      value: 25,
      snapped: false,
    });

    nextPageX--; // 25
    expect(updater(nextPageX)).toMatchObject({
      value: 25,
      snapped: false,
    });

    nextPageX--; // 24
    expect(updater(nextPageX)).toMatchObject({
      value: 25,
      snapped: false,
    });

    nextPageX--; // 23
    expect(updater(nextPageX)).toMatchObject({
      value: 25,
      snapped: false,
    });

    nextPageX--; // 22
    expect(updater(nextPageX)).toMatchObject({
      value: 20,
      snapped: true,
    });

    nextPageX--; // 21
    expect(updater(nextPageX)).toMatchObject({
      value: 20,
      snapped: false,
    });
  });
});
