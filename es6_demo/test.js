function text(callback){
    var a={
        aa:'hh',
        bb:function(){
            callback()
        }
    }
}

function tt(){
    console.log(1)
}


text(tt())


