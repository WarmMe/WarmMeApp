#!/usr/bin/python
# set gpio18 to high when content of file state is 'ON'
import RPi.GPIO as GPIO
import time
import MySQLdb as mdb
import sys

# set GPIO (pin 12) that command the releais
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)

try:
	con = mdb.connect('localhost', 'root', 'warmme', 'warmme');
	
	# Current temp
	cur = con.cursor()
	cur.execute("SELECT tempValue from tempMonitor order by created desc")
	curTemp = cur.fetchone()
	print 'Current temperature: ' + str(curTemp[0])

	# Target temp
	cur = con.cursor()
	cur.execute("SELECT tempValue from tempTarget")
	targetTemp = cur.fetchone()
	print 'Target temperature: ' + str(targetTemp[0])
	
	if curTemp[0] <= targetTemp[0] + 1:
		print 'status: HIGH'
		GPIO.output(12, GPIO.HIGH)
		cur = con.cursor()
		cur.execute("INSERT into tempActivation (state,tempValue) values ('ON',"+str(curTemp[0])+")")
		con.commit()
	elif curTemp[0] > targetTemp[0] + 1:
		print 'status: LOW'
		GPIO.output(12, GPIO.LOW)
		cur = con.cursor()
		cur.execute("INSERT into tempActivation (state,tempValue) values ('OFF',"+str(curTemp[0])+")")
		con.commit()

except mdb.Error, e:
	print "Error %d: %s" % (e.args[0],e.args[1])
	sys.exit(1)
finally:
	if con:
		con.close()
