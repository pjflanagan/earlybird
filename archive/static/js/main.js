/**
 * Main function onload
 * @author pjflanagan
 * @method main
 */
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
});

/**
 * Main angular app earlybird.
 * @author pjflanagan
 */
// https://stackoverflow.com/questions/43933327/python-flask-force-reload-cached-js-files
angular.module('earlybird', ['ngSanitize']).config(function ($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
}).factory('State', ['$rootScope', '$http', function ($rootScope, $http) { //call this Global instead

	const state = {
		showingType: TYPE.SCHEDULE,
		loading: false
	};

	/**
	 * Sets the state loading appropriatley and 
	 * broadcasts load to be used by other controllers
	 * @method loader
	 * @param {bool} loading boolean representing if the page is loading something
	 */
	var loading = function (loading) {
		state.loading = loading;
		$rootScope.$broadcast('load', {
			loading: loading,
			percent: (loading) ? Math.floor(Math.random() * 30) + 40 : 100
		});
	}

	/**
	 * Broadcasts a popup to the headercontroller
	 * @param {string} type 
	 * @param {string} message 
	 */
	const popup = function (type, message) {
		$rootScope.$broadcast('popup', { type, message });
	}

	/**
	 * Validates a tweet based on type, text and date
	 * TODO: separate this into a showError and function too
	 * @param {string} type 
	 * @param {string} text 
	 * @param {Date} date 
	 */
	const validate = function ({ includeDate, type, tweet }) {
		const { text, date } = tweet;
		var now = new Date();
		if (state.loading) { //disable actions while loading
			popup(ALERT.WARNING, 'Please wait.');
			return false;
		}
		else if (text.length === 0) {
			popup(ALERT.WARNING, 'Tweet contains no text.');
			return false;
		}
		else if (type === TYPE.SCHEDULE && !includeDate) {
			popup(ALERT.WARNING, 'Tweet must have a date set.');
			return false;
		}
		else if ((type === TYPE.SCHEDULE || type === TYPE.SEND) && text.length > 140) {
			popup(ALERT.WARNING, 'Tweet is too long to be sent or scheduled.');
			return false;
		}
		else if (type === TYPE.SCHEDULE && (date === TYPE.UNDATED || date.getTime() < now.getTime())) {
			popup(ALERT.WARNING, 'Tweet cannot be scheduled for an invalid date.');
			return false;
		}
		return true;
	}

	const call = function ({ output, resource, success, error }) {
		loading(true);
		$http(resource)
			.then(({ data }) => {
				console.info(resource.url, { data });
				if (output) popup(ALERT.SUCCESS, data.message);
				success(data);
			}, ({ data }) => {
				console.error(resource.url, { data });
				if (output) popup(ALERT.ERROR, data.message);
				error(data);
			})
			.then(() => {
				loading(false);
			});
	}

	return {
		setShowingType: function (type) {
			state.showingType = type;
		},
		getShowingType: function () {
			return state.showingType;
		},
		popup,
		validate,
		loading,
		call
	};
}]);
