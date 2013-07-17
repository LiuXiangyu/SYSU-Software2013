var data =  [];
var size=0;//整个序列的长度
var colors=['#afcc22','#82d8ef','#80bd91'];//环形图有色色块的颜色
var raw_data={
    "DnaComponent": {
        "description": "undefined",
        "annotaions": [{"SequenceAnnotation": {"bioStart": "49",
                    "subComponent": {
                        "DnaComponent": {
                            "displayId": "4932",
                            "uri": "http: //partsregistry.org/Part: BBa_E1010",
                            "type": "Coding",
                            "description": "**highly**engineeredmutantofredfluorescentproteinfromDiscosomastriata(coral)",
                            "name": "BBa_E1010"
                        }
                    },
                    "uri": "http: //sbols.org/",
                    "strand": "+",
                    "bioEnd": "730"
                }
            },{
                "SequenceAnnotation": {
                    "bioStart": "736",
                    "subComponent": {
                        "DnaComponent": {
                            "displayId": "144",
                            "uri": "http: //partsregistry.org/Part: BBa_B0011",
                            "type": "Terminator",
                            "description": "LuxICDABEG(+/-)",
                            "name": "BBa_B0011"
                        }
                    },
                    "uri": "http: //sbols.org/",
                    "strand": "+",
                    "bioEnd": "782"
                }
            }
        ],
        "uri": "http: //sbol.org/",
        "DnaSequence": {
            "nucleotides": "GAATTCGCGGCCGCTTCTAGATGGCCGGCGAATTCGCGGCCGCTTCTAGatggcttcctccgaagacgttatcaaagagttcatgcgtttcaaagttcgtatggaaggttccgttaacggtcacgagttcgaaatcgaaggtgaaggtgaaggtcgtccgtacgaaggtacccagaccgctaaactgaaagttaccaaaggtggtccgctgccgttcgcttgggacatcctgtccccgcagttccagtacggttccaaagcttacgttaaacacccggctgacatcccggactacctgaaactgtccttcccggaaggtttcaaatgggaacgtgttatgaacttcgaagacggtggtgttgttaccgttacccaggactcctccctgcaagacggtgagttcatctacaaagttaaactgcgtggtaccaacttcccgtccgacggtccggttatgcagaaaaaaaccatgggttgggaagcttccaccgaacgtatgtacccggaagacggtgctctgaaaggtgaaatcaaaatgcgtctgaaactgaaagacggtggtcactacgacgctgaagttaaaaccacctacatggctaaaaaaccggttcagctgccgggtgcttacaaaaccgacatcaaactggacatcacctcccacaacgaagactacaccatcgttgaacagtacgaacgtgctgaaggtcgtcactccaccggtgcttaataaACCGGCagagaatataaaaagccagattattaatccggcttttttattatttACCGGTTAATACTAGTAGCGGCCGCTGCAG",
            "uri": "http: //sbols.org/"
        },
        "displayId": "undefined",
        "name": "undefined"
    }
};
var seq=raw_data.DnaComponent.DnaSequence.nucleotides;
function sortNumber(a, b)//用于数组排序的函数
{
	return a.start - b.start;
}

function turnRawDatatoData(raw)//把原始数据json转化为可以生成环形图的数组的函数
{                               //The function that can turn raw json data to array that can generate donut
	var tempArray=[];
	size=raw.DnaComponent.DnaSequence.nucleotides.length;
	for(i=0;i<raw.DnaComponent.annotaions.length;i++)
	{
		tempArray[i]={};
		tempArray[i].start=parseInt(raw.DnaComponent.annotaions[i].SequenceAnnotation.bioStart,10);
		tempArray[i].name=raw.DnaComponent.annotaions[i].SequenceAnnotation.subComponent.DnaComponent.name;
		tempArray[i].end=parseInt(raw.DnaComponent.annotaions[i].SequenceAnnotation.bioEnd,10);
		tempArray[i].value=parseInt((tempArray[i].end-tempArray[i].start)/size*100,10);
	}		
	tempArray=tempArray.sort(sortNumber);
	var real_data=[];
	var start=0;
	var index=0;
	for(i=0;i<tempArray.length;i++)
	{
		real_data[index]={name:index,color:"#f4f4f4"};
		real_data[index].start=start;
		real_data[index].end=tempArray[i].start-1;		
		real_data[index].value=parseInt((real_data[real_data.length-1].end-real_data[real_data.length-1].start)/size*100,10);
		if(real_data[index].value===0)
			real_data[index].value=1;
		index=index+1;
		real_data[index]=tempArray[i];
		real_data[index].color=colors[i%2];
		index=index+1;
		start=tempArray[i].end+1;
		if(i==tempArray.length-1)
		{
			real_data[index]={name:index,color:"#f4f4f4"};
			real_data[index].start=start;
			real_data[index].end=size-1;
			real_data[index].value=parseInt((real_data[real_data.length-1].end-real_data[real_data.length-1].start)/size*100,10);
		}
	}	
	//console.log(real_data);
	tempArray=null;
	return real_data;
}
function getRawData()//to get the raw data of plasmid
{
		
}
function initDrawChart(){
	getRawData();
	data=turnRawDatatoData(raw_data);	
	var chart = new iChart.Donut2D({
		animation:true,
		render : 'canvasDiv',//图表渲染的HTML DOM的id //Chart rendering the HTML DOM id
		center:{
			text:raw_data.DnaComponent.name+'\n'+seq.length+'bp',
			shadow:true,
			shadow_offsetx:0,
			shadow_offsety:2,
			shadow_blur:2,
			shadow_color:'#b7b7b7',
			color:'#6f6f6f'
		},
		//offset_angle: 270,
		data: data,//图表的数据源 //Chart data source
		offsetx:0,
		shadow:false,
		background_color:'#f4f4f4',
		separate_angle:0,//分离角度 //Separation angle
		tip:{
			enable:true,
			showType:'fixed',
			animation:true,
			listeners:{
				parseText:function(tip,name,value,text){
                    var str= "";
					if(typeof(name)!="number"){						
						str=name+"<br\/>";
					}
					for(i=0;i<data.length;i++){
						if(data[i].name==name){
							if(typeof(data[i].name)=="number")
							{
								str=str+data[i].start+" to "+data[i].end;
								if(i!==0){
									str=str+"<br\/>"+seq.substring(data[i].start-1,data[i].end+1);
								}
								else
								{
									str=str+"<br\/>"+seq.substring(data[i].start,data[i].end+1);
								}
							}else
							{
								str=str+data[i].start+" to "+data[i].end;
								str=str+"<br\/>"+seq.substring(data[i].start,data[i].end);
							}							
							break;
						}
					}
					return str;
				}
			}
		},
		sub_option:{
			/*mini_label_threshold_angle : 40,//迷你label的阀值,单位:角度
			mini_label:{//迷你label配置项
				fontsize:20,
				fontweight:600,
				color : '#ffffff'				
			},*/
			label : {
				background_color:null,
				sign:true,//设置禁用label的小图标
				padding:'0 4',
				border:{
					enable:false,
					color:'#666666'
				},
				fontsize:11,
				fontweight:600,
				color : '#4572a7',		
			},
			color_factor : 0.3,
			listeners:{
				click:function(l,e,m){
					if(e["event"]["button"]===0&&typeof(l.get('name'))!="number")
					{
						for(i=0;i<data.length;i++){
							if(data[i].name==l.get('name')){
								window.clipboardData.setData("Text",seq.substring(data[0].start-1,data[i].end+1)); 
								//alert(seq.substring(data[i]["start"]-1,data[i]["end"]+1));
								break;
							}
						}
					}
					//console.log(e);
					//手动调用重绘
					//chart.draw();
				}
			}
		},
		showpercent:true,
		decimalsnum:0,
		width : 783,
		height : 400,
		radius:140
	});
	chart.draw();
	
	document.getElementById('seqCurrentText').value=seq;
}
var left=1;
var textLen=60;
function seqTextOnClickHandler(obj){	
	left=parseInt((document.getElementById('seqCurrentText').scrollLeft/document.getElementById('seqCurrentText').scrollWidth)*size,10)+1;
	updateSeqPosText();
}
function createDivStrByData()
{
	var str='';
	var temp=0;
	for(i=0;i<data.length;i++){
		if(typeof(data[i].name)=="number")
		{
			if(i===0)
			{
				str=str+'<span style="color:black;">'+seq.substring(data[i].start,data[i].end+1)+"</span>";
			}else
			{
				str=str+'<span style="color:black;">'+seq.substring(data[i-1].end,data[i].end+1)+"</span>";
			}
		}else{			
			str=str+'<span style="color:'+colors[temp%2]+';">'+seq.substring(data[i].start,data[i].end)+"</span>";
			temp=temp+1;
		}
	}
	return str;
}
function updateSeqPosText(){
	document.getElementById('x1').innerText=left;
	document.getElementById('x2').innerText=left+45;
	document.getElementById('x3').innerText=left+90;
	document.getElementById('x4').innerText=left+135;
}
function InitAjax()
{
var ajax=false;
try {
   ajax = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
   try {
    ajax = new ActiveXObject("Microsoft.XMLHTTP");
   } catch (E) {
    ajax = false;
   }
}
if (!ajax && typeof XMLHttpRequest!='undefined') {
   ajax = new XMLHttpRequest();
}
         return ajax;
     }

function getUserName()
{　	
	var url = "/show.php?id="+ newsID;
	//获取新闻显示层的位置
	var show = document.getElementById("show_news"); 
	show.style.visibility = "visible";
	//实例化Ajax对象
	var ajax = InitAjax();
	//使用Get方式进行请求
	ajax.open("GET", url, true); 
	//获取执行状态
	ajax.onreadystatechange = function() { 
	//如果执行是状态正常，那么就把返回的内容赋值给上面指定的层
    if (ajax.readyState == 4 && ajax.status == 200) { 
　　 	show.innerHTML = ajax.responseText; 
　   } else {
         // 显示loading效果
         document.getElementById("show").innerHTML = img;
     }
   }
　	//发送空
　	ajax.send(null); 
}
$(function(){
	initDrawChart();	
	document.getElementById('sequenceDiv').innerHTML=createDivStrByData();	
	InitAjax();
	// save or load by WebSocket
	  if ("WebSocket" in window) {
		ws = new WebSocket("ws://" + document.domain + ":5000/ws");
		ws.onmessage = function(msg) {
		   var message = JSON.parse(msg.data);
		 	console.log(message);
		};
	  }
	  ws.onopen = function() {
		ws.send(JSON.stringify({'request': 'getLoginedUserName'}));
	  }
});
