 module.controller('MainCtrl', ['$scope', '$interval', '$window', function($scope, $interval, $window) {

	// 分
	$scope.mm = 0;
	// 秒
	$scope.ss = 0;
	// 10分の1秒
	$scope.ms = 0;
	// 設定分
	$scope.setMm = 0;
	// 設定秒
	$scope.setSs = 0;
	// 設定10分の1秒
	$scope.setMs = 0;
	// 「START」ボタン活性制御フラグ
	$scope.startBtnDisabledFlg = false;
	// 「STOP」ボタン活性制御フラグ
	$scope.stopBtnDisabledFlg = true;
	// 「RESET」ボタン活性制御フラグ
	$scope.resetBtnDisabledFlg = true;
	
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

			if (counter % 100 === 0) {
				$scope.ss++;
				$scope.ms = 0;
			}

			if (counter % 6000 === 0) {
				$scope.mm++;
				$scope.ss = 0;
			}

			if (counter === setTime) {
				$scope.stopTimer();
				navigator.vibrate(200);
				return;
			}

			$scope.ms++;
		}, 10);
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
		$scope.ms = 0;
	};

	// 「＋XX分」ボタン押下処理 設定時間にXX分を加算
	$scope.addSetTimeMm = function (minute) {
		$scope.setMm += minute;
		setTime += minute * 6000;
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
		setTime += second * 100;
	};

	// 「CLEAR」ボタン押下処理 設定時間をクリア
	$scope.clearSetTime = function () {
		$scope.setMm = 0;
		$scope.setSs = 0;
		$scope.setMs = 0;
		setTime = 0;
	};
}]);