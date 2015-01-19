#!/usr/bin/python
# set gpio18 to high when content of file state is 'ON'
import RPi.GPIO as GPIO
import time
import MySQLdb as mdb
import sys
import time

# set GPIO (pin 12) that command the releais
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)

def run():
	# Vary
	curTime = time.strftime("%H:%M:%S")
	
	try:
		global con
		con = mdb.connect('localhost', 'root', 'warmme', 'warmme');
		cur = con.cursor()
		
		# Current temp
		cur.execute("SELECT value from sensorMonitorLast")
		curTemp = cur.fetchone()
		print 'Current temperature: ' + str(curTemp[0])

		# Activation type
		cur.execute("SELECT tempValue, type, activationTarget_id from activationTarget")
		qryResult = cur.fetchone()

		if qryResult[1] == 'MANUAL':
			print 'Activation type: MANUAL'
			print 'Target temperature: ' + str(qryResult[0])
			heatMe(curTemp[0], qryResult[0])

		elif qryResult[1] == 'SCHEDULE':
			print 'Activation type: SCHEDULE'

			# Get shcedule activator
			cur = con.cursor()
			cur.execute("SELECT tempValue from activationSchedule where startTime <= '" + str(curTime) + "' and endTime >= '" + str(curTime) + "'")
			scheduleActivator = cur.fetchone()
			if scheduleActivator is None:
				print "No schedule, set GPIO to low"
				turnOff(curTemp[0]);
			else:
				print 'Target temperature: ' + str(scheduleActivator[0])
				heatMe(curTemp[0], scheduleActivator[0])

		elif qryResult[1] == 'OFF':
			print 'Activation type: OFF'
			print "set GPIO to low"
			turnOff(curTemp[0]);

	except mdb.Error, e:
		print "Error %d: %s" % (e.args[0],e.args[1])
		sys.exit(1)
	finally:
		if con:
			con.close()

def heatMe(curTemp, target):
	cur = con.cursor()

	if curTemp <= target - .4:
		print 'status: HIGH'
		GPIO.output(12, GPIO.HIGH)
		cur.execute("INSERT into activationStatus (state,tempValue,zone_id) values ('ON',"+str(curTemp)+",1)")
		con.commit()
		cur = con.cursor()
		cur.execute("Update activationStatusLast set state = 'ON', tempValue = "+str(curTemp))
		con.commit()
	elif curTemp > target + .4:
		print 'status: LOW'
		GPIO.output(12, GPIO.LOW)
		cur = con.cursor()
		cur.execute("INSERT into activationStatus (state,tempValue,zone_id) values ('OFF',"+str(curTemp)+",1)")
		con.commit()
		cur = con.cursor()
		cur.execute("Update activationStatusLast set state = 'OFF', tempValue = "+str(curTemp))
		con.commit()

def turnOff(curTemp):
	GPIO.output(12, GPIO.LOW)
	cur = con.cursor()
	cur.execute("INSERT into activationStatus (state,tempValue,zone_id) values ('OFF',"+str(curTemp)+",1)")
	cur.execute("Update activationStatusLast set state = 'OFF', tempValue = "+str(curTemp))
	con.commit()

if __name__ == "__main__":
	run()
