import MySQLdb as mdb

def getDBConnection():
    global con
    con = mdb.connect('localhost', 'root', 'warmme', 'warmme');
  
def __init__(self):
    self.getDBConnection()