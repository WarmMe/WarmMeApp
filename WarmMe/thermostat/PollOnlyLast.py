#!/usr/bin/python
# set gpio18 to high when content of file state is 'ON'
import RPi.GPIO as GPIO
import time
import sys
import DB

def run(sensor):

    if sensor == None:
        return

    tempPolled = sensor.poll()[0]
    humidityPolled = sensor.poll()[1]
    
    #----------------------------------------------------------------------
    # insert the values into the database
    #----------------------------------------------------------------------

    # set the value of your SQL query
    queryUpdateLastTemp = "update sensorMonitorLast set value = %s, humidity= %s";
    
    # Write temperature to DB
    cur = DB.con.cursor()
    cur.execute(queryUpdateLastTemp, (tempPolled, humidityPolled))
    DB.con.commit()
	
if __name__ == "__main__":
	run(None)
