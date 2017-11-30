# \<time-glimpse\>

A glimpse into your time data.

**Description**

`<time-glimpse>` builds glimpses into your time data.

<!---
```
<custom-element-demo>
  <template>
    <style>
      time-glimpse { 
        --time-glimpse-color: green; 
        --time-glimpse-text-color: grey; 
      }
    </style>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="time-glimpse.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<time-glimpse id="demoEl"></time-glimpse>
<script>
  const datetimes = ['2017-08-11T14:17', '2017-08-07T16:00','2017-08-23T15:22', '2017-09-13T14:48'];
  document.getElementById('demoEl').datetimes = datetimes;
</script>
```
-->

**Usage**

Throw an array of datetimes to get back a glimpse into your data.
```html
<time-analysis datetimes="[[datetimes]]"></time-analysis>
```
```js
const datetimes = ['2017-08-11T14:17', '2017-08-07T16:00','2017-08-23T15:22', '2017-09-13T14:48'];
```

Weekdays patterns can be glimpsed at the calendar glimpse: a repeated weekday pattern forms a line.
Time patterns can be glimpsed at the scatter glimpse: a repeated time pattern approaches a line format.
Frequency patterns can be glimpsed both at the calendar and scatter glimpses: every month, twice a week, mostly random.
Expect more glimpses to be added in the future.

**Contributing**

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

**History**

**November 30th**

First version.

**Credits**

Vladimir Bergier Dietrichkeit

**License**

    This software is licensed under the MIT License, quoted below.

    MIT License

    Copyright (c) 2017 Vladimir Bergier

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.