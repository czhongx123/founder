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
    },//将数组中有相同属性的子集合并(并去重)
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
    aa(){

    }
}

