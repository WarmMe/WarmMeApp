#!/usr/bin/python
# set gpio18 to high when content of file state is 'ON'
import RPi.GPIO as GPIO
import time
import MySQLdb as mdb
import sys

def run():

	is_celsius=1 #set to 1 if using Celsius
	tempPolled = ""
	tempCorrectionParameter = 0
	tempToWriteOnDB = 0

	#----------------------------------------------------------------------
	# insert the values into the database
	#----------------------------------------------------------------------
	con = mdb.connect('localhost', 'root', 'warmme', 'warmme');

	# set the value of your SQL query
	queryInsertTemp = "insert into sensorMonitor(sensor_id,value) values (%s,%s) ";
	queryGetTempCorrectionPar = "select value from sensorParameter where paramName like 'TempCorrectionValue'";
	queryGetSensor = "select sensorPiFilePath from sensor";

	# get temperature constant correction parameter
	cur = con.cursor()
	cur.execute(queryGetTempCorrectionPar)
	tempCorrectionParameter = cur.fetchone()
	tempCorrectionParameter = float(tempCorrectionParameter[0])

	# Poll sensor and get temperature
	while tempPolled.split("\n")[0].find("YES") == -1:

		# get temperature sensor fileName to read
		cur = con.cursor() 
		cur.execute(queryGetSensor)
		sensorFileName = cur.fetchone()

		# Open the file that we viewed earlier so that python can see what is in it. Replace the serial number as before.
		tfile = open(sensorFileName[0])
		# Read all of the text in the file.
		tempPolled = tfile.read()
		# Close the file now that the text has been read.
		tfile.close()
		time.sleep(1)

	# Split the line into words, referring to the spaces, and select the 10th word (counting from 0).
	tempPolled = (tempPolled.split("\n")[1]).split(" ")[9]
	# The first two characters are "t=", so get rid of those and convert the temperature from a string to a number.
	tempPolled = float(tempPolled[2:])
	# Put the decimal point in the right place and display it.
	tempPolled = tempPolled / 1000
	tempPolled = tempPolled + tempCorrectionParameter

	print '>>> TEMPERATURE POLLED: ' + str(tempPolled)

	# Write temperature to DB
	cur.execute(queryInsertTemp, (1,tempPolled))
	con.commit()
	
if __name__ == "__main__":
	run()