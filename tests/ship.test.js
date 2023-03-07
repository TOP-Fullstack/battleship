import { Ship } from "./battleship";

let newShip = Ship(4);

it("should create a new ship object", () => {
  expect(newShip).toBeInstanceOf(Object);
});

it("should have a length of four", () => {
  expect(newShip.length).toBe(4);
});

it("should contain boolean called sunk set to false", () => {
  expect(newShip.sunk).toBe(false);
});

it("should contain a property named hits set to 0", () => {
  expect(newShip.hits).toBe(0);
});

it("should sink the ship", () => {
  newShip = Ship(2);
  newShip.hit();
  newShip.hit();
  let sunken = newShip.isSunk();
  expect(sunken).toBe(true);
});

it("should not sink the ship", () => {
  newShip = Ship(2);
  newShip.hit();
  let sunken = newShip.isSunk();
  expect(sunken).toBe(false);
});
