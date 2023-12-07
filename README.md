# Daisy

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/daisy.svg
[npm]:             https://www.npmjs.com/package/@tadashi/daisy
[ci-img]:          https://github.com/lagden/daisy/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/daisy/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/daisy/badge.svg?branch=main
[coveralls]:       https://coveralls.io/github/lagden/daisy?branch=main


---


Generate the theme's vars for use with [DaisyUI](https://daisyui.com/) library >= 4.


## Install

```
$ npm i @tadashi/daisy
```


## Usage

```html
<script type="module">
  import {convertColorFormat, updateCss} from 'https://unpkg.com/@tadashi/daisy@{version}/src/daisy.js'

  const props = convertColorFormat({
    'primary': 'hsl(56deg 89% 78%)',
    'secondary': '#15106d',
    'accent': '#ea0036',
    'neutral': '#1d1d30',
    'base-100': '#dfe5ec',
    'info': '#97a7f7',
    'success': '#3de189',
    'warning': '#fc9936',
    'error': '#e74671'
  })

  updateCss('[data-theme="punk"]', props)
</script>
```


## Team

[<img src="https://avatars.githubusercontent.com/u/130963?s=390" alt="Lagden" width="90">](https://github.com/lagden)


## Donate ❤️

- BTC: bc1q7famhuj5f25n6qvlm3sssnymk2qpxrfwpyq7g4


## License

MIT © [Thiago Lagden](https://github.com/lagden)
