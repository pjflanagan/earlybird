angular.module('earlybird').controller('headerController', ['$scope', '$rootScope', '$timeout', 'State', function ($scope, $rootScope, $timeout, State) {
	$scope.showing = TYPE.SCHEDULE;

	/**
	 * @deprecated
	 * Initializes the header 
	 * @method init
	 */
	$scope.init = function () {
		//State.popup(ALERT.INFO, 'Icons designed by Dave Gandy from Flaticon');
	}

	/**
	 * Makes the loading bar load
	 * @event load
	 * @param {Object} event
	 * @param {Object} args contains the percent
	 */
	$scope.$on('load', function (event, args) {
		$('#loading').css({
			height: '2px',
			width: `${args.percent}%`
		});
		if (!args.loading) {
			// a better way to do this would be apply a css class 
			// that has this as an annimation
			$timeout(function () { $('#loading').css('height', '0px') }, 1000);
			$timeout(function () { $('#loading').css('width', '0%') }, 1400);
		}

	});

	/**
	 * Makes message popup for 3 seconds, called from the rootState in State
	 * @event popup
	 * @param {Object} event
	 * @param {Object} args contains the message and the type
	 */
	$scope.$on('popup', function (event, args) {
		console.log(`${args.type}: ${args.message}`);
		$('#popup').hide();
		$('#popup').text(args.message); //TODO: ng-bind
		$('#popup').removeClass();
		$('#popup').addClass(`alert alert-${args.type}`); //TODO: ng-class
		$('#popup').show().delay(2400).fadeOut();
	});

	/**
	 * Makes the page display the specified type
	 * @param {string} type is either SCHEDULE or DRAFT
	 */
	$scope.changeShowingType = function (type) {
		State.setShowingType(type);
		$scope.showing = type;
	}
}]);