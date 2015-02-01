import sys
import time
import Adafruit_DHT
import DB

class DS18B20:
    def initSensor(self):
        # Get db connection
        cur = DB.con.cursor()

        # Get temperature correction parameter
        queryGetTempCorrectionPar = "select value from sensorParameter where paramName like 'TempCorrectionValue'"
        cur.execute(queryGetTempCorrectionPar)
        global tempCorrectionParameter
        tempCorrectionParameter = float(cur.fetchone()[0])

        # Get linux sensor filePath
        queryGetFilePath = "select value from sensorParameter where paramName like 'FilePath'";
        cur.execute(queryGetFilePath)
        global filePath
        filePath = cur.fetchone()[0]

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
        
class DHT():

    def initSensor(self):
        # Get db connection
        cur = DB.con.cursor()
        
        # Get temperature correction parameter
        queryGetTempCorrectionPar = "select value from sensorParameter where paramName like 'TempCorrectionValue'"
        cur.execute(queryGetTempCorrectionPar)
	global tempCorrectionParameter
        tempCorrectionParameter = float(cur.fetchone()[0])

        # Get DHT type (11,22)
        queryGetDHTType = "select value from sensorParameter where paramName like 'DHTType'";
        cur.execute(queryGetDHTType)
	global dhtType
        dhtType = cur.fetchone()[0]

        # Get connectionPin
        queryConnectionPin = "select value from sensorParameter where paramName like 'ConnectionPinNumber'";
        cur.execute(queryConnectionPin)
	global connectionPin
        connectionPin = cur.fetchone()[0]

    def poll(self):
        # Try to grab a sensor reading.  Use the read_retry method which will retry up
        # to 15 times to get a sensor reading (waiting 2 seconds between each retry).
        # humidity, temperature = Adafruit_DHT.read_retry(str(dhtType), str(connectionPin))
	humidity, temperature = Adafruit_DHT.read_retry(22, 4)

        # Note that sometimes you won't get a reading and
        # the results will be null (because Linux can't
        # guarantee the timing of calls to read the sensor).  
        # If this happens try again!
        while True:
            if humidity is not None and temperature is not None:
                    return (temperature + tempCorrectionParameter, humidity)

    def __init__(self):
        self.initSensor()
