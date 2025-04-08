<div align="center">
<img src=".github/six-dropzone.svg" width="400">
<p align="center">6 Dropzone support for Nuxt 3</p>
</div>


<br>

[![npm version](https://img.shields.io/npm/v/six-dropzone/latest.svg?style=flat-square&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/six-dropzone)
![GitHub License][license]
[![npm downloads](https://img.shields.io/npm/dt/six-dropzone.svg?style=flat-square&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/six-dropzone)
[![Nuxt][nuxt-src]][nuxt-href]
[![Static Badge](https://img.shields.io/badge/-%E2%99%A5%20Sponsors-ec5cc6?style=flat-square)](https://github.com/sponsors/4sllan)

[Demo online](https://codesandbox.io/p/sandbox/six-dropzone-forked-mtmwt7)


---

#### Table of Content

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
    * [Props](#props)
    * [Events](#events)
    * [Slots](#slots)

## Features

## Demo

[![view six-dropzone](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/six-dropzone-forked-mtmwt7)

## Setup

## Installation

> six-dropzone for Nuxt3 applications.

```sh
npx nuxi@latest module add six-dropzone
```

### Config

***nuxt.config.js***

``` js
{
     modules: [
        'six-dropzone',
    ]
},

```

## Usage

```html

<script setup>
    const photo = ref()
    const drop = (e) => {
        console.log(e.dataTransfer.files[0], 'drop')
    }
    const selectedFile = (e) => {
        console.log(e, 'change')
    };
    const modelValue = (e) => {
        console.log(e, 'model-value')
    }
</script>
<template>
    <SixDropzone
            v-model="photo"
            @drop.prevent="drop"
            @change="selectedFile"
            @update:model-value="modelValue"
            :accept="['image/png', 'image/jpeg']"
            :drop-mounted="url"
    ></SixDropzone>
</template>
```

## API

### Props

| Name             | Type              | Default Value | Description                                                                                                                                                                              |
|------------------|-------------------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dropMounted`    | `String`          | `undefined`   | The image URL.                                                                                                                                                                           |
| `label`          | `String`          | `Select File` | Sets the button text                                                                                                                                                                     |
| `error-messages` | `String/String[]` | `[]`          | Puts the input in an error state and passes through custom error messages. Will be combined with any validations that occur from the rules prop. This field will not trigger validation. |
| `accept`         | `String/String[]` | `*`           |                                                                                                                                                                                          |

### Events

| Name                | Type     | Description                                               | 
|---------------------|----------|-----------------------------------------------------------|
| `drop`              | `[File]` | drop value of the component.                              |
| `change`            | `[File]` | value of the component.                                   |
| `update:modelValue` | `[File]` | Event that is emitted when the component’s model changes. |

### Slots

| Name      | Description           | 
|-----------|-----------------------|
| `Default` | The default Vue slot. |
| `Icon`    | change or close icons |

## ⚖️ License

Released under [MIT](/LICENSE) by [@4slan](https://github.com/4sllan).


[license]: https://img.shields.io/github/license/4sllan/six-dropzone?style=flat-square&colorA=18181B&colorB=28CF8D

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com
