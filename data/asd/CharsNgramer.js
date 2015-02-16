
Ext.define('Ngram', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'token',  type: 'string'},
        {name: 'count',   type: 'int'}
    ]
});

Ext.define('CharsNgramer', {
    name: 'Unknown',

    constructor: function(txt,stopWords) {
        try{
			console.log("CharsNgramer.initialize");
			
			//console.log("txt: " + txt);

			this.text = txt.toLowerCase();
			//this.tokens = [];
			//this.lowerTokens = [];
			//this.lowerTokensNoSeps = [];
			//this.tokenPosNoSeps = new Ext.util.HashMap();
			this.ngrams = [];
			//this.stopWords = stopWords;
			//this.separators = [" ",".",",",":",";","`","'"," ","\\","/","?","@","$","#","<",">","|","\"","“","”","»","©","\n","\r","\t","=","(",")","{","}","[","]","!","-"];
			//this.tokenize();
		}
		catch(e){
			console.log("Ngramer.initialize ERROR: " + e);
		}

        return this;
    },

    isStopWord : function(word){
		return (this.stopWords.indexOf(word) === -1) ? false : true;
	},
	
	
	getNextNgram : function(pos,len){
		var tag = "";
		var lim = pos + len;
		if(lim > this.text.length){
			return tag;
		}
		for(var i = pos;i < lim;i++){
			tag += this.text[i];
		}
		return Ext.String.trim(tag);
	},
	
	getTokensCount : function(ngramLen){
		ngramLen = parseInt(ngramLen);
		var ngramCount = Ext.create('Ext.data.Store', {
			model: 'Ngram',
		});

		if(ngramLen == 1){
			
			for(var i = 0;i < this.text.length;i++){
				var ngram = this.text[i];
				var count = ngramCount.findRecord('token',ngram);
				if(count == null){
					console.log("count == null ngram: " + ngram)
					ngramCount.add({token:ngram,count:1});
				}
				else{
					console.log("ngram: " + ngram + " count: " + (count.get('count') + 1));
					ngramCount.remove(count);
					count.set('count',count.get('count') + 1);
					ngramCount.add(count);
				}
				//ngramCount.add({token:keys[i],count:this.tokenPosNoSeps.get(keys[i]).length});
			}
		}
		else{
			
			for(var i = 0;i < this.text.length;i++){
				var ngram = this.getNextNgram(i,ngramLen);
				var count = ngramCount.findRecord('token',ngram);
				if(count == null){
					console.log("count == null ngram: " + ngram)
					ngramCount.add({token:ngram,count:1});
				}
				else{
					console.log("ngram: " + ngram + " count: " + (count.get('count') + 1));
					ngramCount.remove(count);
					count.set('count',count.get('count') + 1);
					ngramCount.add(count);
				}
				//ngramCount.add({token:keys[i],count:this.tokenPosNoSeps.get(keys[i]).length});
			}
		}
		
		
		return ngramCount;
	}
});
