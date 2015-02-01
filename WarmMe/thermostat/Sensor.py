import MySQLdb as mdb
import sys
import time
import Adafruit_DHT

class DS18B20:
    def initSensor(self):
        # Get db connection
        global con
        con = mdb.connect('localhost', 'root', 'warmme', 'warmme');
        cur = con.cursor()

        # Get temperature correction parameter
        queryGetTempCorrectionPar = "select value from sensorParameter where paramName like 'TempCorrectionValue'"
        cur = con.cursor()
        cur.execute(queryGetTempCorrectionPar)
        global tempCorrectionParameter
        tempCorrectionParameter = cur.fetchone()
        tempCorrectionParameter = float(tempCorrectionParameter[0])

        # Get linux sensor filePath
        queryGetFilePath = "select value from sensorParameter where paramName like 'FilePath'";
        cur.execute(queryGetFilePath)
        global filePath
        filePath = cur.fetchone()
        filePath = filePath[0]

    def poll(self):
        tempNotReaded = True
        while tempNotReaded:
            # Open the file that we viewed earlier so that python can see what is in it. Replace the serial number as before.
            tfile = open(filePath)
            # Read all of the text in the file.
            tempPolled = tfile.read()
            # Close the file now that the text has been read.
            tfile.close()
            time.sleep(1)

            if tempPolled.split("\n")[0].find("YES") != -1:
                # Split the line into words, referring to the spaces, and select the 10th word (counting from 0).
                tempPolled = (tempPolled.split("\n")[1]).split(" ")[9]
                # The first two characters are "t=", so get rid of those and convert the temperature from a string to a number.
                tempPolled = float(tempPolled[2:])
                # Put the decimal point in the right place and display it.
                tempPolled = tempPolled / 1000
                tempPolled = tempPolled + tempCorrectionParameter
                tempNotReaded = False
                return (tempPolled, 0)

    def __init__(self):
        self.initSensor()
        
class DHT22():

    def initSensor(self):
        self.sensor = 22
        self.pin = 4

    def poll(self):
	# Try to grab a sensor reading.  Use the read_retry method which will retry up
	# to 15 times to get a sensor reading (waiting 2 seconds between each retry).
	humidity, temperature = Adafruit_DHT.read_retry(self.sensor, self.pin)

	# Note that sometimes you won't get a reading and
	# the results will be null (because Linux can't
	# guarantee the timing of calls to read the sensor).  
	# If this happens try again!
	while True:
	    if humidity is not None and temperature is not None:
                return (temperature, humidity)

    def __init__(self):
        self.initSensor()