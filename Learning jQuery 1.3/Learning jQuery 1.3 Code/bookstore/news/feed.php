<?php
  // If file_get_contents() is available on the server,
  // this short solution will be sufficient.
  header('Content-Type: text/xml');
  print file_get_contents('http://jquery.com/blog/feed');
?>

<?php
  // This alternative solution works if file_get_contents()
  // is not available, but the cURL library is.
  // header('Content-Type: text/xml');
  // $curl = curl_init();
  // $timeout = 5; // set to zero for no timeout
  // curl_setopt($curl, CURLOPT_URL, 'http://feedproxy.feedburner.com/jquery/');
  // curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  // curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $timeout);
  // print curl_exec($curl);
  // curl_close($curl);
?>