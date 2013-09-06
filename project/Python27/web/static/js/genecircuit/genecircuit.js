/* refer to donuts */
(function($) {
$.fn.dashboard = function(options) {
	options = options || {};
	return this.each(function() {
		/* $(this).append("aaa"); */
		$(this).append("<div class=\"dashboard-arrow\"></div>");
		$(this).append("50%");
		if(options.size) {
			$(this).css("font-size", options.size.toString() + "px");
		}
		$(this).append("<div class=\"dashboard-value\">0%</div>");

		$(this).bind("update", function(e, per){
			if (per > 100)
				per = 100;
			else if (per < 0)
				per = 0;
			per = Math.floor(per);
			$(this).find(".dashboard-arrow").css('transform', 'rotate(' + ((1.8 * per) - 180) + 'deg)');
			$(this).find(".dashboard-value").text(per.toString() + "%");
		});

		$(this).trigger('update', 0);

	});
}
})(jQuery);

var protein = function() {
	this.PoPs = 0;
	this.RiPs = 0;
	this.copy = 0;
	this.repress_rate = 0;
	this.induce_rate = 0;
	this.before_regulated = 0;
	this.after_regulated = 0;
	this.after_induced = 0;
}

var protein = {
	init: function(aTextureId, aData) {
		this.setTexture(aTextureId, aData);
		this.setData(aTextureId, aData);
	},

	setTexture: function(aTextureId, aData) {
		$("#" + aTextureId).append("<div class=\"module-title\"><em>protein1</em></div><div class=\"dashboard-unit\"><div><div class=\"dashboard before-regulated\"></div><span>before<br/> regulated</span></div><div class=\"protein-range mul\"><div class=\"slider pops\"></div><span>PoPs</span></div><div class=\"protein-range mul\"><div class=\"slider rips\"></div><span>RiPs</span></div><div class=\"protein-range mul\"><div class=\"slider copy\"></div><span>copy</span></div></div><div class=\"dashboard-unit\"><div><div class=\"dashboard after-regulated\"></div><span>after<br/> regulated</span></div><div class=\"protein-range\"><div class=\"slider repress-rate\"></div><span>repress rate</span></div></div><div class=\"dashboard-unit\"><div><div class=\"dashboard after-induced\"></div><span>after<br/> induced</span></div><div class=\"protein-range\"><div class=\"slider induce-rate\"></div><span>induce rate</span></div><div class=\"protein-range\"><div class=\"slider concen\"></div><span>concen</span></div></div>");
		// $("#" + aTextureId + " .module-title em").text(aTextureId); 
		$("#" + aTextureId + " .module-title em").text(aData['name']);
		$("#" + aTextureId).data("grp_id", aData['grp_id']);

		$("#" + aTextureId + " .dashboard").dashboard({
			size: 40,
			percentage: 0,
		});

		/* $("#" + aTextureId + " .protein-range .slider").slider({ */
		$("#" + aTextureId + " .pops").slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			stop: function(event, ui) {
				/* ws.send(JSON.stringify({ */
					/* 'request': 'changeRBS', */
				/* })); */
				randomValue();
			}
		});

		$("#" + aTextureId + " .rips").slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			stop: function(event, ui) {
				/* ws.send(JSON.stringify({ */
					/* 'request': 'changeRBS', */
				/* })); */
				randomValue();
			}
		});

		$("#" + aTextureId + " .copy").slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			stop: function(event, ui) {
				/* ws.send(JSON.stringify({ */
					/* 'request': 'changeRBS', */
				/* })); */
				randomValue();
			}
		});

		$("#" + aTextureId + " .repress-rate").slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			stop: function(event, ui) {
				/* ws.send(JSON.stringify({ */
					/* 'request': 'changeRBS', */
				/* })); */
				randomValue();
			}
		});

		$("#" + aTextureId + " .induce-rate").slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			stop: function(event, ui) {
				/* ws.send(JSON.stringify({ */
					/* 'request': 'changeRBS', */
				/* })); */
				randomValue();
			}
		});

		$("#" + aTextureId + " .concen").slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			stop: function(event, ui) {
				/* ws.send(JSON.stringify({ */
					/* 'request': 'changeRBS', */
				/* })); */
				randomValue();
			}
		});
		/* this.textureId = aTextureId; */
	},
	setData: function(aTextureId, aData) {
		// aData.PoPs = Math.floor(Math.random()*100); 
		// aData.RiPs = Math.floor(Math.random()*100); 
		// aData.copy = Math.floor(Math.random()*100); 
		// aData.repress_rate = Math.floor(Math.random()*100); 
		// aData.induce_rate = Math.floor(Math.random()*100); 
		// aData.before_regulated = Math.floor(Math.random()*100); 
		// aData.after_regulated = Math.floor(Math.random()*100); 
		// aData.after_induced = Math.floor(Math.random()*100); 
		$("#" + aTextureId + " .pops").slider("value", aData.PoPs);
		$("#" + aTextureId + " .rips").slider("value", aData.RiPs);
		$("#" + aTextureId + " .copy").slider("value", aData.copy);
		$("#" + aTextureId + " .repress-rate").slider("value", aData.repress_rate);
		$("#" + aTextureId + " .induce-rate").slider("value", aData.induce_rate);
		$("#" + aTextureId + " .concen").slider("value", aData.concen);
		$("#" + aTextureId + " .before-regulated").trigger("update", aData.before_regulated);
		$("#" + aTextureId + " .after-regulated").trigger("update", aData.after_regulated);
		$("#" + aTextureId + " .after-induced").trigger("update", aData.after_induced);
	},
}

var group = {
	init: function(aTextureId, aData) {
		this.setTexture(aTextureId, aData);
		this.setData(aTextureId, aData, "init");
	},
	setTexture: function(aTextureId, aData) {
							
							
		$("#" + aTextureId).append("<ul class=\"sbol-components\"></ul><div class=\"move-left cmd-move\">&lt</div><div class=\"move-right cmd-move\">&gt</div><button class=\"sbol-switch switch-on\">trans</button>");
		for(var i = 0; i < aData.sbol.length; i++) {
			var type = '';
			if(aData.sbol[i].type == 'Regulatory') type = 'Promoter.PNG';
			else if(aData.sbol[i].type == 'RBS') type = 'rbs.PNG';
			else if(aData.sbol[i].type == 'Coding') type = 'Coding.PNG';
			else if(aData.sbol[i].type == 'Terminator') type = 'Terminator.PNG';
			$("#" + aTextureId + " .sbol-components").append("<li id='" + aTextureId + "-" + i.toString() + "' class='component'><div><img src=\"../static/img/component/Promoter.PNG\"/></div><span>BBa_C0060</span></li>");
			$("#" + aTextureId + " .sbol-components li:eq(" + i.toString() + ")").find('img').attr('src', "../static/img/component/" + type);
			$("#" + aTextureId + " .sbol-components li:eq(" + i.toString() + ")").data('type', aData.sbol[i].type);
			$("#" + aTextureId + " .sbol-components li:eq(" + i.toString() + ")").find('span').text(aData.sbol[i].name);
			$("#" + aTextureId + " .sbol-components sbol-switch").text(aData.state);
			if(aData.state == 'trans') {
				$("#" + aTextureId + " .sbol-switch").removeClass('switch-off').addClass('switch-on');
				$("#" + aTextureId + " .sbol-switch").text("trans");
				$("#" + aTextureId).data("order", "trans");
			} else if(aData.state == 'cis') {
				$("#" + aTextureId + " .sbol-switch").removeClass('switch-on').addClass('switch-off');
				$("#" + aTextureId + " .sbol-switch").text("cis");
				$("#" + aTextureId).data("order", "cis");
			}
		}
		$("#" + aTextureId).data('from', aData.from); 
		$("#" + aTextureId).data('type', aData.type); 
		$("#" + aTextureId).data('to', aData.to); 
		$("#" + aTextureId + " ul").prepend("<li id='" + aTextureId + "-first' style='display:none'></li>");
		$("#" + aTextureId + " ul").sortable({
			items: "li",
			handle: "img, span",
			update: function(event, ui) {
				command.tempCmd.to = $(ui.item).prev().attr('id');
				command.cmdConfirm();
				randomValue();
			},
			start: function(event, ui) {
				command.tempCmd.type = 'Move';
				command.tempCmd.actor = $(ui.item).attr('id');
				command.tempCmd.from = $(ui.item).prev().attr('id');
			},

		});
		that = this;
		$("#" + aTextureId + " .sbol-switch").bind("click", function(){
			if($(this).text() == 'trans') {
				/* $(this).removeClass('switch-on').addClass('switch-off'); */
				/* $(this).text('cis'); */
				/* $(this).data("order", "cis"); */
				that.turnSwitch($(this), 'cis')
			} else {
				/* $(this).removeClass('switch-off').addClass('switch-on'); */
				/* $(this).text('trans'); */
				/* $(this).data("order", "trans"); */
				that.turnSwitch($(this), 'trans');
			}
			randomValue();
		});
	},
	setData: function(aTextureId, aData, state) {
		// after_connect 
		// for(var i = 0; i < aData.sbol.length; i++) { 
			// $("#", aTextureId + " .sbol-components li:eq(" + i.toString() + ")").find('span').text(aData.sbol[i].name); 
		// } 
		// if(aData.state == 'trans') { 
			// this.turnSwitch($("#" + aTextureId + " .sbol-switch"), 'trans'); 
		// } else { 
			// this.turnSwitch($("#" + aTextureId + " .sbol-switch"), 'cis'); 
		// } 
		
		for(var i = 0; i < aData.sbol.length; i++) { 
			$("#" + aTextureId + " .sbol-components li.component:eq(" + i.toString() + ")").find('span').text(Math.floor(Math.random()*1000000).toString()); 
		} 
	},
	turnSwitch: function(target, type) {
		if(type == 'trans') {
			target.removeClass('switch-off').addClass('switch-on');
			target.text('trans');
			target.data("order", "trans");
		} else {
			target.removeClass('switch-on').addClass('switch-off');
			target.text('cis');
			target.data("order", "cis");
		}
	}
}

var plasmid =  {
	canSort: false,
	init: function(aTextureId, aData) {
		this.setTexture(aTextureId, aData);
		this.setData(aTextureId, aData);
		if(this.canSort == false) {
			this.setSortable();
			this.canSort = true;
		}
	},
	setTexture: function(aTextureId, aData) {
		this.textureId = aTextureId;				
		/* alert(aTextureId); */
		$("#" + aTextureId).append("<div><span class=\"label\"></span></div><div class=\"cmd-del\">x</div>");
						
		// $("#" + aTextureId + " div .label").text(aTextureId); 
		$("#" + aTextureId + " div .label").html("<a href='plasmid'><i class='icon-zoom-in'></i>" + aTextureId + "</a>");
		$("#" + aTextureId).append("<div id='" + aTextureId + "-first' style='display:none'></div>");

		// console.log("kakakakak", aData); 
		for(var i = 0; i < aData.length; i++) {
			var sbol_id = aData[i].id;
			// $("#" + aTextureId).append("<div class='sbol' id='" + aTextureId + "-sbol-" + i.toString() + "'></div>"); 
			$("#" + aTextureId).append("<div class='sbol' id='sbol-" + sbol_id + "'></div>"); 
			group.init("sbol-" + sbol_id, aData[i]);
		}
		checkEmptyPlasmid();
		$("#plasmids-view").mCustomScrollbar("update");
	},

	setData: function(aTextureId, aData) {
		// after_connect 
		// for(var i = 0; i < aData.length; i++) { 
			// var tId = "sbol-" + aData[i].id; 
			// group.setData(tId, aData[i]); 
		// } 
		for(var i = 0; i < aData.length; i++) {
			var tId = $("#" + aTextureId + " .sbol:eq(" + i.toString() + ")").attr("id");
			group.setData(tId, aData[i]);
		}
	},
	addPlasmid: function() {
		/* var count = $("#plasmids-view .mCSB_container .plasmids").length; */
		var count = 0;
		while($("#plasmid-" + count).length > 0) {
			count += 1;
		}
		$("#plasmids-view .mCSB_container").append("<div class='plasmids' id='plasmid-" + count.toString() + "'></div>");	
		var aTextureId = "plasmid-" + count.toString();
		$("#" + aTextureId).append("<div><span class=\"label\"></span></div><div class=\"cmd-del\">x</div>");
		$("#" + aTextureId + " div .label").html("<a href='plasmid'><i class='icon-zoom-in'></i>" + aTextureId + "</a>");
		$("#" + aTextureId).append("<div id='" + aTextureId + "-first' style='display:none'></div>");
		checkEmptyPlasmid();
		/* $("#" + aTextureId).append("<div id='" + aTextureId + "-first'></div>"); */
		/* this.setSortable(); */
		/* for(var i = 0; i < 1000; i++) { */
			/* $("#plasmids-view").scroll(); */
		/* } */
		$("#plasmids-view").mCustomScrollbar("update");
		$("#plasmids-view").mCustomScrollbar("scrollTo", "bottom");
	},
	setSortable: function() {
		that = this;
	}
}

$(".empty-plasmid .cmd-del").live('click', function(){
	$(this).parents(".plasmids").remove();
	$("#plasmids-view").mCustomScrollbar("update");
	$("#plasmids-view").mCustomScrollbar("scrollTo", "bottom");
});

var checkEmptyPlasmid = function() {
	$(".plasmids").each(function(){
		if($(this).find(".sbol").length == 0) {
			$(this).addClass('empty-plasmid');
		} else {
			$(this).removeClass('empty-plasmid');
		}
	});
	/* $("#plasmids-view").mCustomScrollbar("update"); */
	/* $("#plasmids-view").mCustomScrollbar("scrollTo", "bottom"); */
}
var moveAndCheck = function(aGroup, fGroup, tGroup, fPlasmid, tPlasmid) {
	aGroup.fadeOut().detach().fadeIn();
	tGroup.after(aGroup);
	checkEmptyPlasmid();

	command.tempCmd.type = "Move";
	command.tempCmd.from = fGroup.attr('id');
	command.tempCmd.actor = aGroup.attr('id');
	command.tempCmd.to = tGroup.attr('id');
	command.cmdConfirm();
}
$(".move-left").live("click", function(e){
	var aGroup = $(this).parent(".sbol");
	var aPlasmid = $(this).parents(".plasmids");
	if(aGroup.prev(".sbol").length > 0) {
		var tGroup = aGroup.prev(" div").prev(" div");
		var fGroup = aGroup.prev(" div");
		var fPlasmid = aPlasmid, tPlasmid = tGroup.parents(".plasmids");
		moveAndCheck(aGroup, fGroup, tGroup, fPlasmid, tPlasmid);
		randomValue();
	} else {
		if(aPlasmid.prev(".plasmids").length > 0) {
			var tGroup = aPlasmid.prev(".plasmids").children("div").last();
			var fGroup = aGroup.prev(" div");
			var fPlasmid = aPlasmid, tPlasmid = tGroup.parents(".plasmids");
			moveAndCheck(aGroup, fGroup, tGroup, fPlasmid, tPlasmid);
			randomValue();
		}
	}
});
$(".move-right").live("click", function(e){
	var aGroup = $(this).parent(".sbol");
	var aPlasmid = $(this).parents(".plasmids");
	if(aGroup.next(".sbol").length > 0) {
		var tGroup = aGroup.next(" div");
		var fGroup = aGroup.prev(" div");
		var fPlasmid = aPlasmid, tPlasmid = tGroup.parents(".plasmids");
		moveAndCheck(aGroup, fGroup, tGroup, fPlasmid, tPlasmid);
		randomValue();
	} else {
		if(aPlasmid.next(".plasmids").length > 0) {
			var pId = aPlasmid.next(".plasmids").attr("id");
			var tGroup = $("#" + pId + "-first");
			var fGroup = aGroup.prev(" div");
			var fPlasmid = aPlasmid, tPlasmid = tGroup.parents(".plasmids");
			moveAndCheck(aGroup, fGroup, tGroup, fPlasmid, tPlasmid);
			randomValue();
		}
	}
});

$(".plasmids").change(function(){
		console.log("kkak;");
});

var init = function(genecircuitData) {
	// for(var i = 0 ; i < genecircuitData.proteins.length; i++) { 
		// $("#dashboard-view .mCSB_container").append("<div class='proteins new-proteins' id='protein-" + i.toString() + "'></div>"); 
		// protein.init("protein-" + i.toString(), genecircuitData.proteins[i]); 
	// } 
	for(var prop in genecircuitData.proteins) {
		// console.log(genecircuitData.proteins[prop]); 
		$("#dashboard-view .mCSB_container").append("<div class='proteins new-proteins' id='protein-" + prop + "'></div>"); 
		protein.init("protein-" + prop, genecircuitData.proteins[prop]); 
	}
	// for(var i = 0; i < genecircuitData.plasmids.length; i++) {  
		// $("#plasmids-view .mCSB_container").append("<div class='plasmids' id='plasmid-" + i.toString() + "'></div>");  
		// plasmid.init("plasmid-" + i.toString(), genecircuitData.plasmids[i]);  
	// }  
	for(var i = 0; i < genecircuitData.plasmids.length; i++) { 
		var groups = [];
		for(var j = 0; j < genecircuitData.plasmids[i].length; j++) {
			groups.push(genecircuitData.groups[genecircuitData.plasmids[i][j].toString()]);
			groups[groups.length-1].id = genecircuitData.plasmids[i][j].toString();
		}
		$("#plasmids-view .mCSB_container").append("<div class='plasmids' id='plasmid-" + i.toString() + "'></div>"); 
		plasmid.init("plasmid-" + i.toString(), groups); 
	} 
	dataCollection = getDataCollection();
	historyStack.add(dataCollection);
}

var getDataCollection = function() {
	var dataCollection = {
		proteins: {}, 
		plasmids: [], 
		groups: {},
	}
	var pLength = $("#dashboard-view .mCSB_container .proteins").length;
	for(var i = 0; i < pLength; i++) {
		var pid = $(".proteins:eq(" + i.toString() + ")").attr('id');
		var p = $("#" + pid);
		dataCollection.proteins[i] = {};
		dataCollection.proteins[i].grp_id = p.data('grp_id');
		dataCollection.proteins[i].name = p.find(".module-title em").text();
		dataCollection.proteins[i].PoPs = p.find(".pops").slider("value");
		dataCollection.proteins[i].RiPs = p.find(".rips").slider("value");
		dataCollection.proteins[i].copy = p.find(".copy").slider("value");
		dataCollection.proteins[i].repress_rate = p.find(".repress-rate").slider("value");
		dataCollection.proteins[i].induce_rate = p.find(".induce-rate").slider("value");
		dataCollection.proteins[i].concen = p.find(".concen").slider("value");
		dataCollection.proteins[i].before_regulated = parseInt(p.find(".before-regulated .dashboard-value").text());
		dataCollection.proteins[i].after_regulated = parseInt(p.find(".after-regulated .dashboard-value").text());
		dataCollection.proteins[i].after_induced = parseInt(p.find(".after-induced .dashboard-value").text());
	}
	var plasmidsLength = $("#plasmids-view .plasmids").length;
	var plasmidsList = $("#plasmids-view .plasmids");
	for(var i = 0; i < plasmidsLength; i++) {
		dataCollection.plasmids.push([]);
		var curPlasmid = plasmidsList.eq(i);
		var groupsLength = curPlasmid.find(".sbol").length;
		var groupsList = curPlasmid.find(".sbol");
		for(var j = 0; j < groupsLength; j++) {
			var grp_id = groupsList.eq(j).attr('id').split('-')[1];
			dataCollection.plasmids[i].push(parseInt(grp_id));
			dataCollection.groups[grp_id] = {};
			var curGroup = groupsList.eq(j);
			var componentsLength = curGroup.find(".component").length;
			var componentsList = curGroup.find(".component");
			dataCollection.groups[grp_id] = {sbol:[],state:''};
			dataCollection.groups[grp_id].from = curGroup.data("from"); 
			dataCollection.groups[grp_id].to = curGroup.data("to"); 
			dataCollection.groups[grp_id].type = curGroup.data("type"); 
			dataCollection.groups[grp_id].state = curGroup.data("order"); 
			for(var k = 0; k < componentsLength; k++) {
				dataCollection.groups[grp_id].sbol.push({'type':'','name':''});
				dataCollection.groups[grp_id].sbol[k].name = curGroup.find("li").eq(k+1).find("span").text();
				dataCollection.groups[grp_id].sbol[k].type = curGroup.find("li").eq(k+1).data("type");
			}
		}
	}
	return dataCollection;
}

var command = {
	tempCmd: {
		type: '',				 
		from: '',
		to: '',
		newAt: '',
		deleteAt: '',
		spe: '',
	},
	cmd: {},
	cmdConfirm: function() {
		this.cmd = this.tempCmd;						
		this.cmd = $.extend({}, this.tempCmd, true);
	}
}

var historyStack = {
	pointer: -1,
	stack: [],
	add: function(dataCollection) {
		while(this.stack.length - 1 > this.pointer) {
			this.stack.pop();
		}
		this.stack.push(dataCollection);
		this.pointer += 1;
		this.stack[this.pointer].cmd = command.cmd;
	},
	setState: function(p) {
		var curState = this.stack[p];
		// for(var i = 0; i < genecircuitData.proteins.length; i++) { 
			// var tId = $("#dashboard-view .mCSB_container .proteins:eq(" + i.toString() + ")").attr("id"); 
			// protein.setData(tId, curState.proteins[i]); 
		// } 
		// for(var i = 0; i < genecircuitData.plasmids.length; i++) { 
			// var tId = $("#plasmids-view .mCSB_container .plasmids:eq(" + i.toString() + ")").attr("id"); 
			// plasmid.setData(tId, curState.plasmids[i]); 
		// } 

		for(var prop in curState.proteins) { 
			var tId = "protein-" + prop; 
			protein.setData(tId, curState.proteins[prop]); 
		} 
		for(var i = 0; i < curState.plasmids.length; i++) { 
			var tId = $("#plasmids-view .mCSB_container .plasmids:eq(" + i.toString() + ")").attr("id"); 
			var groups = []; 
			for(var j = 0; j < curState.plasmids[i].length; j++) { 
				groups.push(curState.groups[curState.plasmids[i][j].toString()]); 
				groups[groups.length-1].id = curState.plasmids[i][j].toString(); 
			} 
			plasmid.setData(tId, groups); 
		} 
	},
	undo: function() {
		if(this.pointer > 0) {
			this.pointer -= 1;
			var curCmd = this.stack[this.pointer+1].cmd
			if(curCmd.type == 'Move') {
				var temp = $("#" + curCmd.actor).detach().fadeOut().fadeIn();
				$("#" + curCmd.from).after(temp);
			}
			this.setState(this.pointer);
			/* this.setCurrentStack(stack[pointer], stack[pointer+1]); */
		}
	},
	redo: function() {
		if(this.pointer < this.stack.length - 1) {
			this.pointer += 1;
			var curCmd = this.stack[this.pointer].cmd
			if(curCmd.type == 'Move') {
				var temp = $("#" + curCmd.actor).detach();
				$("#" + curCmd.to).after(temp);
			}
			this.setState(this.pointer);
			/* this.setCurrentStack(stack[pointer], stack[pointer+1]); */
		}
	}
}

var randomValue = function() {
	dataCollection = getDataCollection();
	console.log("dataColl", dataCollection);
	/* send message */

	/* in onmessage */
	for(var prop in genecircuitData.proteins) {
		var tId = "protein-" + prop;
		protein.setData(tId, genecircuitData.proteins[prop]);
	}
	for(var i = 0; i < genecircuitData.plasmids.length; i++) {
		var tId = $("#plasmids-view .mCSB_container .plasmids:eq(" + i.toString() + ")").attr("id");
		var groups = [];
		for(var j = 0; j < genecircuitData.plasmids[i].length; j++) {
			groups.push(genecircuitData.groups[genecircuitData.plasmids[i][j].toString()]);
			groups[groups.length-1].id = genecircuitData.plasmids[i][j].toString();
		}
		plasmid.setData(tId, groups);
	}
	/* dataCollection -- messageResult */
	historyStack.add(dataCollection);
}

var setContentSize = function() {
	winH = $(window).height() - 70;
	winW = $(window).width() - 60;
	if(winH < 0 || winW < 0) return;
	conH = parseInt($("#content").css("height"));
	conW = parseInt($("#content").css("width"));
	var scale = 1;
	if(winW / winH > conW / conH) {
		scale = winH / conH;
	} else {
		scale = winW / conW;
	}
	/* $("#content").css("zoom", scale); */
	/* $("#content").css("width", Math.floor(conW * scale).toString() + "px"); */
	/* $("#content").css("height", Math.floor(conH * scale).toString() + "px"); */
}

$(window).resize(function() {
	/* setContentSize(); */
});


$(function(){
	/* setContentSize(); */

	$(".dashboard").dashboard({
		size: 40,
		percentage: 20,
	});

	/* $(".sbol-components").sortable({ */
		/* items: "li", */
		/* handle: "img, span", */
		/* update: function(event, ui) { */
			/* randomValue(); */
		/* }, */
	/* }); */
	/* $("#plasmids-view").sortable({ */
		/* items: ".sbol", */
		/* handle: ".sbol-handle", */
		/* update: function(event, ui) { */
			/* randomValue(); */
		/* }, */
	/* }); */
	
	$(".proteins").live("ready", function(){
		console.log("laal");
	});

	$(".protein-range .slider").slider({
		orientation: "vertical",
		range: "min",
		min: 0,
		max: 100,
		value: 60,
	});

	$("#dashboard-view").mCustomScrollbar({
		/* autoHideScrollbar: true, */
		theme: "light",
		advanced: {
			autoExpandVerticalScroll: true,
			updateOnContentResize: true,
		}
	});

	$("#plasmids-view").mCustomScrollbar({
		/* autoHideScrollbar: true, */
		theme: "light",
		advanced: {
			autoExpandVerticalScroll: true,
			/* updateOnContentResize: true, */
		}
	});

	$("#cmd-new-plasmid").click(function(){
		plasmid.addPlasmid();
	});

	// var chart = new iChart.LineBasic2D({ 
		// animation: true, 
		// render: 'simulation', 
		// data: [2,4,2,1,6,3], 
	// }) 
	var data = [
						{
							name : 'aa',
							value:[-9,1,12,20,26,30,32,29,22,12,0,-6],
							color:'#1f7e92',
							line_width:2
						}
				 ];
			 
	var chart = new iChart.Area2D({
			render : 'simulation',
			data: data,
			title : 'xxx',
			width : 267,
			height : 220,
			coordinate:{height:'80%',background_color:'#edf8fa'},
			sub_option:{
				hollow_inside:false,//设置一个点的亮色在外环的效果
				point_size:10
			},
			labels:["1","2","3","4","5","6","7","8","9","10","11","12"]
		});
	chart.draw();
});