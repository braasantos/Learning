#!/bin/bash
# NUMBER=5
# while [ $NUMBER -lt 9 ]
# do
#     mkdir CPP0$NUMBER
#     NUMBER=$(($NUMBER + 1))
# done
# if [ $NUMBER -eq 9 ]; then
#     mkdir CPP09
# fi
VAR=0

while [ $VAR -le 3 ]
do
    mkdir ex0$VAR
    VAR=$((VAR + 1))
done
