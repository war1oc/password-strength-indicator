(function() {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name ngPasswordApp.directive:passwordStrengthIndicator
	 * @description
	 * Different color showing the strength of a given password
     * Sets the validity of the model based on a set of options
	 */
	angular.module('ngPasswordApp', [])
		.directive('passwordStrengthIndicator', passwordStrengthIndicator);

	function passwordStrengthIndicator() {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
                ngModel:    '=',
                psiOptions: '='
			},
			link: function(scope, element, attrs, ngModel) {

				// Default options
				var options = {
					lowercase: true,
					uppercase: true,
					number:    true,
					symbol:    false,
					minLength: 6
				};

                if(scope.psiOptions) angular.extend(options, scope.psiOptions);

				function getPattern(option) {
					var pattern;

					switch (option) {
						case 'lowercase':
							pattern = /[a-z]/g;
							break;
						case 'uppercase':
							pattern = /[A-Z]/g;
							break;
						case 'number':
							pattern = /\d/g;
							break;
						case 'symbol':
							pattern = /[$@&+#-/:-?{-~!"^_`\[\]]/g;
							break;
                        default:
                            pattern = /.*/;
					}

					return pattern;
				}

				function setValidity(p) {
					for (var option in options) {
						if (options.hasOwnProperty(option)) {
							if (option === 'minLength') {
								ngModel.$setValidity('minLength', p.length >= options.minLength);
							} else if (option && options[option]) {
								ngModel.$setValidity(option, getPattern(option).test(p));
							}
						}
					}
				}

				function measureStrength(p) {
					var _passedMatches = 0;

					if (getPattern('lowercase').test(p)) {
						_passedMatches++;
					}
					if (getPattern('uppercase').test(p)) {
						_passedMatches++;
					}
					if (getPattern('symbol').test(p)) {
						_passedMatches++;
					}
					if (getPattern('number').test(p)) {
						_passedMatches++;
					}
					if (p.length >= options.minLength) {
						_passedMatches++;
					}

					setValidity(p, options);

					return _passedMatches;
				}

				var indicator = element.children();
				var dots      = Array.prototype.slice.call(indicator.children());
				var weakest   = dots.slice(-1)[0];
				var weak      = dots.slice(-2);
				var strong    = dots.slice(-3);
				var strongest = dots.slice(-4);

				element.after(indicator);

				var listener = scope.$watch('ngModel', function(newValue) {
					angular.forEach(dots, function(el) {
						el.style.backgroundColor = '#EDF0F3';
					});
					if (ngModel.$modelValue) {
						setValidity(ngModel.$modelValue);
						var c = measureStrength(ngModel.$modelValue);
						if (ngModel.$modelValue.length > options.minLength && c > 4) {
							angular.forEach(strongest, function(el) {
								el.style.backgroundColor = '#72B209';
							});

						} else if (ngModel.$modelValue.length > options.minLength && c > 3) {
							angular.forEach(strong, function(el) {
								el.style.backgroundColor = '#039FD3';
							});
						} else if (ngModel.$modelValue.length > options.minLength && c > 2) {
							angular.forEach(weak, function(el) {
								el.style.backgroundColor = '#E09015';
							});
						} else {
							weakest.style.backgroundColor = '#D81414';
						}
					}
				});

				scope.$on('$destroy', function() {
					return listener();
				});
			},
			template: '<span id="password-strength-indicator"><span></span><span></span><span></span><span></span></span>'
		};
	}
})();
