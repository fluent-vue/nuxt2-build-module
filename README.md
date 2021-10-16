# @fluent-vue/nuxt2-build-module

This is [fluent-vue](https://github.com/demivan/fluent-vue) build module for Nuxt 2.

## What does it do?

* Adds a `fluent-vue-loader` to support `<fluent>` custom blocks in SFC files
* Adds a `raw-loader` to handle `.ftl` files
* Enables SSR support for `v-t` directive

> NOTE: When using v-t directive with v-bind directive, make sure to write v-t directive second. v-bind will clear all attributes added by v-t directive otherwise. This is a limitation of Vue 2 compiler.

## Instalation

Add this module to your dev dependencies:

```sh
pnpm add @fluent-vue/nuxt2-build-module -D
```

Add build module to your Nuxt 2 config.

```js
{
  // ...
  buildModules: [
    '@fluent-vue/nuxt2-build-module'
  ],
  // ...
}
```
