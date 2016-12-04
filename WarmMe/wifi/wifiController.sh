#!/bin/sh

while [ : ]
do
wifiup=$(/sbin/ifconfig wlan0 | grep inet\ addr | wc -l)
if [ $wifiup -eq 0 ]
then
	echo "link is down, restaring wlan0..."
	ifdown wlan0
	sleep 5s
	ifup wlan0
	#iwconfig wlan0 power off
	sleep 10s
	dhclient wlan0
else
	echo "link is up"
fi
sleep 1m
done
