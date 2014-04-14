// if the filename is stupid, postpone writing it
var fs=require('fs')
var makedir = require('makedir');

module.exports=function(task,cb){
    if(!task.write_out){
        return cb(null,task)
    }
    var path = task.newpath

    function write_file(err){
        if(err) throw new Error (err);
        fs.readFile(task.file,
                    function(e,buf){
                        fs.writeFile(task.newpath+'/'+task.newname,buf,function(e){
                            if(e) throw (e)
                            return cb(null,task)
                        })
                        return null
                    })
        return null
    }
    makedir.makedir(path,write_file)
    return null
}
