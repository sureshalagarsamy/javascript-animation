angular.module("arrowController", []).controller("arrowCtrl", function($http, $rootScope, $scope, $timeout)
{
	console.log("arraow page");
	$rootScope.activeMenu();
	$rootScope.arrowMenu 	= true;

	$scope.arrow 		= {};
	$scope.arrow.start	= true;
	$scope.arrow.stop	= false;
	
	$scope.arrow.defaultBlueImgPath		= "styles/images/arrow_rect_blue.png";
	$scope.arrow.defaultBlueMarkPath	= "styles/images/arrow_mark_blue.png";
	$scope.arrow.activeGreenPath 		= "styles/images/arrow_rect_green.png";
	$scope.arrow.activeGreenMarkPath 	= "styles/images/arrow_mark_green.png";
	
	var parentStartTimeout;

	$scope.defaultLoad = function()
	{
		$scope.spanList = [{id:0, selected:false},{id:1, selected:false},{id:2, selected:false}];
		$scope.arrow.arrowMarkSelected = false;
	}

	var currentSpanIndex = 0;
	var startAnimationSetTimeout = function()
	{
		if(currentSpanIndex < $scope.spanList.length)
		{
			
			(currentSpanIndex > 0)?$scope.spanList[currentSpanIndex-1].selected = false:"";
			$scope.spanList[currentSpanIndex].selected = true;
			$scope.arrow.arrowMarkSelected = false;
			currentSpanIndex++;
			$scope.$apply();
		}
		else if(currentSpanIndex == $scope.spanList.length)
		{
			
			$scope.arrow.arrowMarkSelected = true;
			$scope.spanList[currentSpanIndex-1].selected = false;
			currentSpanIndex = 0;
			$scope.$apply();
		}
	}

	//start
	$scope.startAnimation = function()
	{
		$scope.arrow.stop	= true;
		$scope.arrow.start	= false;

		currentSpanIndex = 0;

		parentStartTimeout = setInterval(startAnimationSetTimeout,200);

	}

	//stop
	$scope.stopAnimation = function()
	{
		$scope.arrow.start	= true;
		$scope.arrow.stop	= false;
		$scope.defaultLoad();
		clearInterval(parentStartTimeout);
	}
	$scope.defaultLoad();
});