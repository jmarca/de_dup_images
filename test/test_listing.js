var should=require('should')
var listing = require('../lib/listing')

describe('grab jpeg files',function(){
    it('should grab all the jpeg files',function(done){
        var files =['files/SAM_0183.JPG'
                   ,'files/dsc00014.jpg'
                   ,'files/cimg0330.jpg'
                   ,'files/DSCF3084.JPG'
                   ,'files/DSC_8057.JPG']
        listing('test',function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('length')
            d.length.should.eql(5)
            // match d with files, and files with d
            files.forEach(function(filename){
                d.indexOf(filename).should.not.eql(-1)
            })
            d.forEach(function(filename){
                files.indexOf(filename).should.not.eql(-1)
            })
            return done()
        })
    })

})