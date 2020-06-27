// ToDo
// search_wordが空白区切りの場合

new Vue({
    el: '#app',
    data: {
        items:null,
        search_word: '',
        buttons:[
            {'name':'メラ'},
            {'name':'ヒャド'},
            {'name':'ギラ'},
            {'name':'バギ'},
            {'name':'イオ'},
            {'name':'ドルマ'},
            {'name':'デイン'},
            {'name':'ジバリア'},
        ],
        isPrimary:[false,false,false,false,false,false,false,false],
        isOutline:[true,true,true,true,true,true,true,true],
    },
    methods:{
        consoleLog:function(){
            console.log(this.search_word);
        },
        clickButton:function(i){
            const n = this.buttons[i].name
            if( this.search_word.indexOf(n) != -1 ){
                this.search_word = this.search_word.replace(n,"");
                this.search_word = this.search_word.replace("  "," ");//半角空白2つ
                this.isPrimary[i] = false;
                this.isOutline[i] = true;
            }else{
                this.search_word = this.search_word + " " + n;
                this.isPrimary[i] = true;
                this.isOutline[i] = false;
            }
        },
        filterAttr: function(item){
            let filtered = [];
            this.search_word = this.search_word.replace("  "," ");//半角空白2つ
            this.search_word = this.search_word.replace("　"," ");//全角
            let keywords = this.search_word.split(" ").filter(n=>n!=="");
            for(let i in item.attr){
                if( keywords.length !== 0 ){
                    for( let k in keywords ){
                        if( item.attr[i].indexOf(keywords[k]) !== -1 ){
                            filtered.push(item.attr[i]);
                            break;
                        }
                    }    
                }else{
                    filtered.push(item.attr[i]);
                }
            }
            return filtered;
        },
        filterArms: function(items){
            let filtered = [];
            this.search_word = this.search_word.replace("  "," ");//半角空白2つ
            this.search_word = this.search_word.replace("　"," ");//全角
            let keywords = this.search_word.split(" ").filter(n=>n!=="");
            for(let i in items){
                if( keywords.length !== 0 ){
                    for( let k in keywords ){
                        if( filtered.indexOf(items[i]) !== -1 ){
                            break;
                        }
                        for(let j in items[i].attr){
                            if( items[i].attr[j].indexOf(keywords[k]) !== -1 ){
                                filtered.push(items[i]);
                                break;
                            }
                            if( items[i].name.indexOf(keywords[k]) !== -1 ){
                                filtered.push(items[i]);
                                break;
                            }
                        }
                    }
                }else{
                    filtered.push(items[i]);
                }
            }
            return filtered;
        },
    },
    computed: {
    },
    mounted: function(){
        axios.get("./arms.json").then(
            response => ( this.items = response.data )
        );
    }
});