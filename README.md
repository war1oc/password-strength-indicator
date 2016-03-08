# password-strength-indicator
Password strength indicator in an angular directive


## Examples
See `index.html` in the respository.
[Live example] [live-example]
[live-example]: https://sourabhagrawal1900.github.io/

## Usage

1. Bower should add `password-strength-indicator.min.js` to you main file (index.html)

  you can download this by:
  * using bower and running `bower install password-strength-indicator`

  [min]: https://github.com/sourabhagrawal1900/password-strength-indicator/blob/master/scripts/password-strength-indicator.min.js
  [max]: https://github.com/sourabhagrawal1900/password-strength-indicator/blob/master/scripts/password-strength-indicator.js

  In your web page:

  ```html
  <script src="password-strength-indicator/scripts/password-strength-indicator.js"></script>

  ```

2. Add `main.css` to your main file (index.html). 

  ```html
  <link rel="stylesheet" type="text/css" href="styles/main.css"/>
  ```

3. Bower should add `password-strength-indicator` to your main file (index.html). Some of them are not automatically added so you'd better check them.

  ```html
  <script src="bower_components/angular/angular.js"></script>
  <script src="bower_components/password-strength-indicator/scripts/password-strength-indicator.js"></script>

4. Set `ng-password-app` as a dependency in your module
  ```javascript
  var myapp = angular.module('myapp', ['ngPasswordApp'])
  ```

5. Add ng-password-strength directive to the wanted element, example:
  ```html
  <input password-strength-indicator class="form-control" type="password" name="password" placeholder="Password">
  ```

## TODO
Create tests

### v0.0.1
* regex-based and length-based value calculations
