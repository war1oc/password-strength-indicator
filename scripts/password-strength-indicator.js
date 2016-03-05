(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name ngPasswordApp.directive:passwordStrengthIndicator
   * @description
   * Different color showing the strength of a given password
   */
  angular.module('ngPasswordApp', [])
    .directive('passwordStrengthIndicator',passwordStrengthIndicator);

    function passwordStrengthIndicator() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs, ngModel) {

                var strength = {
                    measureStrength: function (p) {
                        var _passedMatches = 0;
                        var _regex = /[$@&+#-/:-?{-~!"^_`\[\]]/g;
                        if (/[a-z]+/.test(p)) {
                            _passedMatches++;
                        }
                        if (/[A-Z]+/.test(p)) {
                            _passedMatches++;
                        }
                        if (_regex.test(p)) {
                            _passedMatches++;
                        }
                        return _passedMatches;
                    }
                };

                var indicator = element.children();
                var dots = Array.prototype.slice.call(indicator.children());
                var weakest = dots.slice(-1)[0];
                var weak = dots.slice(-2);
                var strong = dots.slice(-3);
                var strongest = dots.slice(-4);

                element.after(indicator);

                var listener = scope.$watch('ngModel', function (newValue) {
                    angular.forEach(dots, function (el) {
                        el.style.backgroundColor = '#EDF0F3';
                    });
                    if (ngModel.$modelValue) {
                        var c = strength.measureStrength(ngModel.$modelValue);
                        if (ngModel.$modelValue.length > 7 && c > 2) {
                            angular.forEach(strongest, function (el) {
                                el.style.backgroundColor = '#039FD3';
                            });
                       
                        } else if (ngModel.$modelValue.length > 5 && c > 1) {
                            angular.forEach(strong, function (el) {
                                el.style.backgroundColor = '#72B209';
                            });
                        } else if (ngModel.$modelValue.length > 3 && c > 0) {
                            angular.forEach(weak, function (el) {
                                el.style.backgroundColor = '#E09015';
                            });
                        } else {
                            weakest.style.backgroundColor = '#D81414';
                        }
                    }
                });

                scope.$on('$destroy', function () {
                    return listener();
                });
            },
            template: '<span id="password-strength-indicator"><span></span><span></span><span></span><span></span></span>'
        };
    }
})();

