angular.module("chartThreeController", []).controller("chartThreeCtrl", function($http, $rootScope, $scope, $timeout)
{
	console.log("3D Chart-3");
	$rootScope.activeMenu();
	$rootScope.chart_three 	= true;
	
	$(function () {
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: 'container',
				margin: [150, 75, 75, 75],
				type: 'scatter',
				options3d: {
					enabled: true,
					alpha: 20,
					beta: 30,
					depth: 200,
					frame: {
						bottom: {
							size: 1,
							color: '#C0C0C0'
						}
					}
				}
			},
			title: {
				text: 'a 3D Scatter Chart'
			},
			subtitle: {
				text: 'using x y z coordinates'
			},
			yAxis: {
				min: 0,
				max: 10
			},
			xAxis: {
				min: 0,
				max: 10,
				gridLineWidth: 1
			},
			zAxis: {
				min: 0,
				max: 10
			},
			series: [{
				data: [
					// [X, Y, Z]
					[1, 1, 1],
					[1, 1, 2],
					[1, 1, 5],
					[2, 3, 2],
					[2, 6, 4],
					[4, 5, 7],
					[4, 2, 8],
					[7, 1, 3],
					[7, 1, 5],
					[8, 1, 5]
				]
			}]
		});
	});

});