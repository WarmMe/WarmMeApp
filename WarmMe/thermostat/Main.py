from multiprocessing import Process
from time import sleep
import Activator
import Poll
import PollOnlyLast
import DB
import Sensor

def initializeSensors():
    cur = DB.con.cursor()
    queryGetSensorType = "select DeviceType from sensor"
    cur.execute(queryGetSensorType)
    sensorType = cur.fetchone()

    global sensor
    if sensorType[0] == "DS18B20":
        print "Device: DS18B20"
        sensor = Sensor.DS18B20()
    elif sensorType[0] == "DHT":
        print "Device: DHT"
        sensor = Sensor.DHT()
    
def activator(sec):
	while True:
		PollOnlyLast.run(sensor)
		Activator.run()
		sleep(sec)

def fiveMinPoll(sec):
	while True:
		Poll.run(sensor)
		sleep(sec)

if __name__ == '__main__':
    # initialize DB cnnection
    DB.getDBConnection()

    # initialize sensor
    initializeSensors()
    
    # Start processes
    p = Process(target = activator, args = (5,))
    p.start()
    p = Process(target = fiveMinPoll, args = (60*5,))
    p.start()
