from multiprocessing import Process
from time import sleep
import Activator
import Poll
import PollOnlyLast

def activator(sec):
	while True:
		PollOnlyLast.run()
		Activator.run()
		sleep(sec)

def fiveMinPoll(sec):
	while True:
		Poll.run()
		sleep(sec)

if __name__ == '__main__':
	p = Process(target = activator, args = (5,))
	p.start()
	p = Process(target = fiveMinPoll, args = (60*5,))
	p.start()
