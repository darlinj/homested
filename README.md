Useful references:
https://smashtest.io/
https://www.serverlessops.io/blog/static-websites-on-aws-s3-with-serverless-framework
https://serverless-stack.com/chapters/stages-in-serverless-framework.html
https://www.youtube.com/watch?v=PqUYq2Wx0lc - ReactJS deployment on S3
https://medium.com/serverlessguru/deploy-reactjs-app-with-s3-static-hosting-f640cb49d7e6

You may need to set the Cache-Control metadata on the S3 bucket to a sensible number (60 seconds) to make changes quicker. The default is 24 hours. To this:
In the Amazon S3 console, in the buckets pane, click the name of the bucket that contains the files.
In the list of objects, select the first object to which you want to add a header field.
Click Actions and click Properties.
In the right pane, expand Metadata.
Click Add More Metadata.
In the Key list, click Cache-Control
In the Value field, enter the applicable value: (i.e. 60)
For a Cache-Control field, enter: max-age=number of seconds that you want objects to stay in a CloudFront edge cache
Click Save.

