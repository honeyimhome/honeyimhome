# honeyimhome
SwampHacks 2016 - Smart Home system

## Endpoint
ec2-54-175-185-153.compute-1.amazonaws.com

## SSH
ssh -i ~/Path/To/HoneyImHome.pem ubuntu@ec2-54-175-185-153.compute-1.amazonaws.com 

## Functionality
TODO:

 * Implement Client side and server side validation to prevent people from uploading to many photos that will crash the system
 * Implement API call that tests facial recognition without text messages (for dev purposes) 
 * Validation of logged in user to not be able to access /household/join /household/new
 * Implement cascade training on AWS to cut out the middle man (:
    * Write RESTFUL API to receive image requests.
    * Write abstraction on top of opencv create samples utility to be called on by RESTFUL API
    * Write abstraction on top of opencvtraincascade to be called on by RESTFUL API
    * Make Database that holds all the training files and somehow make it NOT O(n) on runtime
    * Write cascade detector, then pull the identifing information (like userID) and return it via RESTFUL API

## Features
TODO:

 * Implement household ADMIN panel for training images. 
 * Seperate households, aka request access to a household to prevent giant household list. 
 * Client unique identifier to associate camera(s)/client(s) with household
 * Night time facial recognition
