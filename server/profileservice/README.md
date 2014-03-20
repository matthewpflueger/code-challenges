Profile Service
===============

We are going to be creating a page that allows a user to create an account in our system by giving their name, email, password, and a picture.  

User Flow:
  - user navigates to a web page and sees a form to enter their information and upload a picture
  - when a user uploads their picture to Cloudinary.com they are able to see a preview
  - when a user hits submit all their info (including relevant picture info) is sent to a Node.js server as a form post
  - IF successful (all form fields entered, password is at least 5 characters, etc) the page is refreshed to display a success message AND their information with their pic (to show what they entered)
  - IF NOT successful redisplay the page with an appropriate error message
 
Web Server Flow:
  - server receives a GET request and shows the form page
  - server receives the form POST and verifies information, if not successful redisplays form page with error message
  - IF SUCCESSFUL the server sends the user info to a REST endpoint for saving

REST Server Flow:
  - server receives a call with data and saves it in a human readable form into a flat file

What you need to do:

- Create a free account on Cloudinary.com
- Create a webpage to collect the user info
- Be able to upload a photo from the browser to Cloudinary.com
- Be able to send the resulting data from a successful upload as part of the form post to the Web server
- Be able to validate that data in the web server
- On success validation of the data send it to the REST server 
- Save that data into a human readable format for inspection in the REST server