import moment from 'moment'
export default{
    //时间格式转化
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
    }//相对时间(支持标准时间、CST时间、'2018-10-01 12:02:23'、时间戳)
}

