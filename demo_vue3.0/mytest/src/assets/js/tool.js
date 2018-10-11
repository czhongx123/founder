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
    curTimeDurationEnd(){

    },//当前时间距当天结束差的时间
    timeDuration(){

    },//两个时间点的时间差
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
    arrSameKeyMerge(arr,key){
        let result
        return result
    },//将数组中有相同属性的子集合并(并去重)[{aa:[ss:'ss'],bb:'s'},{aa:[d:'dd'],bb:'s'}]
    //===========================对象的处理==========================
    //===========================字符串的处理==========================
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
    targetStart(data,targetKey){
        return _.startsWith(data,targetKey)
    },//是否以给定的字符串开头
    targetEnd(data,targetKey){
        return _.endsWith(data,targetKey)
    },//是否以给定的字符串结尾
    aa(){

    }
}

