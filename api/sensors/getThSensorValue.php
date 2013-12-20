<?php
$f = "../../data/sensors/thSensor01";    //String file path
$size = filesize($f);  // File size (how much data to read)
$fH = fopen($f,"r");   // File handle
$data = fread($fH,$size);  // Read data from file handle
fclose($fH);  // Close handle
$data = round($data,1);
echo $data
?>
