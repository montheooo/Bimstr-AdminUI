<?php

require '/aws/aws-autoloader.php';

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;


$paysError = "";
$nameError = "";
$emailError = "";
$telError = "";
$contactError = "";
$videoError = "";
$artisteError = "";
$audioError = "";
$coverError = "";
$photo_cover = "";
$song_audio = "";
$photo_artiste = "";


// Check if data is POST

if ($_SERVER["REQUEST_METHOD"] == "POST"){

	$error = false;  // initialize errors
	$res1 = false;   // initialize result
	$compteur_post = 0 ;   // initialize compteur POST files
	$compteur_result = 0 ; // initialise compteur Result POST files

	// function sanitize input

function test_input($data) {
  $data = trim($data);
  $data = strip_tags($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

    //  name validation
  
        if (empty($_POST["nom"])) {
            $error = true;
            $nameError = "Veuillez entrez votre nom.";
        } else if (strlen($_POST["nom"]) < 3) {
            $error = true;
            $nameError = "Le nom doit contenir au moins 3 caractères.";
        } else if (!preg_match("/^[a-zA-Z ]*$/",$_POST["nom"])) {
  			$error = true;
            $nameError = "uniquement des lettres et espaces sont autorisés.";
        }else if (strlen($_POST["nom"]) > 30) {
            $error = true;
            $nameError = "Le nom ne doit pas dépasser 30 caractères.";
        }else{
  			$nom = test_input($_POST["nom"]);
        }

    //  Pays validation
    
        if (empty($_POST["pays"])) {
            $error = true;
            $paysError = "Veuillez entrez votre pays.";
        } else if (strlen($_POST["pays"]) < 3) {
            $error = true;
            $paysError = "Le pays doit contenir au moins 3 caractères.";
        } else if (!preg_match("/^[a-zA-Z ]*$/",$_POST["pays"])) {
  			$error = true;
            $paysError = "uniquement des lettres et espaces sont autorisés.";
        } else if (strlen($_POST["pays"]) > 30) {
            $error = true;
            $paysError = "Le pays ne doit pas depasser 30 caractères.";
        } else{
 			$pays = test_input($_POST["pays"]);
        }

    //  Email Validation
    
        if (empty($_POST["email"])) {
            $error = true;
            $emailError = "Veuillez entrez votre email.";
        } else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
      		$error = true;
            $emailError = "votre adresse email n'est pas valide.";
   		} else {
  			$email = test_input($_POST["email"]);
   		}
         
     //  Telephone Validation
    
    	if (empty($_POST["telephone"])) {
            $error = true;
            $telError = "Veuillez entrez votre telephone.";
        } else if (strlen($_POST["telephone"]) != 9) {
            $error = true;
            $telError = "Le numero de telephone doit contenir exactement 9 caractères.";
        } else if (!preg_match("/^[0-9]*$/",$_POST["telephone"])) {
  			$error = true;
            $telError = "le numero de telephone doit contenir uniquement des chiffres";
        } else {
  			$telephone = test_input($_POST["telephone"]);
        }
        
    //  Contact Fbk Validation
    
    	if (empty($_POST["contactFb"])) {
            $error = true;
            $contactError = "Veuillez entrez votre contact Facebook.";
        } else if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$_POST["contactFb"])) {
  			$error = true;
            $contactError = "votre contact Facebook n'est pas valide.";
        } else {
 			$contactFb = test_input($_POST["contactFb"]);
        }

    //  Video Validation
    
    	if (empty($_POST["video"])) {
            $error = true;
            $videoError = "Veuillez entrez le lien de votre video YouTube.";
        }else if (strlen($_POST["video"]) > 255 ) {
            $error = true;
            $videoError = "Le lien de votre video depasse 255 caractères.";
        } else if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$_POST["video"])) {
  			$error = true;
            $videoError = "votre lien YouTube n'est pas valide.";
        } else {
 			$video = test_input($_POST["video"]);
        }

    //  FileArtiste Validation

    if ($_FILES["fileArtiste"]) {

    	$target_file1 = $_FILES["fileArtiste"]["name"];
        $imageFileType1 = pathinfo($target_file1,PATHINFO_EXTENSION);

        if ($_FILES["fileArtiste"]["name"] == "") {
            $error = true;
            $artisteError = "Veuillez joindre votre photo.";

        }else if (strlen($_FILES["fileArtiste"]["name"]) > 255 ) {
            $error = true;
            $artisteError = "Le nom de votre fichier depasse 255 caractères.";
        } else if ($_FILES["fileArtiste"]["size"] > 1024*1024*10) {
           $error = true;
           $artisteError = "Ce fichier est trop volumineux.";
          }else if($imageFileType1 != "jpg" &&  $imageFileType1 != "jpeg") {
           
            $error = true;
            $artisteError = "uniquement les fichiers Jpeg et Jpg sont autorisés";  

          }else{
          	$photo_artiste = test_input($_FILES["fileArtiste"]["name"]);
            $photo_artiste = basename($_FILES["fileArtiste"]["name"]);
            $compteur_post++ ;

          }

    }
                 
    //  FileAudio Validation

    if ($_FILES["fileAudio"]) {

    	$target_file2 = $_FILES["fileAudio"]["name"];
        $imageFileType2 = pathinfo($target_file2,PATHINFO_EXTENSION);

        if ($_FILES["fileAudio"]["name"] == "") {
            $error = true;
            $audioError = "Veuillez joindre votre song audio.";

        }else if (strlen($_FILES["fileAudio"]["name"]) > 255 ) {
            $error = true;
            $audioError = "Le nom de votre fichier depasse 255 caractères.";
        }else if ($_FILES["fileAudio"]["size"] > 1024*1024*16) {
           $error = true;
           $audioError = "Ce fichier est trop volumineux.";
          }else if($imageFileType2 != "jpg") {
           
            $error = true;
            $audioError = "uniquement les fichiers MP3 sont autorisés";  

          }else {
          	$song_audio = test_input($_FILES["fileAudio"]["name"]);
            $song_audio = basename($_FILES["fileAudio"]["name"]);
            $compteur_post++ ;

          }
    }  
           
    // FileCover Validation

   if ($_FILES["fileCover"]) {

    	$target_file3 = $_FILES["fileAudio"]["name"];
        $imageFileType3 = pathinfo($target_file3,PATHINFO_EXTENSION);

        if ($_FILES["fileCover"]["name"] == "") {
            $error = true;
            $coverError = "Veuillez joindre le cover de votre song audio.";

        }else if (strlen($_FILES["fileCover"]["name"]) > 255 ) {
            $error = true;
            $coverError = "Le nom de votre fichier depasse 255 caractères.";
        }else if ($_FILES["fileCover"]["size"] > 1024*1024*16) {
        //   $error = true;
           $coverError = "Ce fichier est trop volumineux.";
          }else if($imageFileType3 != "jpg" &&  $imageFileType3 != "jpeg") {
           
        //    $error = true;
            $coverError = "uniquement les fichiers Jpeg et Jpg sont autorisés";  

          }else{
          	$photo_cover = test_input($_FILES["fileCover"]["name"]);
            $photo_cover = basename($_FILES["fileCover"]["name"]);
            $compteur_post++ ;	
          }

    }   

// print_r($error);  
 
if( !$error ) {

    
$bucket ='bimstore';
// Instantiate the client.
$s3 = new S3Client([
    'version'     => '2006-03-01',
    'region'      => 'eu-central-1',
    'credentials' => [
        'key'    => 'AKIAIL66WF4G33HALJQA',
        'secret' => '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',
    ],
    'StorageClass' => 'REDUCED_REDUNDANCY',
     'http'    => [
        'verify' => 'C:\Users\BLESSING  PETROLEUM\Downloads\cacert.pem'
    ]
]);
/********************************************************************************/
try {
    // Upload data.
    $result_artiste = $s3->putObject(array(
        'Bucket' => $bucket,
        'Key'    => $_FILES["fileArtiste"]["name"].'-'.$nom,
        'SourceFile'   => $_FILES["fileArtiste"]["tmp_name"],
        'ACL'    => 'public-read'
    ));

    // Print the URL to the object.
    echo $result_artiste['ObjectURL'] . "\n";
    $compteur_result++ ;
} catch (S3Exception $e) {
    echo $e->getMessage() . "\n";
}      
           
/********************************************************************************/
try {
    // Upload data.
    $result_audio = $s3->putObject(array(
        'Bucket' => $bucket,
        'Key'    => $_FILES["fileAudio"]["name"].'-'.$nom,
        'SourceFile'   => $_FILES["fileAudio"]["tmp_name"],
        'ACL'    => 'public-read'
    ));

    // Print the URL to the object.
    echo $result_audio['ObjectURL'] . "\n";
    $compteur_result++ ;

} catch (S3Exception $e) {
    echo $e->getMessage() . "\n";
}                 
          
/********************************************************************************/
try {
    // Upload data.
    $result_cover = $s3->putObject(array(
        'Bucket' => $bucket,
        'Key'    => $_FILES["fileCover"]["name"].'-'.$nom,
        'SourceFile'   => $_FILES["fileCover"]["tmp_name"],
        'ACL'    => 'public-read'
    ));

    // Print the URL to the object.
    echo $result_cover['ObjectURL'] . "\n";
    $compteur_result++ ;

} catch (S3Exception $e) {
    echo $e->getMessage() . "\n";
}                            
           
	if ($compteur_result === $compteur_post) { 

	// Données à envoyer
		$post = array();
		// La zone de texte "description"
		$post['nationality'] = $pays;
		$post['artistName'] = $nom;
		$post['email'] = $email;
		$post['phone'] = $telephone;
		$post['contactFb'] = $contactFb;
		$post['urlVideoYoutube'] = $video;
		$post['artistSongUrl'] = $result_audio["ObjectURL"];
		$post['songCoverUrl'] = $result_cover["ObjectURL"];
		$post['artistPictureUrl'] = $result_artiste["ObjectURL"];
		$post_encode = json_encode($post);
		
		
		// On effectue la requête avec cURL
		$ch = curl_init('http://188.166.151.38:8080/bimstr/rest/submit');
		curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json'));
		curl_setopt($ch, CURLINFO_HEADER_OUT, true);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_encode);
		$response = curl_exec($ch);

		$res = curl_getinfo($ch);
		print_r($res);
		echo $response;

		if ($res['http_code'] == 200) {
		    $res1 = true ;
		} else {

		}
		curl_close($ch);
    }        
    
} // End If No Errors

	// check the result
                
    if ($res1) {

            $errTyp = "success";
            $errMSG = "Vos données ont été bien enregistrées";
            unset($name);
            unset($pays);
            unset($email);
            unset($telephone);
            unset($contactFb);
            unset($video);
           
        } else {

            $errTyp = "danger";
            $errMSG = "Vos données n'ont pas été bien enregistrées, veullez reessayer...";            
        }         
}

?>

<!DOCTYPE html>
<html lang="fr" data-ng-app="app">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
   
    <link rel="stylesheet" href="../libs/assets/font-awesome/css/font-awesome.min.css" type="text/css" />
    <link rel="stylesheet" href="../libs/assets/simple-line-icons/css/simple-line-icons.css" type="text/css" />
    
    <link rel="stylesheet" href="../libs/jquery/bootstrap/dist/css/bootstrap.css" type="text/css" />
    
  
    <title>Formulaire</title>
    
</head>


<body ng-app="app">
    
    <!-- build:js js/app.angular.js -->
  <!-- jQuery -->
  <script src="../libs/jquery/jquery/dist/jquery.js"></script>
         
  <!-- Bootstrap -->
  <script src="../libs/jquery/bootstrap/dist/js/bootstrap.js"></script>

  <!-- Angular -->
  <script src="../libs/angular/angular/angular.js"></script>
 
  <!-- App -->
   <script >
    'use strict';
    angular.module('app', []);
    angular.module('app').controller('AppCtrl', ['$scope', function($scope ) {
      $scope.spinner = true ;
    }]);
  </script>
 
<!-- endbuild -->
  <!-- Lazy loading -->
<div class="wrapper-md" ng-controller="AppCtrl">
  <div class="row">
    
    <div class="col-sm-12">
      <div class="panel panel-default">
        <div class="panel-heading font-bold text-center">Formulaire Upload</div>
       	<div class="panel-body">

       		<?php
            if ( isset($errMSG) ) {
                
                ?>
                <div class="form-group">
                <div class="alert alert-<?php echo ($errTyp=="success") ? "success" : $errTyp; ?>">
                <span class="glyphicon glyphicon-info-sign"></span> <?php echo $errMSG; ?>
                </div>
                </div>
                <?php
            }
            ?>
          <form method="post" class="bs-example form-horizontal" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" autocomplete="off" enctype="multipart/form-data">
          	<div class="form-group">
            <!--  <label class="col-lg-2 control-label">Pays</label> -->
              <div class="col-lg-10">
                <input type="text" name="pays" class="form-control rounded" placeholder="Pays">
                <span class="text-danger"><?php echo $paysError; ?></span>
              </div>
            </div>
            <div class="form-group">
            <!--  <label class="col-lg-2 control-label">Nom</label> -->
              <div class="col-lg-10">
                <input type="text" name="nom" class="form-control rounded" placeholder="Nom">
                <span class="text-danger"><?php echo $nameError; ?></span>
              </div>
            </div>
            <div class="form-group">
            <!--  <label class="col-lg-2 control-label">Email</label> -->
              <div class="col-lg-10">
                <input type="email" name="email" class="form-control rounded" placeholder="Email">
                <span class="text-danger"><?php echo $emailError; ?></span>
              </div>
            </div>
             <div class="form-group">
            <!--  <label class="col-lg-2 control-label">Email</label> -->
              <div class="col-lg-10">
                <input type="number" name="telephone" class="form-control rounded" placeholder="Numero de téléphone">
                <span class="text-danger"><?php echo $telError; ?></span>
              </div>
            </div>
             <div class="form-group">
            <!--  <label class="col-lg-2 control-label">Email</label> -->
              <div class="col-lg-10">
                <input type="text" name="contactFb" class="form-control rounded" placeholder="Compte Facebook">
                <span class="text-danger"><?php echo $contactError; ?></span>
              </div>
            </div>

            <div class="form-group">
        <!--      <label class="col-lg-2 control-label">Video</label> -->
              <div class="col-lg-10">
                <input type="text" name="video" class="form-control rounded" placeholder="Lien Youtube de votre video">
            <!--    <span class="help-block m-b-none">Entrez le lien YouTube.</span>  -->
                <span class="text-danger"><?php echo $videoError; ?></span>
              </div>
        </div>
            <div class="form-group">
        	<label class="control-label">Votre Photo</label> 
                <input type="file"  name="fileArtiste">
                <span class="help-block">Doit pas exceder 10Mo</span>
                <span class="text-danger"><?php echo $artisteError; ?></span>   
        </div>
        
       
        <div class="form-group">
        	<label class=" control-label"> Song Audio</label>  
                <input type="file"  name="fileAudio">
                <span class=" help-block">Doit pas exceder 16Mo</span>
                <span class="text-danger"><?php echo $audioError; ?></span>   
        </div>
        <div class="form-group">
        	<label class=" control-label">Cover Audio</label>
                <input type="file"  name="fileCover">
                <span class=" help-block">Doit pas exceder 10Mo</span>
                <span class="text-danger"><?php echo $coverError; ?></span>   
        </div>
            <div class="form-group">
              <div class="col-lg-offset-2 col-lg-10">
                <button type="submit" class="btn btn-sm btn-info" >Envoyer</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="text-center" ng-show="spinner">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</div>
</body>

</html>


 
