function launchCenter(url, name, height, width) 
	{
		var str = "height=" + height + ",innerHeight=" + height;
		str += ",width=" + width + ",innerWidth=" + width;
		if (window.screen) 
		{
			var ah = screen.availHeight - 30;
			var aw = screen.availWidth - 10;

			var xc = (aw - width) / 2;
			var yc = (ah - height) / 2;

			str += ",left=" + xc + ",screenX=" + xc;
			str += ",top=" + yc + ",screenY=" + yc;
		}
		return window.open(url, name, str);
	}


	function count_keywords(str)
	{
	   var words = str.toLowerCase().replace(/[:;,`'\.\\\/\?<>\|\"\t=\(\)\{\}\[\]\!]/g,' ').split(' ');//[^a-zA-Z0-9]
	   var assoc = new Array();
	   total_words=words.length;
	   for (i=0; i<total_words; i++)
	   {
		  if (!words[i])
			 continue;
		  if (assoc[words[i]] == null)
			 assoc[words[i]]=0;
		  assoc[words[i]]++;
		  
		  //console.log("count_keywords -- " + words[i] + " : " + assoc[words[i]]);
	   }
	   return sort_by_num_val(assoc);
	}
	
	function sort_by_num_val(assoc)
	{//using objects
		var dict = new Array();
		for (k in assoc)
		{
			//console.log("sort_by_num_val -- " + k + " : " + assoc[k]);
			dict.push([k,assoc[k]]);
		}
		
		var arr = new Array();
		for (var i = 0;i < dict.length;i++) 
		{
			arr.push({k:dict[i][0],v:dict[i][1]});
		}
		return arr.sort(function(x,y){return y.v-x.v})
	}
	
	function setLS(key, value) 
	{
		try 
		{
			//console.log("Inside setItem: " + key + ":" + value);
			window.localStorage.removeItem(key);
			window.localStorage.setItem(key, value);
		}
		catch(e) 
		{
			console.log("Error inside setItem");
			console.log(e);
		}
		//console.log("Return from setItem: " + key + ":" +  value);
	}
  
	function getLS(key) 
	{
		var value = null;
		//console.log('Get Item:' + key);
		try 
		{
			value = localStorage.getItem(key);
		}
		catch(e) 
		{
			console.log("Error inside localStorage.getItem() for key:" + key);
			console.log(e);
			value = null;
		}
		//console.log("Returning value: " + value);
		return value;
    }
	
	function remove_ls(key) 
	{
		try 
		{
			window.localStorage.removeItem(key);
		}
		catch(e) 
		{
			console.log("Error inside remove_ls() for key:" + key);
			console.log(e);
		}
    }
	
	function get_ls_json(key)
	{
		var val = get_ls(key);
			
		console.log("get_ls_json val: " + val);
		
		if(null == val)
		{
			val = {};
		}
		
		try
		{
			val = JSON.parse(val);
		}
		catch(e)
		{
			console.log("get_ls_json: error in JSON.parse(val)");
			console.log(e);
		}
		return val;
	}