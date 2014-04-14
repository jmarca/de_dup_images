var should=require('should')
var extract = require('../lib/extract_exif')

describe('parse exif',function(){
    it('should parse exif data from Nikon',function(done){
        var file = 'test/files/DSC_8057.JPG'
        extract({file:file},function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('exif')
            d.exif.should.have.property('Make')
            d.exif.should.have.property('Model')
            d.exif.Make.should.match(/nikon/i)
            return done()
        })
    })

    it('should parse exif data from Fujifilm',function(done){
        var file = 'test/files/DSCF3084.JPG'
        extract({file:file},function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('exif')
            d.exif.should.have.property('Make')
            d.exif.should.have.property('Model')
            d.exif.Make.should.match(/fujifilm/i)
            console.log(d)
            return done()
        })
    })

    it('should parse exif data from Samsung',function(done){
        var file = 'test/files/SAM_0183.JPG'
        extract({file:file},function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('exif')
            d.exif.should.have.property('Make')
            d.exif.should.have.property('Model')
            d.exif.Make.should.match(/samsung/i)
            //console.log(d)
            return done()
        })
    })

    it('should parse exif data from Sony',function(done){
        var file = 'test/files/dsc00014.jpg'
        extract({file:file},function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('exif')
            d.exif.should.have.property('Make')
            d.exif.should.have.property('Model')
            d.exif.Make.should.match(/sony/i)
            //console.log(d)
            return done()
        })
    })

    it('should parse exif data from Casio',function(done){
        var file = 'test/files/cimg0330.jpg'
        extract({file:file},function(e,d){
            should.not.exist(e)
            should.exist(d)
            d.should.have.property('exif')
            d.exif.should.have.property('Make')
            d.exif.should.have.property('Model')
            d.exif.Make.should.match(/casio/i)
            //console.log(d)
            return done()
        })
    })

})