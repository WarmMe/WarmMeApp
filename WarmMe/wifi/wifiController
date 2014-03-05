#!/bin/sh
if iwconfig wlan0 | grep "ESSID:off" > /dev/null
then
	echo "link is down, restaring wlan0..."
	ifdown wlan0
	sleep 5s
	ifup wlan0
	sudo iwconfig wlan0 power off
	sleep 30s
	dhclient wlan0
else
	echo "link is up"
fi
exit 0
