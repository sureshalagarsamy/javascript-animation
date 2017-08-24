angular.module("wheelsController", []).controller("wheelsCtrl", function($http, $rootScope, $scope)
{
	console.log("wheels page");

	$rootScope.wheelsMenu	= true;
	$rootScope.arrowMenu	= false;
	$rootScope.dragDropMenu = false;
	$rootScope.graphMenu	= false;
	$rootScope.logFile 		= false;
	$rootScope.shellScript 	= false;
	$rootScope.VNCClient 	= false;
	$rootScope.VLCClient 	= false;
	$rootScope.bgPicture 	= false;

	$scope.gear			= {};
	$scope.gear.start	= true;
	$scope.gear.stop	= false;

	$scope.startGear = function()
	{
		speed = 2;
		$scope.gear.stop     = true;
		$scope.gear.start     = false;
	}

	$scope.stopGear = function()
	{
		speed = 0;
		$scope.gear.stop     = false;
		$scope.gear.start     = true;
	}

	var width   = 250,
		height      = 300,
		radius      = 60,
		x = Math.sin(2 * Math.PI / 3),
		y = Math.cos(2 * Math.PI / 3);

	var offset = 0,speed = 0;

	var svg = d3.select("#outerDiv").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + width / 1.8 + "," + height / 1.5 + ")scale(.45)")
	.append("g");

	var frame = svg.append("g")
	.datum({radius: Infinity});

	frame.append("g")
	.attr("class", "sun")
	.datum({teeth: 16, radius: radius})
	.append("path")
	.attr("d", gear);

	frame.append("g")
	.attr("class", "planet1")
	.attr("transform", "translate(0,-" + radius * 3 + ")")
	.datum({teeth: 32, radius: -radius * 2})
	.append("path")
	.attr("d", gear);

	var group = frame.append("g")
	.attr("class", "planet2")
	.attr("transform", "translate(" + -radius * 3 * x + "," + -radius * 3 * y + ")")
	.datum({teeth: 32, radius: -radius * 2});

	group.append("path")
	.attr("d", gear);


	group.append("circle").attr("cx", 60).attr("cy", 40).attr("r",12).attr("fill", "white").attr("stroke", "#70716a").attr("stroke-width", 3);

	group.append("circle").attr("cx", -30).attr("cy", -65).attr("r",12).attr("fill", "white").attr("stroke", "#70716a").attr("stroke-width", 3);

	group.append("circle").attr("cx", 50).attr("cy", -50).attr("r",12).attr("fill", "white").attr("stroke", "#70716a").attr("stroke-width", 3);

	group.append("circle").attr("cx", -70).attr("cy", 10).attr("r",12).attr("fill", "white").attr("stroke", "#70716a").attr("stroke-width", 3);

	group.append("circle").attr("cx", -20).attr("cy", 70).attr("r",12).attr("fill", "white").attr("stroke", "#70716a").attr("stroke-width", 3); 


	/*path.append("span").attr("class", "roundSpan1");
               svg.append("span").attr("class", "roundSpan2");*/

	d3.selectAll("input[name=reference]").data([radius * 5, Infinity, -radius]).on("change", function(radius1)
																				   {
		var radius0 = frame.datum().radius, angle = count * speed;
		frame.datum({radius: radius1});
		svg.attr("transform", "rotate(" + (offset += angle / radius0 - angle / radius1) + ")");
		svg.attr("id", "mySVG");
	});

	d3.selectAll("input[name=speed]").on("change", function() { speed = +this.value; });

	function gear(d)
	{
		var n = d.teeth,
			r2 = Math.abs(d.radius),
			r0 = r2 - 6,
			r1 = r2 + 6,
			r3 = d.annulus ? (r3 = r0, r0 = r1, r1 = r3, r2 + 20) : 20,
			da = Math.PI / n,
			a0 = -Math.PI / 2 + (d.annulus ? Math.PI / n : 0),
			i = -1,
			path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
		while (++i < n) path.push(
			"A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
			"L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
			"L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
			"A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
			"L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
			"L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
		path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
		return path.join("");
	}

	var count = 100;
	d3.timer(function()
			 {
		if(speed !== 0){

			var angle = count * speed,

				transform = function(d) { return "rotate(" + angle / d.radius + ")"; };
			frame.selectAll("path").attr("transform", transform);
			frame.attr("transform", transform); // frame of reference

			count = count+20;

			transform = function(d) { return "rotate(" + angle / d.radius + ")"; };
			frame.selectAll("circle").attr("transform", transform);
			frame.attr("transform", transform); // frame of reference
		}
	});


});
