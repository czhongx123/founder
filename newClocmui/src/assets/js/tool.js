import $ from 'jquery'

export default{
    sortAll:function(arr){
        var arrNumber=[];
        var arrZimu=[];
        var arrHanzi=[];
        var regZimu=/^[a-zA-Z].*/
        for(var m=0;m<arr.length;m++){
            if(regZimu.test(arr[m].substring(0,1))){
                arrZimu.push(arr[m])
            }else if(isRealNum(arr[m].substring(0,1))){
                arrNumber.push(arr[m])
            }else{
                arrHanzi.push(arr[m])
            }
        };
			arrNumber=arrNumber.sort();
            arrZimu=this.sortPinYin(arrZimu)
			arrHanzi=this.pySegSort(arrHanzi)
			var arrM=arrZimu.concat(arrHanzi)
			var arrMn=[]
			 for(var x=0;x<arrM.length;x++){
				arrMn.push(arrM[x].letter)
			 }
			arrMn=[... new Set(arrMn.sort())]
			
			var objn={}
			var arrN=[]
			for(var y=0;y<arrMn.length;y++){
				for(var h=0;h<arrM.length;h++){
					if(arrMn[y]==arrM[h].letter){
						objn.letter=arrM[h].letter
						objn.data=arrM[h].data
						arrN.push(objn)
						objn={}
					}
				}
			
			}
			var arr3=arrN
			var arr4=[]
			for(var j=0;j<arr3.length;j++){
                arr4.push(arr3[j].letter)
                arr4=arr4.concat(arr3[j].data)
            }
            var arr5=[]
            for(var k=0;k<arr4.length;k++){
                if(arr4[k]!=undefined && arr4[k]!=''){
                    arr5.push(arr4[k])
                }
            }
            

            arr4=[... new Set(arrNumber.concat(arr5))]
			
			return arr4
			
			
			
			
			
        function isRealNum(val) {
            if(val=='' || val==null){
                return false;
            }
            if(!isNaN(val)){
                return true;
            }else{
                return false
            }
        };//
    },
    pinToH(item){
        switch(item){
            case "A":
                return "俺";
            case "B":
                return "不";
            case "C":
                return "陈";
            case "D":
                return "都";
            case "E":
                return "饿";
            case "F":
                return "发";
            case "G":
                return "给";
            case "H":
                return "好";
            case "I":
                return "I";
            case "J":
                return "就";
            case "K":
                return "看";
            case "L":
                return "里";	
            case "M":
                return "忙";
            case "N":
                return "你";
            case "O":
                return "哦";
            case "P":
                return "怕";
            case "Q":
                return "请";
            case "R":
                return "人";
            case "S":
                return "是";
            case "T":
                return "他";
            case "U":
                return "U";	
            case "V":
                return "V";
            case "W":
                return "我";
            case "X":
                return "想";
            case "Y":
                return "要";
            case "Z":
                return "中";
        }
    
    },
    sortPinYin(arr) {
        var arr1=[];
        var arr2=[];
        var obj1={};
        for(var i=0;i<arr.length;i++){
            arr2.push(this.pinToH(arr[i].substring(0,1).toUpperCase())+arr[i])
        }
        
        var arr3=[]
        var arr4=[]
        for(var j=0;j<arr2.length;j++){
            if(arr2[j].substring(0,1)!="I" && arr2[j].substring(0,1)!="U" && arr2[j].substring(0,1)!="V"){
                arr3.push(arr2[j])
            
            }else{
                arr4.push(arr2[j])
            }
            
        }
        arr3=this.pySegSort(arr3)
        for(var k=0;k<arr3.length;k++){
            for(var m=0;m<arr3[k].data.length;m++){
                arr3[k].data[m]=arr3[k].data[m].substring(1)
            }
        
        }
        
        var arr5=[]
        var objx={};
        for(var n=0;n<arr4.length;n++){
            objx.letter=arr4[n].substring(0,1);
            objx.data=[];
            objx.data.push(arr4[n].substring(1))
            arr5.push(objx);
            objx={}
        }
        
        var arr6=arr5.concat(arr3)
        
        return arr6
        
        
    },//对拼音排序
    pySegSort(arr,empty) {
        if(!String.prototype.localeCompare)
               return null;
           var letters = "*abcdefghjklmnopqrstwxyz".split('');
           var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨他穵夕丫帀".split('');
           var segs = [];
           var curr;
           $.each(letters, function(i){
               curr = {letter: this, data:[]};
               $.each(arr, function() {
                   if((!zh[i-1] || zh[i-1].localeCompare(this) <= 0) && this.localeCompare(zh[i]) == -1) {
                      if(this!=undefined && this!=''){
                        curr.data.push(this);
                        }
                   }
               });
               if(empty || curr.data.length) {
                   segs.push(curr);
                   curr.data.sort(function(a,b){
                       return a.localeCompare(b);
                   });
               }
           });
        
        for(var i=0;i<segs.length;i++){
         segs[i].letter=segs[i].letter.toLocaleUpperCase()
        }
       return segs;
    }
}



