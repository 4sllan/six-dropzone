<div align="center">
<img src=".github/six-dropzone.svg" width="200">
</div>
<h1 align="center"> 6 Dropzone</h1>
    <p align="center">6 Dropzone support for Nuxt 3</p>
<br>


<h1>6 Dropzone</h1>
<br>

[![Static Badge](https://img.shields.io/badge/NPM:six-dropzone?style=flat-square&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/six-dropzone)
[![Static Badge](https://img.shields.io/badge/GITHUB:six-dropzone?style=flat-square&colorA=18181B&colorB=28CF8D)](https://github.com/4slanK/six-dropzone)
[![npm version](https://img.shields.io/npm/v/six-dropzone/latest.svg?style=flat-square&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/six-dropzone)
![GitHub License][license]
[![npm downloads](https://img.shields.io/npm/dt/six-dropzone.svg?style=flat-square&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/six-dropzone)
[![Nuxt][nuxt-src]][nuxt-href]
[![Static Badge](https://img.shields.io/badge/-%E2%99%A5%20Sponsors-ec5cc6?style=flat-square)](https://github.com/sponsors/4sllan)



## Installation

> nuxt-dropzone for Nuxt3 applications.

## Quick Start

```sh
npm i six-dropzone
```

```sh
yarn add six-dropzone
```

## Setup

### Installation

Then, add six-dropzone to the modules section of nuxt.config.js:

### Config

***nuxt.config.js***

``` js
{
     modules: [
        'six-dropzone',
    ]
},

```

```html
 <SixDropzone
  @drop.prevent="dropIndex"
  label="selecione o arquivo"
></SixDropzone>
```




## ⚖️ License

Released under [MIT](/LICENSE) by [@4slan](https://github.com/4sllan).


[license]: https://img.shields.io/github/license/4sllan/six-dropzone?style=flat-square&colorA=18181B&colorB=28CF8D

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com
