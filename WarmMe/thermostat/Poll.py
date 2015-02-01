#!/usr/bin/python
# set gpio18 to high when content of file state is 'ON'
import RPi.GPIO as GPIO
import time
import sys
import DB

def run(sensor):

    if sensor == None:
        return

    valuesPolled = sensor.poll()
    tempPolled = valuesPolled[0]
    humidityPolled = valuesPolled[1]
	
    #----------------------------------------------------------------------
    # insert the values into the database
    #----------------------------------------------------------------------
    
    # set the value of your SQL query
    queryInsertTemp = "insert into sensorMonitor(sensor_id,value,humidity) values (%s,%s,%s) ";
    
    # Write temperature to DB
    cur = DB.con.cursor()
    cur.execute(queryInsertTemp, (1,tempPolled,humidityPolled))
    DB.con.commit()
    
if __name__ == "__main__":
	run(None)
