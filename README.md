# honeyimhome
SwampHacks 2016 - Smart Home system

## Endpoint
ec2-54-175-185-153.compute-1.amazonaws.com

## SSH
ssh -i ~/Path/To/HoneyImHome.pem ubuntu@ec2-54-175-185-153.compute-1.amazonaws.com 

## Functionality
TODO:
  * Implement cascade training on AWS to cut out the middle man (:
    * Write RESTFUL API to receive image requests.
    * Write abstraction on top of opencvtraincascade to be called on by RESTFUL API
    * Make Database that holds all the training files and somehow make it NOT O(n) on runtime
    * Write cascade detector, then pull the identifing information (like userID) and return it via RESTFUL API

## Features
TODO
