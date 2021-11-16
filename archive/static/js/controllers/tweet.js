angular.module('earlybird').controller('tweetsController', ['$scope', '$rootScope', '$window', 'State', function ($scope, $rootScope, $window, State) {
	$scope.tweets = [];

	// -------------------------------------------------------------------------
	// TWEETS FUNCTIONS
	// -------------------------------------------------------------------------

	/**
	 * Loads the tweets into the scope
	 * @method initTweets
	 */
	$scope.initTweets = function () {
		State.call({
			output: false,
			resource: API.load_tweets(),
			success: ({ data }) => {
				data.tweets.forEach(function (tweet) {
					$scope.tweets.push(
						new Tweet(tweet)
					);
				});
				// $scope.checkRemoves();
				// setInterval($scope.checkRemoves, 60 * 1000);
			},
			error: () => { }
		});
	}

	/**
	 * Filters the displayed tweets on the page
	 * @method showingFilter
	 * @param {Tweet} tweet 
	 * @return {bool} 
	 */
	$scope.showingFilter = function (tweet) {
		if (State.getShowingType() === TYPE.DRAFT)
			return tweet.date === TYPE.UNDATED;
		return tweet.date != TYPE.UNDATED;
	}

	/**
	 * Removes a tweet from the array
	 * @method remove
	 * @param {Tweet} tweet 
	 */
	$scope.remove = function (tweet) {
		$scope.tweets = _.filter($scope.tweets, function (t) {
			return tweet._id !== t._id;
		});
	}

	/**
	 * Removes tweets that have been sent
	 * @method checkRemoves
	 */
	$scope.checkRemoves = function () { // TODO: should be a webhook
		var now = new Date();
		var len = $scope.tweets.length;
		$scope.tweets = _.filter($scope.tweets, function (t) {
			return !(t.type === TYPE.SCHEDULE && t.date <= now.getTime());
		});
		if ($scope.tweets.length < len) State.popup(ALERT.SUCCESS, 'Sent scheduled tweet.');
	}

	/**
	 * Adds a tweet when the composer calls it
	 * @event placeTweet
	 * @param {Tweet} tweet 
	 */
	$rootScope.$on('placeTweet', function (event, tweet) {
		$scope.tweets.push(tweet);
	});

	// -------------------------------------------------------------------------
	// TWEET FUNCTIONS
	// -------------------------------------------------------------------------

	/**
	 * Moves the tweet to the composer to edit
	 * @method edit
	 */
	$scope.edit = function () {
		var tweet = this.tweet;
		$window.scrollTo(0, 0);
		$scope.remove(tweet);
		$rootScope.$broadcast('editTweet', tweet);
	}

	/**
	 * Sends a tweet 
	 * @method send
	 */
	$scope.send = function () {
		var _id = this.tweet._id;
		State.call({
			output: true,
			resource: API.send_id({ _id }),
			success: () => {
				$scope.remove(tweet);
			},
			error: () => { }
		});
	}

	/**
	 * Converts a tweet to the opposite type
	 * @method convert
	 */
	$scope.convert = function () {
		var tweet = this.tweet;
		if (tweet.type === TYPE.SCHEDULE || State.validate({ type: TYPE.SCHEDULE, tweet })) {
			return;
		}
		State.call({
			output: true,
			resource: API.convert(tweet),
			success: () => { }, // TODO: probably shouldnt be empty
			error: () => { }
		});
	}

	/**
	 * Deletes the tweet in s3 and database
	 * @method trash
	 */
	$scope.trash = function () {
		var tweet = this.tweet;
		State.call({
			output: true,
			resource: API.delete(tweet),
			success: () => { $scope.remove(tweet) }, // TODO: probably shouldnt be empty
			error: () => { }
		});
	}

}]);
//directive to remove tweets