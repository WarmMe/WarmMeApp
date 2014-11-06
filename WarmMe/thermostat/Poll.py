#!/usr/bin/python
# set gpio18 to high when content of file state is 'ON'
import RPi.GPIO as GPIO
import time
import MySQLdb as mdb
import sys

is_celsius=1 #set to 1 if using Celsius
tempPolled = ""
tempCorrectionParameter = 0
tempToWriteOnDB = 0

#----------------------------------------------------------------------
# insert the values into the database
#----------------------------------------------------------------------
con = mdb.connect('localhost', 'root', 'warmme', 'warmme');

# set the value of your SQL query
queryInsertTemp = "insert into tempMonitor(tempValue) values(%s) ";
queryGetTempCorrectionPar = "select value from parameters where Param like 'CorrectionValueTHSensor01'";

# get temperature constant correction parameter
cur = con.cursor()
cur.execute(queryGetTempCorrectionPar)
tempCorrectionParameter = cur.fetchone()
tempCorrectionParameter = float(tempCorrectionParameter[0])

# Poll sensor and get temperature
while tempPolled.split("\n")[0].find("YES") == -1:
	# Open the file that we viewed earlier so that python can see what is in it. Replace the serial number as before.
	tfile = open("/sys/bus/w1/devices//28-000003bb35f2/w1_slave")
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

# Print temperature to DB
cur.execute(queryInsertTemp, tempPolled)
con.commit()
