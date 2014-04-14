// if the filename is stupid, postpone writing it
var path = require('path')

module.exports=function(task,cb){
    if(!task.write_out){
        //test if filename is stupid
        // isolate the end of the file
        var fileparts = task.file.split('/')
        var filename = fileparts[fileparts.length - 1]
        if(filename.length>20){
            // stupid md5 or sha1 name, so skip
            task.goodname=false
        }else{
            task.goodname=true
        }
    }else{
        task.goodname=true
    }
    return cb(null,task)
}
