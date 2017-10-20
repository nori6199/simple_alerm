module.controller('MainCtrl', ['$scope', '$interval', '$window', function($scope, $interval, $window) {

	// 分
	$scope.mm = 0;
	// 秒
	$scope.ss = 0;
	// 設定分
	$scope.setMm = 0;
	// 設定秒
	$scope.setSs = 0;
	// 残り分
	$scope.leastMm = 0;
	// 残り秒
	$scope.leastSs = 0;
	// カウンター
	$scope.counter = 0;
	// 設定時間
	$scope.setTime = 0;
	// 残り時間
	$scope.leastTime = 0;
	// 「START」ボタン活性制御フラグ
	$scope.startBtnDisabledFlg = false;
	// 「STOP」ボタン活性制御フラグ
	$scope.stopBtnDisabledFlg = true;
	// 「RESET」ボタン活性制御フラグ
	$scope.resetBtnDisabledFlg = true;
	// 音設定フラグ
	$scope.soundFlg = true;
	
		// promiseオブジェクト
	var promise = undefined;
	
	// 「START」押下処理 カウンターを動かす
	$scope.startTimer = function() {
		$scope.startBtnDisabledFlg = true;
		$scope.stopBtnDisabledFlg = false;
		$scope.resetBtnDisabledFlg = false;
	
		promise = $interval(function() {
			$scope.counter++;
			
			if ($scope.counter < $scope.setTime) {
				calcLeast();
			}

			if ($scope.counter === $scope.setTime) {
				$scope.stopTimer();
				if ($scope.soundFlg) {
					alert('♫');
				} else {
					navigator.vibrate([200,100,50,50,50]);
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
		
		calcLeast();
	};

	// 「RESET」押下処理 カウンターを初期値に戻す
	$scope.resetTimer = function() {
		if (angular.isDefined(promise)) {
			$interval.cancel(promise);
		}
		
		$scope.startBtnDisabledFlg = false;
		$scope.stopBtnDisabledFlg = true;
		$scope.resetBtnDisabledFlg = true;
		
		$scope.counter = 0;
		calcLeast();
	};

	// 「＋XX分」ボタン押下処理 設定時間にXX分を加算
	$scope.addSetTimeMm = function (minute) {
		$scope.setTime += minute * 60;
		calcLeast();
	};

	// 「＋XX秒」ボタン押下処理 設定時間にXX秒を加算
	$scope.addSetTimeSs = function (second) {
		$scope.setTime += second;
		calcLeast();
	};

	// 「CLEAR」ボタン押下処理 設定時間をクリア
	$scope.clearSetTime = function () {
		$scope.setTime = 0;
		calcLeast();
	};
	
	// 残り時間を計算して設定
	function calcLeast() {
		$scope.leastTime = $scope.setTime < $scope.counter ? 0 : $scope.setTime - $scope.counter;
	}
}]);