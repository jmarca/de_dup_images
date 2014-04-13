# de duplicate images

I have a lot of images.  Over the years, I've tried various strategies
for saving, backups, organizing, etc.

Now I have 3 to 5 duplicate images for every real image on my hard
disk, and recently starting to use DigiKam has brought home to me the
need to fix this mess.

The basic goal I have for this is to

1. look at each image
2. fingerprint it
3. save the fingerprint to redis
4. if the redis link is newly created, write the image to the de-duped
   location
5. alternately, if the redis link is not newly created, flag the image
   as a dupe in a secondary redis
6. rename the images according to the image name (dsc_whatever) rather
   than the stupid hash naming thing I used at some point
7. that's it.  by using redis I can process images with multiple
   processors.  Perhaps use kue to save jobs.

# Tasks

It should extract exif data

it should compute a fingerprint.  either a file sha256, or perhaps
just unique exif?

It should create a list of files to process

It should process those files from multiple processes

It should not duplicate effort

It should keep track of things across processes using kue and redis

It should process directories

It should allow multiple runs

It should end up with a list of unique files, no duplicates

It might be best to delete files, if not it should create a list of
files that can be deleted.

It should save the deduped files in a new directory so that the old
directory(ies) can be deleted.

It should allow for deleteing files once it has verified that they
have been copied into the safe place.
