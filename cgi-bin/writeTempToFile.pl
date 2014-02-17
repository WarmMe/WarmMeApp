#!/usr/bin/perl
use LWP::UserAgent;
use strict;
use warnings;
use FindBin;

my $is_celsius=1; #set to 1 if using Celsius
my $output="";
my $attempts=0;
my $temp=0;  
my $scriptDir = $FindBin::Bin;

while ($output !~ /YES/g && $attempts < 5)
{
        $output = `cat /sys/bus/w1/devices/28-*/w1_slave 2>&1`;
        if($output !~ /NO/g)
        {
                $output =~ /t=(\d+)/i;
                $temp = ($is_celsius) ? ($1 / 1000) : ($1 / 1000) * 9/5 + 32;
        }
 
        $attempts++;
}

my $file = $scriptDir . '/../data/sensors/thSensor01'; 
print $file;
open (TEMPFILE, '>' . $file);
print TEMPFILE $temp;
close (TEMPFILE);


