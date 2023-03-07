import { Ship } from "./battleship";

it("should create a new ship object", () => {
  let newShip = Ship(4);
  expect(newShip).toBeInstanceOf(Object);
});

it("should have a length of four", () => {
  let newShip = Ship(4);
  expect(newShip.length).toBe(4);
});

it("should contain boolean called sunk set to false", () => {
  let newShip = Ship(4);
  expect(newShip.sunk).toBe(false);
});

it("should contain a property named hits set to 0", () => {
  let newShip = Ship(4);
  expect(newShip.hits).toBe(0);
});

it("should sink the ship", () => {
  let newShip = Ship(2);
  newShip.hit();
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
});

it("should not sink the ship", () => {
  let newShip = Ship(2);
  newShip.hit();
  expect(newShip.isSunk()).toBe(false);
});
