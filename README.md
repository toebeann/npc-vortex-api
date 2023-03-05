<center>

# npc-vortex-api 🛠️

A utility package for npc for Vortex.

[![npm package version](https://img.shields.io/npm/v/@toebean/npc-vortex-api.svg?logo=npm&label&labelColor=222&style=flat-square)](https://npmjs.org/package/@toebean/npc-vortex-api "View npc-vortex-api on npm") [![npm package downloads](https://img.shields.io/npm/dw/@toebean/npc-vortex-api.svg?logo=npm&labelColor=222&style=flat-square)](https://npmjs.org/package/@toebean/npc-vortex-api "View npc-vortex-api on npm") [![typedocs](https://img.shields.io/badge/docs-informational.svg?logo=typescript&labelColor=222&style=flat-square)](https://toebeann.github.io/npc-vortex-api/ "Read the documentation on Github Pages") [![license](https://img.shields.io/github/license/toebeann/npc-vortex-api.svg?logo=open-source-initiative&logoColor=3DA639&color=informational&labelColor=222&style=flat-square)](https://github.com/toebeann/npc-vortex-api/blob/main/LICENSE "View the license on GitHub")

[![pnpm test](https://img.shields.io/github/actions/workflow/status/toebeann/npc-vortex-api/pnpm-test.yml?logo=github&logoColor=aaa&label=npm%20test&labelColor=222&style=flat-square)](https://github.com/toebeann/npc-vortex-api/actions/workflows/pnpm-test.yml "View pnpm test on GitHub Actions") [![publish package](https://img.shields.io/github/actions/workflow/status/toebeann/npc-vortex-api/publish-package.yml?logo=github&logoColor=aaa&label=publish%20package&labelColor=222&style=flat-square)](https://github.com/toebeann/npc-vortex-api/actions/workflows/publish-package.yml "View publish package on GitHub Actions") [![publish docs](https://img.shields.io/github/actions/workflow/status/toebeann/npc-vortex-api/publish-docs.yml?branch=main&logo=github&logoColor=aaa&label=publish%20docs&labelColor=222&style=flat-square)](https://github.com/toebeann/npc-vortex-api/actions/workflows/publish-docs.yml "View publish docs on GitHub Actions")

[![github](https://img.shields.io/badge/source-informational.svg?logo=github&labelColor=222&style=flat-square)](https://github.com/toebeann/npc-vortex-api "View npc-vortex-api on GitHub") [![twitter](https://img.shields.io/badge/follow-blue.svg?logo=twitter&label&labelColor=222&style=flat-square)](https://twitter.com/toebean__ "Follow @toebean__ on Twitter") [![GitHub Sponsors donation button](https://img.shields.io/badge/sponsor-e5b.svg?logo=github%20sponsors&labelColor=222&style=flat-square)](https://github.com/sponsors/toebeann "Sponsor npc-vortex-api on GitHub") [![PayPal donation button](https://img.shields.io/badge/donate-e5b.svg?logo=paypal&labelColor=222&style=flat-square)](https://paypal.me/tobeyblaber "Donate to npc-vortex-api with PayPal")

</center>

## Description

This package exposes a number of utility functions for calling the built-in procedures of npc for Vortex, as well as type information for working with the extension in TypeScript.

## Table of contents

- [npc-vortex-api 🛠️](#npc-vortex-api-️)
  - [Description](#description)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
    - [pnpm](#pnpm)
    - [yarn](#yarn)
    - [npm](#npm)
  - [Usage](#usage)
    - [Registering npc procedures in a Vortex extension](#registering-npc-procedures-in-a-vortex-extension)
    - [Calling external npc procedures from a Vortex extension](#calling-external-npc-procedures-from-a-vortex-extension)
    - [Registering npc procedures in a separate Node.js application](#registering-npc-procedures-in-a-separate-nodejs-application)
    - [Calling Vortex npc procedures from a separate Node.js application](#calling-vortex-npc-procedures-from-a-separate-nodejs-application)
      - [Registered by extensions](#registered-by-extensions)
      - [npc for Vortex built-ins](#npc-for-vortex-built-ins)
    - [Calling npc for Vortex built-ins from a Vortex extension](#calling-npc-for-vortex-built-ins-from-a-vortex-extension)
  - [License](#license)

## Installation

### [pnpm](https://pnpm.io "pnpm is a fast, disk space efficient package manager")

```shell
pnpm add @toebean/npc-vortex-api
```

### [yarn](https://yarnpkg.com "Yarn is a package manager that doubles down as project manager")

```shell
yarn add @toebean/npc-vortex-api
```

### [npm](https://npmjs.com "npm is the package manager for Node.js")

```shell
npm i @toebean/npc-vortex-api
```

## Usage

### Registering npc procedures in a Vortex extension

```ts
import { join } from "path";
import { RegisterNpcApi } from "@toebean/npc-vortex-api";
import { types } from "vortex-api";
import { z } from "zod";

export default main(context: types.IExtensionContext) {
  // always call registerNpcApi from within context.once
  context.once(async () => {
    // apply type information to the registerNpcApi function
    const registerNpcApi: RegisterNpcApi = context.api.ext.registerNpcApi;

    // this is the function which we will expose as an npc procedure
    const callback = Math.sqrt;

    // the path at which we will expose the procedure
    // it is recommended to always namespace your procedures
    // by the name of your extension
    const path = join("myExtensionName", "getSquareRoot");

    // it is recommended to validate the input arguments being
    // sent to your procedure with middleware - in this case
    // we are using Zod to validate the input argument is a number
    const middleware = z.number().parse;

    // now register the npc procedure
    const endpoint = await registerNpcApi?.(path, callback, middleware);
    // endpoint = "vortex\\myExtensionName\\getSquareRoot"

    // the npc procedure will now be callable via npc
    // at the endpoint: vortex\myExtensionName\getSquareRoot

    if (!endpoint) {
        // if endpoint is undefined, this is likely because the user
        // does not have npc for Vortex installed
    }
  });
}
```

- See https://zod.dev for more information on Zod.

### Calling external npc procedures from a Vortex extension

```ts
import { join } from "path";
import { call } from "@toebean/npc";
import { types } from "vortex-api";
import { z } from "zod";

async function getSquareRoot(n: number) {
  const result = await call(join("myNodeApp", "getSquareRoot"), n);
  // we should validate the result matches our expectations,
  // for this purpose we recommend using Zod
  return z.number().parse(result);
}

const getSquareRoot = async (n: number) => {
}z.number().parse(await call(join("myNodeApp", "getSquareRoot"), n));

export default async function main(context: types.IExtensionContext) {
  try {
    const root = await getSquareRoot(64);
    // if the endpoint was available, the input value 64 was
    // acceptable by the procedure at the endpoint,
    // and the output value meets our own validation,
    // then root will now be the result of the externally defined
    // function `myNodeApp\getSquareRoot`: 8
  } catch (error) {
    // if the npc endpoint `myNodeApp\getSquareRoot` is not available,
    // or if our input arguments/output did not pass validation,
    // an error will be thrown, so we should handle that error here
  }
}
```

- See [npc](https://toebeann.github.io/npc) for more information about the [call](https://toebeann.github.io/npc/stable/?page=Function.call) function.
- See https://zod.dev for more information on Zod.

### Registering npc procedures in a separate Node.js application

```ts
import { join } from "path";
import { create } from "@toebean/npc";
import { z } from "zod";

// create an npc procedure which calculates the square root of a
// numeric input value, with middleware which will validate the
// input value is a number using Zod
const npc = create(Math.sqrt, z.number().parse);
await npc.listen(join("myNodeApp", "getSquareRoot"));

// the npc procedure is now available to be called at the endpoint:
// myNodeApp\getSquareRoot
```

- See [npc](https://toebeann.github.io/npc) for more information about the [create](https://toebeann.github.io/npc/stable/?page=Function.create) function.
- See https://zod.dev for more information on Zod.

### Calling Vortex npc procedures from a separate Node.js application

#### Registered by extensions

```ts
import { join } from "path";
import { call } from "@toebean/npc";
import { z } from "zod";

async function getSquareRoot(n: number) {
  const result = await call({
    endpoint: join("vortex", "myExtensionName", "getSquareRoot"),
    input: n,
  });
  // we should validate the result matches our expectations,
  // for this purpose we recommend using Zod
  return z.number().parse(result);
}

(async () => {
  try {
    const root = await getSquareRoot(64);
    // if the endpoint was available, the input value 64 was
    // acceptable by the procedure at the endpoint,
    // and the output value meets our own validation,
    // then root will now be the result of the externally defined
    // function `myNodeApp\getSquareRoot`: 8
  } catch (error) {
    // if the npc endpoint `myNodeApp\getSquareRoot` is not available,
    // or if our input arguments/output did not pass validation,
    // an error will be thrown, so we should handle that error here
  }
})();
```

- See [npc](https://toebeann.github.io/npc) for more information about the [call](https://toebeann.github.io/npc/stable/?page=Function.call) function.
- See https://zod.dev for more information on Zod.

#### npc for Vortex built-ins

npc-vortex-api exposes helper methods to call the built-in npc procedures of npc for Vortex:

```ts
import { inspect } from "util";
import { nexus, vortex } from "@toebean/npc-vortex-api";

(async () => {
  try {
    const currentGame = await vortex.getCurrentGame();

    if (currentGame.id !== "__placeholder") {
      const latest = await nexus.getLatestUpdated({
        input: { gameId: currentGame.id },
      });
      console.log(inspect(latest, false, null, true));
      // prints a list of the latest updated mods on Nexus Mods
      // for the game which the user is currently managing in Vortex
    }
  } catch (error) {
    // handle any errors
  }
})();
```

All of the helper methods use [Zod](https://zod.dev) to validate the output of each function, so you do not need to do this yourself.

Complete listing of all helper methods:

- [Nexus](https://toebeann.github.io/npc-vortex-api/stable/?page=Module.nexus)
- [Vortex](https://toebeann.github.io/npc-vortex-api/stable/?page=Module.vortex)

### Calling npc for Vortex built-ins from a Vortex extension

It is not necessary to use npc to call the npc for Vortex built-ins from a Vortex extension, as they are exposed via the Vortex extension API in the same manner as registerNpcApi:

```ts
import { NexusApi, VortexApi } from "@toebean/npc-vortex-api";
import { types } from "vortex-api";

export default main(context: types.IExtensionContext) {
  // always call Vortex extension API functions from within context.once
  context.once(async () => {
    const nexusApi: NexusApi = context.api.ext.createNexusApi?.();
    const vortexApi: VortexApi = context.api.ext.createVortexApi?.();

    // if vortexApi or nexusApi are undefined,
    // the npc for Vortex extension is likely not installed
    if (vortexApi && nexusApi) {
        try {
          const currentGame = await vortexApi.getCurrentGame();

          if (currentGame.id !== '__placeholder') {
              const latest = await nexus.getLatestUpdated({
                  input: { gameId: currentGame.id },
              });
              // latest now contains a list of the latest updated
              // mods from Nexus Mods for the game which the user
              // is currently managing in Vortex
          }
        } catch (error) {
          // handle any errors here
        }
      }
  });
}
```

All of the built-ins use [Zod](https://zod.dev) to validate the output of each function, so you do not need to do this yourself.

Complete listing of npc for Vortex built-ins:

- [Nexus](https://toebeann.github.io/npc-vortex-api/stable/?page=index.Interface.NexusApi)
- [Vortex](https://toebeann.github.io/npc-vortex-api/stable/?page=index.Interface.VortexApi)

## License

npc-vortex-api is licensed under [MIT](https://github.com/toebeann/npc-vortex-api/blob/main/LICENSE) © 2023 Tobey Blaber.
