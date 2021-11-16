function getInitDate() {
	var now = new Date();
	now.setSeconds(0, 0);
	return new Date(now.getTime() + (1000 * 60 * 30));
};

angular.module('earlybird')
	.controller('composeController', ['$scope', '$rootScope', 'State', function ($scope, $rootScope, State) {
		$scope.MAX_TWEET_LENGTH = MAX_TWEET_LENGTH; // this is for the html to be able to access this
		$scope.actions = {
			draft: false,
			schedule: false,
			send: false,
			cancel: false,
			includeDate: false
		};

		$scope.init = function () {
			$scope.reset();
		}

		// -------------------------------------------------------------------------
		// FEEDBACK
		// -------------------------------------------------------------------------

		/**
		 * Disables buttons while loading
		 * @event load
		 * @param {Object} args contains boolean loading and percent
		 */
		$rootScope.$on('load', function (event, args) {
			if (args.loading) {
				$scope.actions.draft = false;
				$scope.actions.schedule = false;
				$scope.actions.send = false;
				$scope.actions.cancel = false;
				return;
			}
			$scope.typeHandler();
		});

		/**
		 * Recolors icons and changes options, prevents typing if too long
		 * @method typeHandler
		 */
		$scope.typeHandler = function () {
			// actions
			if ($scope.tweet.text.length === 0) {
				$scope.actions.draft = false;
				$scope.actions.schedule = false;
				$scope.actions.send = false;
				$scope.actions.cancel = false;
			}
			else {
				$scope.actions.draft = true;
				$scope.actions.cancel = true;
				if ($scope.tweet.text.length <= MAX_TWEET_LENGTH) {
					$scope.actions.send = true;
					if ($scope.actions.includeDate) $scope.actions.schedule = true;
					else $scope.actions.schedule = false;
				}
				else {
					$scope.actions.send = false;
					$scope.actions.schedule = false;
				}
			}
			// TODO: if >= MAX_DRAFT_LENGTH stop them from typing
		}

		/**
		 * Changes wether or not the date is included
		 * @method dateToggle
		 */
		$scope.dateToggle = function () {
			$scope.actions.includeDate = !$scope.actions.includeDate;
			$scope.typeHandler();
		}

		/**
		 * Resets the compose
		 * @method reset
		 */
		$scope.reset = function () {
			$scope.tweet = new Tweet({ date: getInitDate() });
			$scope.originalTweet = new Tweet({});
			$scope.typeHandler();
		}

		/**
		 * Cancels the compose
		 * @method cancel
		 */
		$scope.cancel = function () {
			if ($scope.tweet._id != TYPE.NOID) $rootScope.$broadcast('placeTweet', $scope.originalTweet);
			$scope.reset();
		}

		/**
		 * Places an existing tweet to be edited
		 * @event editTweet
		 * @param {Tweet} tweet 
		 */
		$rootScope.$on('editTweet', function (event, tweet) {
			$scope.cancel();
			$scope.actions.includeDate = (tweet.date === TYPE.UNDATED) ? false : true;
			$scope.tweet = tweet;
			$scope.tweet.date = (tweet.date === TYPE.UNDATED) ? new Date(getInitDate()) : tweet.date;
			$scope.originalTweet = tweet;
			$scope.typeHandler();
		});

		/**
		 * Sends the tweet.
		 * @method send
		 */
		$scope.send = function () {
			const tweet = $scope.tweet;
			if (!State.validate({ type: TYPE.SEND, tweet }) || tweet.hasEmoji()) {
				return;
			}
			State.call({
				output: true,
				resource: API.send_text({
					text: $scope.tweet.text
				}),
				success: ({ data }) => {
					$scope.reset();
				},
				error: () => { }
			});
		}

		/**
		 * Create the tweet.
		 * @method create
		 */
		$scope.create = function (type) {
			const tweet = $scope.tweet;
			tweet.type = type;
			if (!State.validate({ includeDate: $scope.actions.includeDate, type, tweet }) || tweet.hasEmoji()) {
				return;
			}
			State.call({
				output: true,
				resource: API.create({
					tweet: $scope.tweet,
					includeDate: $scope.actions.includeDate
				}),
				success: ({ data }) => {
					const newTweet = new Tweet(data);
					newTweet.set();
					$rootScope.$broadcast('placeTweet', newTweet);
					$scope.reset();
				},
				error: () => { }
			});
		}

	}]);
	// .directive('textFormat', function () {
	// 	console.log('directive');
	// 	return {
	// 		template: '{{tweetText}} + typing!' TODO: this will be fore preventing emoji or something
	// 	};
	// });