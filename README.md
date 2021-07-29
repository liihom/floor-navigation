# @autots/floor-navigation

> Thanks to [Floornav](https://github.com/athm-fe/floornav)

A floor navigation component based on typescript and vanilla js.

## Features

+ typescript features & vanilla js  

## Installing

```
$ npm install @autots/floor-navigation -S
```

Using yarn:

```
$ yarn add @autots/floor-navigation
```

## Example

### layouts

``` html
<div id="floornav">
  <a href="#floor1">1楼</a>
  <a href="#floor2">2楼</a>
  <a href="#floor3">3楼</a>
  <a href="#floor4">4楼</a>
  <a href="#floor5">5楼</a>
  <a href="#floor6">6楼</a>
</div>

<div class="floor">占位</div>
<div id="floor1" class="floor">这是1楼</div>
<div id="floor2" class="floor">这是2楼</div>
<div id="floor3" class="floor">这是3楼</div>
<div id="floor4" class="floor">这是4楼</div>
<div id="floor5" class="floor">这是5楼</div>
<div id="floor6" class="floor">这是6楼</div>
<div class="floor">占位</div>
```

> **Note:** Please follow the HTML structure strictly： `(#floorcontainer a[href="#(targetId)"])`

### import as a module

```
import Floornav from '@autots/floor-navigation';

// 1. The simplest way
new Floornav();
```

### import as a lib

```
<script src="dist/floor-navigation.browser.min.js"></script>

<script>
  var myFloornav = new AutoTs.Floornav(id, config);
</script>
```

## Config

| key | Description  | Default | Type| Optional|
| :------------ |:---------------|:-----|:----|:---|
| `id` | the id of the floor element | -- | `string` | false |
| `container` | scroll container | `window` | `window` / `string` | true |
| `base`      | baseline  |   `center` | `top`/ `center`/ `bottom` | true |
| `threshold` | threshold  |  0 | `number` | true |
| `scrollOffset` | the offset from baseline |   0 | `number` | true |
| `activeClass` | the active class of the current floor item  | `active` | `string`  | true |
| `showClass` |  class at the floor display      |   `show` | `string` | true |
| `isToggleShow` | Whether the floor disappears with the content  | `true` | `boolean` | true |
| `onNavChange` | the navigation active callback | -- | `function` | true |



## Develop

The **entry** file must be named as `index.ts` and put this file in the `src` root directory.

## Todo