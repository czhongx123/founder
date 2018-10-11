import moment from 'moment'
import _ from 'lodash'
export default{
    //================时间格式转化==========
    relativeTimeFormat:function(data){
        var dateNow=new Date();
        dateNow=moment(dateNow).format('YYYY-MM-DD');
        var yesterday=moment(data).format('YYYY-MM-DD');
        var strDayName='';
        var lessDay=moment(dateNow).diff(moment(yesterday),'days');
        switch(lessDay){
            case 0 :strDayName="今天"+moment(data).format("HH:mm:ss");break;
            case 1 :strDayName="昨天"+moment(data).format("HH:mm:ss");break;
            case 2 :strDayName="前天"+moment(data).format("HH:mm:ss");break;
            default:strDayName=moment(data).format("YYYY-MM-DD HH:mm:ss");break;
        }
        return strDayName
    },//相对时间(支持标准时间、CST时间、'2018-10-01 12:02:23'、时间戳)
    dataFormat(strDate){
        if(null==strDate || ''==strDate || undefined==strDate){
            return false
        }
        var dateStr=strDate.split(' ');
        var strGMT=dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[0]
        var date=new Date(Date.pase(strGMT))
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },//将CMT 格式的时间转换为'2018-10-01 12:02:21'
    dataTimeFormat(data){
        return moment(data).format('YYYY-MM-DD HH:mm:ss');
    },//将时间戳转换为'2018-10-01 12:02:21'
    curDayStartTime(){
        return moment().format('YYYY-MM-DD 00:00:00');
    },//获取当天的零点时间
    curDayEndTime(){
        return moment().format('YYYY-MM-DD 24:00:00');
    },//获取当天的24点时间
    curTimeDurationEnd(start,end){
        var diff = '';
        var time_diff = new Date(end).getTime() - new Date(start).getTime(); //时间差的毫秒数 
  
         //计算出相差天数 
         var days = Math.floor(time_diff / (24 * 3600 * 1000));
         if (days > 0) {
         diff += days + '天';
         }
         //计算出小时数 
         var leave1 = time_diff % ( 24 * 3600 * 1000); 
         var hours = Math.floor(leave1 / (3600 * 1000));
         if (hours > 0) {
            diff += hours + '小时';
         } else {
             if (diff !== '') {
              diff+= hours + '小时';
             }
         }
         //计算相差分钟数 
         var leave2 =leave1 % (3600 * 1000);
         var minutes = Math.floor(leave2 / (60 * 1000));
         if (minutes > 0) {
            diff += minutes + '分';
         } else {
             if (diff !== '') {
              diff += minutes + '分';
             }
         }
         //计算相差秒数 
         var leave3 = leave2%(60*1000);
         var seconds = Math.round(leave3/1000);
         if (seconds > 0) {
            diff += seconds + '秒';
         } else {
             if (diff !== '') {
              diff += seconds + '秒';
             }
         }
  
         return diff;
    },//两个时间点的时间差（精确）
    timeDifc(start,end){
        let starts = new Date(start),ends = new Date(end),message = '';
        if (starts.getTime() > ends.getTime())
        return message = "现在的时间小于以前的时间!";
         
        if ((ends.getTime() - starts.getTime())/(1000*60) < 1)
        return message = "刚刚";//小于1分钟显示为"刚刚"
         
        if (ends.getFullYear() > starts.getFullYear() && ends.getMonth() >= starts.getMonth())
        message += ends.getFullYear() - starts.getFullYear() + "年";
         
        if (ends.getMonth() > starts.getMonth() && ends.getDate() >= starts.getDate())
        message += ends.getMonth() - starts.getMonth() + "个月";
         
        if (ends.getDate() > starts.getDate() && ends.getHours() >= starts.getHours())
        message += ends.getDate() - starts.getDate() + "天";
         
        if (ends.getHours() > starts.getHours() && ends.getMinutes() >= starts.getMinutes())
        message += ends.getHours() - starts.getHours() + "小时";
        if (ends.getMinutes() > starts.getMinutes())
        message += ends.getMinutes() - starts.getMinutes() + "分钟";
        return message;
    },//两个时间点的时间差（范围）
    getLastSomeDays(n){
        let date = [] 
        date.push(moment().subtract('days', n).format('YYYY-MM-DD')) ;
        date.push(moment().subtract('days', 1).format('YYYY-MM-DD')) ;
        return date
    },//获取最近n天的开始结束时间
    getLastWeekDays(){
        let date = [] 
        let weekOfday = parseInt(moment().format('d')); // 计算今天是这周第几天  周日为一周中的第一天 
        let start = moment().subtract(weekOfday + 6, 'days').format('YYYY-MM-DD '); // 周一日期  
        let end = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD'); // 周日日期  
        date.push(start);
        date.push(end);
        return date;
    },// 获取上一周的开始结束时间
    getLastMonthDays(){
        let date = [];  
        let start = moment().subtract('month', 1).format('YYYY-MM') + '-01';  
        let end = moment(start).subtract('month', -1).add('days', -1).format('YYYY-MM-DD');  
        date.push(start);  
        date.push(end);  
        return date;
    },//获取上一个月的开始结束时间
    getCurrWeekDays(){
        let date = []  
        let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天 周日为一周中的第一天  
        let start = moment().subtract(weekOfday, 'days').format('YYYY-MM-DD') // 周一日期  
        let end = moment().add(7 - weekOfday - 1, 'days').format('YYYY-MM-DD') // 周日日期  
        date.push(start)  
        date.push(end)  
        return date
    },//获取当前周的开始结束时间
    getCurrMonthDays(){
        let date = []  
        let start = moment().add('month', 0).format('YYYY-MM') + '-01'  
        let end = moment(start).add('month', 1).add('days', -1).format('YYYY-MM-DD')  
        date.push(start)  
        date.push(end)  
        return date
    },//获取当前月的开始结束时间
    getCurrYearDays(){
        let date = []  
        let start = moment().format('YYYY-01-01 00:00:00') 
        let end = moment().format('YYYY-12-31 24:00:00')  
        date.push(start)  
        date.push(end)  
        return date
    },//获取当前年的开始结束时间
    countDownTime(end){
        let result
        let Time=new Date(end).getTime() - new Date().getTime();
        let d=addNumber(Math.floor(Time/1000/60/60/24));
        let h=addNumber(Math.floor(Time/1000/60/60%24));
        let m=addNumber(Math.floor(Time/1000/60%60));
        let s=addNumber(Math.floor(Time/1000%60));
            
        function addNumber(num){
            var num1=(num>9) ?'' : ('0'+num);
            return num1;
        }
        result=d+"天"+h+'小时'+m+"分"+s+'秒'
        return result
    },//倒计时(只获取时间差)



    //===========================数组的处理=======================================
    ArrRemoveRepeat(arr,key){
        return _.uniqBy(arr,key)
    },//数组去重['aa','ss','ss']数组不需要传入key参数，[{aa:'ss'},{aa:'ss'}]需要传入参数'aa'
    ArrSort(arr,positive,isIncludeObj,key){
        let result,arrEnd;
        if(isIncludeObj){
            arrEnd=_.sortBy(arr, function(item) { 
                result= positive ? item[key] : -item[key]
                return result;        
              });
        }else{
            arrEnd=_.sortBy(arr, function(item) { 
                result= positive ? item : -item  
                return result;             
              });
        }
        return arrEnd
  
    },//数组排序(positive:true表示正序，isIncludeObj：true表示内含对象，key表示对象需要排序的属性)
    arrSameKeyMerge(arr,sameKey,targetKey){
       
        for( var i=0;i<arr.length;i++){
            for(var j=0;j<arr.length;j++){
                if(arr[i][sameKey]==arr[j][sameKey]){
                    arr[i][targetKey]=arr[i][targetKey].concat(arr[j][targetKey])
                    arr[i][targetKey]=_.uniqBy(arr[i][targetKey])
                }
            }
            
        }
        
        return _.uniqBy(arr,sameKey)
    },//将数组中有相同属性的子集合并(并去重)[{aa:[{ss:'ss'}],bb:'s'},{aa:[{d:'dd'}],bb:'s'}]合并为
    //[{bb:'s'},aa:[{d:'dd'},{ss:'ss'}]]
    //===========================对象的处理==========================
    //===========================字符串的处理========================
    isRealNum(val){
        if(val === "" || val ==null){
            return false;
        }
        if(!isNaN(val)){
            return true;
        }else{
            return false;
        }
    },//判断是否为数字
    isLetter(val){
        var reg= /^[A-Za-z]/;
        if (reg.test(val)){
            return true
        }else{
            return false
        }
    },//判断第一个字符是否为字母
    isArr(data){
        return _.isArray(data)
    },//是否是数组
    isBoolean(data){
        return _.isBoolean(data)
    },//是否是布尔类型
    isDate(data){
        return _.isDate(data)
    },//是否日期类型(有局限，用时先测试)
    isInteger(data){
        return Number.isInteger(data)
    },//判断是否为整数
    targetStart(data,targetKey){
        return _.startsWith(data,targetKey)
    },//是否以给定的字符串开头
    targetEnd(data,targetKey){
        return _.endsWith(data,targetKey)
    },//是否以给定的字符串结尾
    aa(){

    }
}

