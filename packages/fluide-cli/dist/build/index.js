// src/commands/build/index.ts
import { Command } from "@oclif/core";
import { build } from "vite";
var Build = class extends Command {
  async run() {
    await build({
      logLevel: "silent"
    });
    this.log("build fluide complete");
  }
};
Build.description = "Say Build";
Build.examples = [
  `$ fluide build
  launch build (./src/commands/build/index.ts)
`
];
Build.flags = {};
Build.args = {};
export {
  Build as default
};