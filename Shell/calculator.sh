#!/bin/bash

read -p "Enter the first number: " num1
read -p "Enter the second number: " num2
read -p "Enter the operator sign : " operator

if [ "$operator" = "+" ]; then
    echo "Result is : $((num1 + num2))"
elif [ "$operator" = "-" ]; then
    echo "Result is : $((num1 - num2))"
elif [ "$operator" = "*" ]; then
    echo "Result is : $((num1 * num2))"
elif [ "$operator" = "/" ]; then
    echo "Result is : $((num1 / num2))"
else
    echo "Invalid operator!"
fi