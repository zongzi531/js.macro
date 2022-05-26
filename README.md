# js.macro

Macro in JavaScript powered by Babel.

**This is an experimental project, do not use in production.**

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

## Install

```bash
yarn add @zong/js.macro
```

## Use

### define

```ts
import { define } from '@zong/js.macro'

define`
  @a:1;
  @b:2;
`
```

```ts
// Compiled
const a = 1;
const b = 2;
```
