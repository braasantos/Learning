#!/bin/bash

#VARIABLES

MY_VAR="BRAULIO"

ERROR="ERROR"

#IF ELSE
if [ $MY_VAR = "BRAULIO" ]; then
	echo $MY_VAR
else
	echo $ERROR
fi

NAME="braulio"
OTHERNAME="BRAULIO"

VAR=18

# -gt (greater than or >)
# -lt (less than or <)

if [ $VAR -gt 10 ] && [ $VAR -lt 30 ]; then
	echo "This number is valid"
else
	echo "This number is not valid"
fi

#LOOPS
#FOR LOOP
for VAR in {1..20}
do
	if [ $VAR -eq 18 ]; then
		echo "Number 18 found" > file
	else
		echo "Number not found" >> file
	fi
done

i=0
# WHILE LOOP
while [ $i -le $VAR ]
do
	echo  $i "is less than 18" >> file
	((i++))
done

j=0
VAR=18

until [ $j -eq $VAR ]
do
	echo $j "is less than" $VAR >> fle
	((j++))
done
# User Input:
read -p "Enter your name: " USERNAME
echo "Hello, $USERNAME!"
# Command-Line Arguments:
echo "Script name: $1"
echo "First argument: $2"
echo "Second argument: $3"

greet()
{
	local VAR=$1
	local VAE=$2
	VI=$((VAR + VAE))
	return $VI
}
greet 10 8
if [ $? -eq 18 ]; then
	echo "ok"
else
	echo "not ok"
fi
echo $VI >> file
while IFS= read -r line; do
    echo "$line" > newfile
done < file
cat newfile
cat file
rm newfile file 
