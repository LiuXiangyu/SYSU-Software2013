/**
 *
 *		File: 			mytree.js
 *		Author: 		Rathinho
 *		Description: 	A tree to store proteins and render them as a file system directory
 *
 **/


function Node(id, name, level, type, parent, children, icon, path) {
	// Node body...
	this.id = id;

	this.name = name;

	this.level = level;

	this.type = type;

	this.parent = parent;

	this.children = children;

	this.icon = icon;

	this.path = path;

	this.isInit = false;

};

/*================================== Tree =========================================*/

function Tree(id, rootName) {
	// Tree body...
	this.id = id;

	this.nodes = [];

	this.root = new Node(-1, rootName, 0, "folder");

};

Tree.prototype = {
	// prototype...
	constructor: Tree,

	// add a new node to nodes array
	addNode: function(name, level, parentName, childrenNames, path) {
		var id = this.nodes.length;
		var type, icon;

		if (name.match(/\.xml/)) {
			type = "file";
			icon = "protein.png";
		} else {
			type = "folder";
			icon = "filefolder.png";
		}

		var name = name.split(".");

		this.nodes[this.nodes.length] = new Node(id, name[0], level, type, parentName, childrenNames, icon, path);
	},

	getNodeByName: function(name) {
		for (var i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].name === name) {
				return this.nodes[i];
			}
		};
	},

	renderNode: function(node) {
		var shortname = node.name.length > 12 ? node.name.substr(0, 9) + ".." : node.name,
			img = "<img src=\"../static/img/" + node.icon + "\">",
			iconDiv = "<div class=\"factorIcon\">" + img + "</div>",
			nameDiv = "<div class=\"factorName\"><span class=\"label label-info\">" + shortname + "</span></div>",
			outerDiv = "<div class=\"factorNode\" id=\"factor-" + node.name + "\">" + iconDiv + nameDiv + "</div>";
		
		if ($("#factor-" + node.name).length == 0) {
			$("#level-" + node.level + "-" + node.parent).append(outerDiv);

			// add tooltip
			$("#factor-" + node.name + " .label").tooltip({
		      animation: true,
		      title : node.name,
		      placement : 'top',
		    });


			// bind click event
			$("#factor-" + node.name).click(function() {
				// if type is "folder"
				if (node.type === "folder") {
					// display when subtree exists
					if ($("#level-" + (node.level + 1) + "-" + node.name).length > 0) {
						$(".factorLevel").each(function() {
							$(this).css("display", "none");
						});
						$("#level-" + (node.level + 1) + "-" + node.name).css("display", "block");
						$("#level-" + (node.level + 1) + "-" + node.name).mCustomScrollbar("update");

					} else {	// else load subtree and add it to tree						
						ws.send(JSON.stringify({
							'request': 'getDirList',
					      	'dir': node.path.replace(/\\/g,"/")
						}));
					}
				} else {	// if type is "file"					
					var adder = new BiobrickAdder();
					var offset = $(this).offset();
					adder.init(node.name, "g.Shapes.Protein", offset.top, offset.left, null, node.path.replace(/\\/g,"/"));
					adder.show();

					$("#right-container").css({right: '0px'});
					var hasClassIn = $("#collapseTwo").hasClass('in');
					if(!hasClassIn) {
						$("#collapseOne").toggleClass('in');
						$("#collapseOne").css({height: '0'});
						$("#collapseTwo").toggleClass('in');
						$("#collapseTwo").css({height: "auto"});
					}	
					$("#exogenous-factors-config").css({"display": "none"});
			        $("#protein-config").css({"display": "none"});
			        $("#component-config").css({"display": "block"});
			        $("#arrow-config").css({"display": "none"});

					ws.send(JSON.stringify({
						'request' : 'getXmlJson',
						'path' : node.path.replace(/\\/g,"/")
					}));
				}
			});
		}
	},

	renderAll: function() {
		for (var i = 0; i < this.nodes.length; i++) {
			this.renderNode(this.nodes[i]);
		};		
	},

	parseSubTree: function(data) {
		var rootPathSeg = data.path.split("\\");
		var rootParentName = rootPathSeg[rootPathSeg.length - 1].split(" ").join("-");
		var rootLevel = (rootPathSeg.length - 3) + 1;
		var levelDiv = "<div class=\"factorLevel\" id=\"level-" + rootLevel + "-" + rootParentName + "\"><button class=\"btn btn-primary tree-return\" id=\"back-" + rootParentName + "\">Back</button></div>"
		$("#pFactors").append(levelDiv);
		$(".factorLevel").each(function() {
			$(this).css("display", "none");
		});
		$("#level-" + rootLevel + "-" + rootParentName).css("display", "block");
		

		var childNodes = data.files;
		for (var i = 0; i < childNodes.length; i++) {
			var pathSeg = childNodes[i].split("\\");
			var name = pathSeg[pathSeg.length - 1].split(" ").join("-");
			var level = pathSeg.length - 3;
			var parentName = pathSeg[pathSeg.length - 2].split(" ").join("-");

			this.addNode(name, level, parentName, "", childNodes[i]);
		};

		this.renderAll();

		var rootParentTreeName = rootPathSeg[rootPathSeg.length - 2].split(" ").join("-");
		$("#back-" + rootParentName).click(function(){
			$("#level-" + rootLevel + "-" + rootParentName).css("display", "none");
			$("#level-" + (rootLevel - 1) + "-" + rootParentTreeName).css("display", "block");
		});


		$("#level-" + rootLevel + "-" + rootParentName).mCustomScrollbar({
			autoHideScrollbar: true,
			theme: "light",
			advanced: {
				autoExpandVerticalScroll: true
			}
		});
	},

	parseJson: function(data) {
		this.isInit = true;
		var rootPathSeg = data[0].split("\\");
		var rootLevel = rootPathSeg.length - 3;
		var rootParentName = rootPathSeg[rootPathSeg.length - 2].split(" ").join("-");
		var levelDiv = "<div class=\"factorLevel\" id=\"level-" + rootLevel + "-" + rootParentName + "\"></div>"
		$("#pFactors").append(levelDiv);
		$("#level-" + rootLevel + "-" + rootParentName).css("display", "block");

		for (var i = 0; i < data.length; i++) {
			var pathSeg = data[i].split("\\");
			var name = pathSeg[pathSeg.length - 1].split(" ").join("-");
			var level = pathSeg.length - 3;
			var parentName = pathSeg[pathSeg.length - 2].split(" ").join("-");

			this.addNode(name, level, parentName, "", data[i]);
		};

		this.renderAll();
	}
};

/*================================== EFactors Tree =========================================*/

// EFTree, inherits the Tree
function EFTree(id, rootName) {

	// Inherits attributes
	Tree.call(this, rootName);

	this.id = id;

}

// Inherits methods
EFTree.prototype = new Tree();

EFTree.prototype.constructor = EFTree;

// Rewrite parseSubTree function
EFTree.prototype.parseSubTree = function() {};

// Rewrite addNode function 
EFTree.prototype.addNode = function(name) {
	var id = this.nodes.length;
	var type, icon;

	if (name == "Inducer") {
		type = "g.Shapes.Inducer";
		icon = "Inducer.png";
	} else if (name == "Metal-ion") {
		type = "g.Shapes.MetalIon";
		icon = "MetalIon.png";
	} else if (name == "Temperature") {
		name = "Tempt";
		type = "g.Shapes.Temperature";
		icon = "Temperature.png";
	} else if (name == "RorA") {
		type = "g.Shapes.RORA";
		icon = "RorA.png";
	} else if (name == "R") {
		type = "g.Shapes.R";
		icon = "R.png";
	} else if (name == "A") {
		type = "g.Shapes.A";
		icon = "A.png";
	}

	this.nodes[this.nodes.length] = new Node(id, name, 1, type, "EFactors", "", icon, "");
};

// Rewrite renderNode function
EFTree.prototype.renderNode = function(node) {
	var shortname = node.name.length > 12 ? node.name.substr(0, 9) + ".." : node.name,
		img = "<img src=\"../static/img/" + node.icon + "\">",
		iconDiv = "<div class=\"factorIcon\">" + img + "</div>",
		nameDiv = "<div class=\"factorName\"><span class=\"label label-info\">" + shortname + "</span></div>",
		outerDiv = "<div class=\"factorNode\" id=\"factor-" + node.name + "\">" + iconDiv + nameDiv + "</div>";
	
	if ($("#factor-" + node.name).length == 0) {
		$("#level-" + node.level + "-" + node.parent).append(outerDiv);

		// add tooltip
		$("#factor-" + node.name + " .label").tooltip({
	      animation: true,
	      title : node.name,
	      placement : 'top',
	    });


		// bind click event
		$("#factor-" + node.name).click(function() {
			var adder = new BiobrickAdder();
			var offset = $(this).offset();			
			adder.init(node.name, node.type, offset.top + 50, offset.left + 15);
			adder.show();
		});
	}
};

// Rewrite parseJson function
EFTree.prototype.parseJson = function(data) {
	var levelDiv = "<div class=\"eFactorLevel\" id=\"level-1-EFactors\"></div>"
	$("#eFactors").append(levelDiv);
	$("#level-1-EFactors").css("display", "block");

	for (var i = 0; i < data.length; i++) {
		this.addNode(data[i]);
	};
	this.renderAll();
};


/*================================== Codings Tree =========================================*/
function CodingTree(id, rootName) {
	Tree.call(this, rootName);

	this.id = id;
}

CodingTree.prototype = new Tree();
CodingTree.prototype.constructor = CodingTree;
CodingTree.prototype.parseSubTree = function() {};

CodingTree.prototype.addNode = function(name) {
	var id = this.nodes.length;
	var type, icon;
	
	this.nodes[this.nodes.length] = new Node(id, name, 1, "g.Shapes.Protein", "Codings", "", "protein.png", "");
};

CodingTree.prototype.renderNode = function(node) {
	var shortname = node.name.part_name.length > 12 ? node.name.part_name.substr(0, 9) + ".." : node.name.part_name,
		img = "<img src=\"../static/img/" + node.icon + "\">",
		iconDiv = "<div class=\"factorIcon\">" + img + "</div>",
		nameDiv = "<div class=\"factorName\"><span class=\"label label-info\">" + shortname + "</span></div>",
		outerDiv = "<div class=\"factorNode\" id=\"factor-" + node.name.part_name + "\">" + iconDiv + nameDiv + "</div>";
	
	if ($("#factor-" + node.name).length == 0) {
		$("#level-" + node.level + "-" + node.parent).append(outerDiv);

		// add tooltip
		$("#factor-" + node.name.part_name + " .label").tooltip({
	      animation: true,
	      title : node.name.part_name,
	      placement : 'top',
	    });


		// bind click event
		$("#factor-" + node.name.part_name).click(function() {
			// if type is "folder"
			var adder = new BiobrickAdder();
			var offset = $(this).offset();
			adder.init(node.name.part_name, "g.Shapes.Protein", offset.top, offset.left, node.name);
			adder.show();

			$("#right-container").css({right: '0px'});
			var hasClassIn = $("#collapseTwo").hasClass('in');
			if(!hasClassIn) {
				$("#collapseOne").toggleClass('in');
				$("#collapseOne").css({height: '0'});
				$("#collapseTwo").toggleClass('in');
				$("#collapseTwo").css({height: "auto"});
			}	
			$("#exogenous-factors-config").css({"display": "none"});
	        $("#protein-config").css({"display": "none"});
	        $("#component-config").css({"display": "block"});
	        $("#arrow-config").css({"display": "none"});

	        resetConfig();
	        $("input[name=part_id]").attr({
                'value': node.name.part_id
            });
            $("input[name=part_name]").attr({
                'value': node.name.part_name
            });
            $("input[name=part_short_name]").attr({
                'value': node.name.part_short_name
            });
            $("input[name=part_short_desc]").attr({
                'value': node.name.part_short_desc
            });
            $("input[name=part_type]").attr({
                'value': node.name.part_type
            });
            $("input[name=part_status]").attr({
                'value': node.name.part_status
            });
            $("input[name=part_results]").attr({
                'value': node.name.part_results
            });
            $("input[name=part_nickname]").attr({
                'value': node.name.part_nickname
            });
            $("input[name=part_rating]").attr({
                'value': node.name.part_rating
            });
            $("input[name=part_author]").attr({
                'value': node.name.part_author
            });
            $("input[name=part_entered]").attr({
                'value': node.name.part_entered
            });
            $("input[name=part_quality]").attr({
                'value': node.name.best_quality
            });
		});
	}
};

CodingTree.prototype.parseJson = function(data) {
	var levelDiv = "<div class=\"eFactorLevel\" id=\"level-1-Codings\"></div>"
	$("#codings").append(levelDiv);
	$("#level-1-Codings").css("display", "block");

	for (var i = 0; i < data.length; i++) {
		this.addNode(data[i]);
	};

	this.renderAll();
};

/*================================== Creation =========================================*/
// create a tree
var proteinList = new Tree("protein", "protein");

// create a EFTree
var eFactorList = new EFTree("eFactors", "eFactors");
var data = ["Inducer", "Metal-ion", "Temperature", "R", "A"];
eFactorList.parseJson(data);

// create a CodingTree
var codingList = new CodingTree("codings", "codings");