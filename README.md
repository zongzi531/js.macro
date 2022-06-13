# js.macro

Macro in JavaScript powered by Babel.

**This is an experimental project, do not use in production.**

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

## Install

```bash
yarn add @zong/js.macro
```

## Before use

### Adding the plugin to your config

#### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["macros"]
}
```

[more](https://github.com/kentcdodds/babel-plugin-macros/blob/main/other/docs/user.md#adding-the-plugin-to-your-config)

## Use

### define

#### Base

```ts
import { define } from '@zong/js.macro'

define`
  @a:1;
  @b:2;
  @c:'cde';
  @d:"def";
  @e:true;
  @f:false;
`
```

```ts
// Compiled
const a = 1;
const b = 2;
const c = "cde";
const d = "def";
const e = true;
const f = false;
```

#### Advanced

```ts
import { define } from '@zong/js.macro'

const var1 = 2

define`
  @va:${1};
  @vb:${var1};
`
```

```ts
// Compiled
const var1 = 2;
const va = 1;
const vb = var1;
```
