var should=require('should')
var check = require('../lib/filename_checker')

describe('check filename',function(){
    var files =['files/SAM_0183.JPG'
               ,'test/files/dsc00014.jpg'
               ,'files/cddf683e0869c9518f0f0c7aca4690e1.jpg'
               ,'test/files/25448552f6241411c7751c4f60f508974e0effe7.JPG'
               ]
    it('should pass camera-generated filenames',function(done){
        check({file:files[0]},function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('goodname',true)
            return done()
        })
    })
    it('should pass camera-generated filenames',function(done){
        check({file:files[1]},function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('goodname',true)
            return done()
        })
    })
    it('should skip my stupid sha1/md5 filenames',function(done){
        check({file:files[2]},function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('goodname',false)
            return done()
        })
    })
    it('should skip my stupid sha1/md5 filenames',function(done){
        check({file:files[3]},function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('goodname',false)
            return done()
        })
    })
    it('should be forced to pass stupid sha1/md5 filenames',function(done){
        check({file:files[2],write_out:true},function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('goodname',true)
            return done()
        })
    })

})