<?php
$url =$_POST["url"];
$ip = gethostbyname($url);

echo "Domain name is $url and the Corresponding IP address is $ip";
?>


