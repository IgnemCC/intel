//> Reducer
// Contains Reducer and database models
import { Reducer, models } from "./reducer";
//> snek-client
// Contains a interface for the snek-client
//import * as client from "./client";
import { Client } from "snek-client";
//> Utils
// Contains the github utils
import * as github from "./utils/github";

//> Classes
/**
 * The intel. A place where everything becomes one thing.
 * By using the snek-client, utils and the brand new snek-reducer we
 * created a new way of life.
 * Some might say that this is not perfect in every way. But they are just fools.
 * We know every single mistake, every single scratch.
 * Although we can frankly say, we love it!
 */
class Intel {
  constructor() {
    this.reducer = new Reducer();
    // this.snekclient = new Client({
    //   url: "https://engine.snek.at/api/graphiql",
    //   type: "graphql",
    //   headers: {}
    // });
    // this.snekclient.session.begin();
    /**
     * Github client
     */
    let githubclient = new Client({
      url: "https://api.github.com/graphql",
      type: "graphql",
      headers: {}
    });
    let ghs = githubclient.session;
    console.log(githubclient)

    this.append = async (source) => {
      if (source.platform.toLowerCase() === "github") {
        // Init github client
        //let c = new client.Github(source.authorization);

        let profileData = await ghs.send(
          source.authorization,
          github.queries.profile(),
          {
            username: source.user
          }
        );

        // let profileData = await c.get(github.queries.profile(), {
        //   username: source.user
        // });

        let calendarData = await ghs.send(
          source.authorization,
          github.queries.calendar(profileData.data.user),
          {
            username: source.user
          }
        );
        // let calendarData = await c.get(
        //   github.queries.calendar(profileData.data.user),
        //   {
        //     username: source.user
        //   }
        // );
        const data = {
          profile: profileData.data.user,
          calendar: calendarData.data.user
        };
        console.log(data)

        github.converter.run(models, data);
      }
    };
    // this.appendList = async (sourceList) => {
    //   const errorList = [];

    //   async function retry(maxRetries, fn, params) {
    //     return await fn(...params).catch(() => {
    //       if (maxRetries <= 0) {
    //         throw new Error(
    //           `Could not fetch data after ${maxRetries} retries... Please try again later!`
    //         );
    //       }
    //       return retry(maxRetries - 1, fn, params);
    //     });
    //   }

    //   for (let index = 0; index < sourceList.length; index++) {
    //     const source = sourceList[index];
    //     const maxRetries = 5;

    //     await retry(maxRetries, this.append, [source]).catch(() => {
    //       errorList.push(source);
    //     });
    //   }

    //   if (errorList.length > 0) {
    //     throw errorList;
    //   }
    // };
    // this.get = () => {
    //   return reducer.get();
    // };
  }
}

console.log("dasd");
let l = new Intel();
l.append({
  user: "schettn",
  platform: "github",
  authorization: "token 1109d533eec6cbbce9d801131dcfc5583fbc4be1",
}).then(res => {
  console.log(l.reducer.get())
})

export { Intel };

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
