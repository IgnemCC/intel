function squeezer(database, input) {}

class Reducer {
  constructor(database) {
    this.squeeze = input => {
      squeezer(database, input);
    };

    this.get = () => {};
    this.getRecent = () => {};
  }
}

export { Reducer };

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
