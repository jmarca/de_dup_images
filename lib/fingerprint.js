// create a fingerprint

module.exports=function(task,cb){
    task.id = JSON.stringify(task.exif)
    return cb(null,task)
}
