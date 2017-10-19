module.controller('MainCtrl', ['$scope', '$interval', '$window', function($scope, $interval, $window) {

	// 分
	$scope.mm = 0;
	// 秒
	$scope.ss = 0;
	// 設定分
	$scope.setMm = 0;
	// 設定秒
	$scope.setSs = 0;
	// 「START」ボタン活性制御フラグ
	$scope.startBtnDisabledFlg = false;
	// 「STOP」ボタン活性制御フラグ
	$scope.stopBtnDisabledFlg = true;
	// 「RESET」ボタン活性制御フラグ
	$scope.resetBtnDisabledFlg = true;
	// 音設定フラグ
	$scope.soundFlg = true;
	
		// promiseオブジェクト
	var promise = undefined,
		// カウンター
		counter = 0,
		// 設定時間
		setTime = 0;
	
	// 「START」押下処理 カウンターを動かす
	$scope.startTimer = function() {
		$scope.startBtnDisabledFlg = true;
		$scope.stopBtnDisabledFlg = false;
		$scope.resetBtnDisabledFlg = false;
	
		promise = $interval(function() {
			counter++;

			if (counter % 60 === 0) {
				$scope.mm++;
				$scope.ss = 0;
			}

			$scope.ss++;

			if (counter === setTime) {
				$scope.stopTimer();
				if ($scope.soundFlg) {
					alert('♫');
				} else {
					navigator.vibrate(200);
				}
				return;
			}
		}, 1000);
	};

	// 「STOP」押下処理 カウンターを止める
	$scope.stopTimer = function() {
		if (angular.isDefined(promise)) {
			$interval.cancel(promise);
		}
		
		$scope.startBtnDisabledFlg = false;
		$scope.stopBtnDisabledFlg = true;
		$scope.resetBtnDisabledFlg = false;
	};

	// 「RESET」押下処理 カウンターを初期値に戻す
	$scope.resetTimer = function() {
		if (angular.isDefined(promise)) {
			$interval.cancel(promise);
		}
		
		$scope.startBtnDisabledFlg = false;
		$scope.stopBtnDisabledFlg = true;
		$scope.resetBtnDisabledFlg = true;
		
		counter = 0;
		$scope.mm = 0;
		$scope.ss = 0;
	};

	// 「＋XX分」ボタン押下処理 設定時間にXX分を加算
	$scope.addSetTimeMm = function (minute) {
		$scope.setMm += minute;
		setTime += minute * 60;
	};

	// 「＋XX秒」ボタン押下処理 設定時間にXX秒を加算
	$scope.addSetTimeSs = function (second) {
		var setSs = $scope.setSs;
		if (setSs + second >= 60) {
			$scope.setMm++;
			$scope.setSs = setSs + second - 60;
		} else {
			$scope.setSs += second;
		}
		setTime += second;
	};

	// 「CLEAR」ボタン押下処理 設定時間をクリア
	$scope.clearSetTime = function () {
		$scope.setMm = 0;
		$scope.setSs = 0;
		setTime = 0;
	};
}]);