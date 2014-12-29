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
		con = mdb.connect('localhost', 'root', 'warmme', 'warmme');

		# Current temp
		cur = con.cursor()
		cur.execute("SELECT value from sensorMonitor order by created desc")
		curTemp = cur.fetchone()
		print 'Current temperature: ' + str(curTemp[0])

		# Activation type
		cur = con.cursor()
		cur.execute("SELECT tempValue, type, activationTarget_id from activationTarget")
		qryResult = cur.fetchone()

		if qryResult[1] == 'MANUAL':
			print 'Target temperature: ' + str(qryResult[0])
			if curTemp[0] <= qryResult[0] + .5:
				print 'status: HIGH'
				GPIO.output(12, GPIO.HIGH)
				cur = con.cursor()
				cur.execute("INSERT into activationStatus (state,tempValue,zone_id) values ('ON',"+str(curTemp[0])+",1)")
				con.commit()
			elif curTemp[0] > qryResult[0] + .5:
				print 'status: LOW'
				GPIO.output(12, GPIO.LOW)
				cur = con.cursor()
				cur.execute("INSERT into activationStatus (state,tempValue,zone_id) values ('OFF',"+str(curTemp[0])+",1)")
				con.commit()

		elif qryResult[1] == 'SCHEDULE':
			
			# Get shcedule
			cur = con.cursor()
			cur.execute("SELECT schedule_id from schedule where activationTarget_id = " + str(qryResult[2]))
			scheduleResult = cur.fetchone()

			# Get shcedule activator
			cur = con.cursor()
			cur.execute("SELECT tempValue from activationSchedule where schedule_id = " + str(scheduleResult[0]) + " and startTime <= '" + str(curTime) + "' and endTime >= '" + str(curTime) + "'")
			scheduleActivator = cur.fetchone()
			if scheduleActivator is None:
				print "No schedule, set GPIO to low"
			else:
				print 'Target temperature: ' + str(scheduleActivator[0])
				if curTemp[0] <= scheduleActivator[0] + .5:
					print 'status: HIGH'
					GPIO.output(12, GPIO.HIGH)
					cur = con.cursor()
					cur.execute("INSERT into activationStatus (state,tempValue,zone_id) values ('ON',"+str(curTemp[0])+",1)")
					con.commit()
				elif curTemp[0] > scheduleActivator[0] + .5:
					print 'status: LOW'
					GPIO.output(12, GPIO.LOW)
					cur = con.cursor()
					cur.execute("INSERT into activationStatus (state,tempValue,zone_id) values ('OFF',"+str(curTemp[0])+",1)")
					con.commit()

		elif qerResult[1] == 'OFF':
			GPIO.output(12, GPIO.LOW)

	except mdb.Error, e:
		print "Error %d: %s" % (e.args[0],e.args[1])
		sys.exit(1)
	finally:
		if con:
			con.close()
			
if __name__ == "__main__":
	run()