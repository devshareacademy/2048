export class Tile {
  #value: number;
  #wasMerged: boolean;

  constructor(value: number) {
    this.#value = value;
    this.#wasMerged = false;
  }

  get value(): number {
    return this.#value;
  }

  set value(val: number) {
    this.#value = val;
  }

  get wasMerged(): boolean {
    return this.#wasMerged;
  }

  set wasMerged(value: boolean) {
    this.#wasMerged = value;
  }
}
