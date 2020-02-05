import { Database } from "./database";
import { Reducer as SampleReducer } from "./sample.js";

class Reducer {
  constructor() {
    let database = new Database("Developer");
    this.sample = new SampleReducer(database);

    this.get = () => {};
    this.getRecent = () => {};
    this.getBySource = source => {};
  }
}

export { Reducer };

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
