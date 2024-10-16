#!/bin/bash

#   Function to check if a string is a palindrome
#   First check the length of the str and then
#   reverses the str and the check
convert()
{
    str=${1^^}
    length=${#str}

    if [ $length -le 1 ]; then
        echo "Not a valid string"
        exit 1
    fi

    var=$((${#str}))
    arr=""

    while [ $var -ge 0 ]; do
         arr="${arr}${str:var:1}"
        ((var--))
    done

    if [ $arr == $str ]; then
        return 1
    else
        return 0
    fi
}

if [ -z "$1" ]; then
    echo "Usage: $0 <string>"
    exit 1
fi

convert $1
if [ $? == 1 ]; then
    echo "Is a palindrome"
else
    echo "Is not a palindrome"
fi