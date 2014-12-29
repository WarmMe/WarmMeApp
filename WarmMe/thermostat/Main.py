from multiprocessing import Process
from time import sleep
import Activator
import Poll

def activator(sec):
	while True:
		Poll.run()
		Activator.run()
		sleep(sec)

if __name__ == '__main__':
	p = Process(target = activator, args = (5,))
	p.start()
