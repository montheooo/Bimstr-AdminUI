

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

  <div id="message" style="display: none;  
    position:absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    height: 200px;
    margin-left: -100px;
    margin-top: -100px; ">
    <div>
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      <span >Loading...</span>
    </div>
  </div>

  <?php

//header( 'content-type: text/html; charset=utf-8' );
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

  


  echo "<script>";
  echo "document.getElementById('message').style.display = \"block\";";
  echo "</script>";
  ob_flush();
  flush();
  ob_flush();
  flush();

  $error = false;  // initialize errors
  $res1 = false;   // initialize result
  $compteur_post = 0 ;   // initialize compteur POST files
  $compteur_result = 0 ; // initialise compteur Result POST files 
  $vue = true ;
  
  // function sanitize input

  function test_input($data) {
    $data = trim($data);
    $data = strip_tags($data);
    $data = stripslashes($data);
  //  $data = htmlspecialchars($data);
    return $data;
  }

    //  Pays validation

          $countryList1 = array(
            "AF" => "Afghanistan",
            "ZA" => "Afrique du Sud",
            "AL" => "Albanie",
            "DZ" => "Algérie",
            "DE" => "Allemagne",
            "AD" => "Andorre",
            "AO" => "Angola",
            "AI" => "Anguilla",
            "AQ" => "Antarctique",
            "AG" => "Antigua-et-Barbuda",
            "AN" => "Antilles néerlandaises",
            "SA" => "Arabie saoudite",
            "AR" => "Argentine",
            "AM" => "Arménie",
            "AW" => "Aruba",
            "AU" => "Australie",
            "AT" => "Autriche",
            "AZ" => "Azerbaïdjan",
            "BS" => "Bahamas",
            "BH" => "Bahreïn",
            "BD" => "Bangladesh",
            "BB" => "Barbade",
            "BE" => "Belgique",
            "BZ" => "Belize",
            "BM" => "Bermudes",
            "BT" => "Bhoutan",
            "BO" => "Bolivie",
            "BA" => "Bosnie-Herzégovine",
            "BW" => "Botswana",
            "BN" => "Brunéi Darussalam",
            "BR" => "Brésil",
            "BG" => "Bulgarie",
            "BF" => "Burkina Faso",
            "BI" => "Burundi",
            "BY" => "Bélarus",
            "BJ" => "Bénin",
            "KH" => "Cambodge",
            "CM" => "Cameroun",
            "CA" => "Canada",
            "CV" => "Cap-Vert",
            "CL" => "Chili",
            "CN" => "Chine",
            "CY" => "Chypre",
            "CO" => "Colombie",
            "KM" => "Comores",
            "CG" => "Congo",
            "KP" => "Corée du Nord",
            "KR" => "Corée du Sud",
            "CR" => "Costa Rica",
            "HR" => "Croatie",
            "CU" => "Cuba",
            "CI" => "Côte d’Ivoire",
            "DK" => "Danemark",
            "DJ" => "Djibouti",
            "DM" => "Dominique",
            "SV" => "El Salvador",
            "ES" => "Espagne",
            "EE" => "Estonie",
            "FJ" => "Fidji",
            "FI" => "Finlande",
            "FR" => "France",
            "GA" => "Gabon",
            "GM" => "Gambie",
            "GH" => "Ghana",
            "GI" => "Gibraltar",
            "GD" => "Grenade",
            "GL" => "Groenland",
            "GR" => "Grèce",
            "GP" => "Guadeloupe",
            "GU" => "Guam",
            "GT" => "Guatemala",
            "GG" => "Guernesey",
            "GN" => "Guinée",
            "GQ" => "Guinée équatoriale",
            "GW" => "Guinée-Bissau",
            "GY" => "Guyana",
            "GF" => "Guyane française",
            "GE" => "Géorgie",
            "GS" => "Géorgie du Sud et les îles Sandwich du Sud",
            "HT" => "Haïti",
            "HN" => "Honduras",
            "HU" => "Hongrie",
            "IN" => "Inde",
            "ID" => "Indonésie",
            "IQ" => "Irak",
            "IR" => "Iran",
            "IE" => "Irlande",
            "IS" => "Islande",
            "IL" => "Israël",
            "IT" => "Italie",
            "JM" => "Jamaïque",
            "JP" => "Japon",
            "JE" => "Jersey",
            "JO" => "Jordanie",
            "KZ" => "Kazakhstan",
            "KE" => "Kenya",
            "KG" => "Kirghizistan",
            "KI" => "Kiribati",
            "KW" => "Koweït",
            "LA" => "Laos",
            "LS" => "Lesotho",
            "LV" => "Lettonie",
            "LB" => "Liban",
            "LY" => "Libye",
            "LR" => "Libéria",
            "LI" => "Liechtenstein",
            "LT" => "Lituanie",
            "LU" => "Luxembourg",
            "MK" => "Macédoine",
            "MG" => "Madagascar",
            "MY" => "Malaisie",
            "MW" => "Malawi",
            "MV" => "Maldives",
            "ML" => "Mali",
            "MT" => "Malte",
            "MA" => "Maroc",
            "MQ" => "Martinique",
            "MU" => "Maurice",
            "MR" => "Mauritanie",
            "YT" => "Mayotte",
            "MX" => "Mexique",
            "MD" => "Moldavie",
            "MC" => "Monaco",
            "MN" => "Mongolie",
            "MS" => "Montserrat",
            "ME" => "Monténégro",
            "MZ" => "Mozambique",
            "MM" => "Myanmar",
            "NA" => "Namibie",
            "NR" => "Nauru",
            "NI" => "Nicaragua",
            "NE" => "Niger",
            "NG" => "Nigéria",
            "NU" => "Niue",
            "NO" => "Norvège",
            "NC" => "Nouvelle-Calédonie",
            "NZ" => "Nouvelle-Zélande",
            "NP" => "Népal",
            "OM" => "Oman",
            "UG" => "Ouganda",
            "UZ" => "Ouzbékistan",
            "PK" => "Pakistan",
            "PW" => "Palaos",
            "PA" => "Panama",
            "PG" => "Papouasie-Nouvelle-Guinée",
            "PY" => "Paraguay",
            "NL" => "Pays-Bas",
            "PH" => "Philippines",
            "PN" => "Pitcairn",
            "PL" => "Pologne",
            "PF" => "Polynésie française",
            "PR" => "Porto Rico",
            "PT" => "Portugal",
            "PE" => "Pérou",
            "QA" => "Qatar",
            "HK" => "R.A.S. chinoise de Hong Kong",
            "MO" => "R.A.S. chinoise de Macao",
            "RO" => "Roumanie",
            "GB" => "Royaume-Uni",
            "RU" => "Russie",
            "RW" => "Rwanda",
            "CF" => "République centrafricaine",
            "DO" => "République dominicaine",
            "CD" => "République démocratique du Congo",
            "CZ" => "République tchèque",
            "RE" => "Réunion",
            "EH" => "Sahara occidental",
            "BL" => "Saint-Barthélémy",
            "KN" => "Saint-Kitts-et-Nevis",
            "SM" => "Saint-Marin",
            "MF" => "Saint-Martin",
            "PM" => "Saint-Pierre-et-Miquelon",
            "VC" => "Saint-Vincent-et-les Grenadines",
            "SH" => "Sainte-Hélène",
            "LC" => "Sainte-Lucie",
            "WS" => "Samoa",
            "AS" => "Samoa américaines",
            "ST" => "Sao Tomé-et-Principe",
            "RS" => "Serbie",
            "CS" => "Serbie-et-Monténégro",
            "SC" => "Seychelles",
            "SL" => "Sierra Leone",
            "SG" => "Singapour",
            "SK" => "Slovaquie",
            "SI" => "Slovénie",
            "SO" => "Somalie",
            "SD" => "Soudan",
            "LK" => "Sri Lanka",
            "CH" => "Suisse",
            "SR" => "Suriname",
            "SE" => "Suède",
            "SJ" => "Svalbard et Île Jan Mayen",
            "SZ" => "Swaziland",
            "SY" => "Syrie",
            "SN" => "Sénégal",
            "TJ" => "Tadjikistan",
            "TZ" => "Tanzanie",
            "TW" => "Taïwan",
            "TD" => "Tchad",
            "TF" => "Terres australes françaises",
            "IO" => "Territoire britannique de l'océan Indien",
            "PS" => "Territoire palestinien",
            "TH" => "Thaïlande",
            "TL" => "Timor oriental",
            "TG" => "Togo",
            "TK" => "Tokelau",
            "TO" => "Tonga",
            "TT" => "Trinité-et-Tobago",
            "TN" => "Tunisie",
            "TM" => "Turkménistan",
            "TR" => "Turquie",
            "TV" => "Tuvalu",
            "UA" => "Ukraine",
            "UY" => "Uruguay",
            "VU" => "Vanuatu",
            "VE" => "Venezuela",
            "VN" => "Viêt Nam",
            "WF" => "Wallis-et-Futuna",
            "YE" => "Yémen",
            "ZM" => "Zambie",
            "ZW" => "Zimbabwe",
            "ZZ" => "région indéterminée",
            "EG" => "Égypte",
            "AE" => "Émirats arabes unis",
            "EC" => "Équateur",
            "ER" => "Érythrée",
            "VA" => "État de la Cité du Vatican",
            "FM" => "États fédérés de Micronésie",
            "US" => "États-Unis",
            "ET" => "Éthiopie",
            "BV" => "Île Bouvet",
            "CX" => "Île Christmas",
            "NF" => "Île Norfolk",
            "IM" => "Île de Man",
            "KY" => "Îles Caïmans",
            "CC" => "Îles Cocos - Keeling",
            "CK" => "Îles Cook",
            "FO" => "Îles Féroé",
            "HM" => "Îles Heard et MacDonald",
            "FK" => "Îles Malouines",
            "MP" => "Îles Mariannes du Nord",
            "MH" => "Îles Marshall",
            "UM" => "Îles Mineures Éloignées des États-Unis",
            "SB" => "Îles Salomon",
            "TC" => "Îles Turks et Caïques",
            "VG" => "Îles Vierges britanniques",
            "VI" => "Îles Vierges des États-Unis",
            "AX" => "Îles Åland",  // initialise  French Array
          );
          $countryList1 = array_values($countryList1);
          $countryList2 = array(
            "AF" => "Afghanistan",
            "AL" => "Albania",
            "DZ" => "Algeria",
            "AS" => "American Samoa",
            "AD" => "Andorra",
            "AO" => "Angola",
            "AI" => "Anguilla",
            "AQ" => "Antarctica",
            "AG" => "Antigua and Barbuda",
            "AR" => "Argentina",
            "AM" => "Armenia",
            "AW" => "Aruba",
            "AU" => "Australia",
            "AT" => "Austria",
            "AZ" => "Azerbaijan",
            "BS" => "Bahamas",
            "BH" => "Bahrain",
            "BD" => "Bangladesh",
            "BB" => "Barbados",
            "BY" => "Belarus",
            "BE" => "Belgium",
            "BZ" => "Belize",
            "BJ" => "Benin",
            "BM" => "Bermuda",
            "BT" => "Bhutan",
            "BO" => "Bolivia",
            "BA" => "Bosnia and Herzegovina",
            "BW" => "Botswana",
            "BV" => "Bouvet Island",
            "BR" => "Brazil",
            "BQ" => "British Antarctic Territory",
            "IO" => "British Indian Ocean Territory",
            "VG" => "British Virgin Islands",
            "BN" => "Brunei",
            "BG" => "Bulgaria",
            "BF" => "Burkina Faso",
            "BI" => "Burundi",
            "KH" => "Cambodia",
            "CM" => "Cameroon",
            "CA" => "Canada",
            "CT" => "Canton and Enderbury Islands",
            "CV" => "Cape Verde",
            "KY" => "Cayman Islands",
            "CF" => "Central African Republic",
            "TD" => "Chad",
            "CL" => "Chile",
            "CN" => "China",
            "CX" => "Christmas Island",
            "CC" => "Cocos [Keeling] Islands",
            "CO" => "Colombia",
            "KM" => "Comoros",
            "CG" => "Congo - Brazzaville",
            "CD" => "Congo - Kinshasa",
            "CK" => "Cook Islands",
            "CR" => "Costa Rica",
            "HR" => "Croatia",
            "CU" => "Cuba",
            "CY" => "Cyprus",
            "CZ" => "Czech Republic",
            "CI" => "Côte d’Ivoire",
            "DK" => "Denmark",
            "DJ" => "Djibouti",
            "DM" => "Dominica",
            "DO" => "Dominican Republic",
            "NQ" => "Dronning Maud Land",
            "DD" => "East Germany",
            "EC" => "Ecuador",
            "EG" => "Egypt",
            "SV" => "El Salvador",
            "GQ" => "Equatorial Guinea",
            "ER" => "Eritrea",
            "EE" => "Estonia",
            "ET" => "Ethiopia",
            "FK" => "Falkland Islands",
            "FO" => "Faroe Islands",
            "FJ" => "Fiji",
            "FI" => "Finland",
            "FR" => "France",
            "GF" => "French Guiana",
            "PF" => "French Polynesia",
            "TF" => "French Southern Territories",
            "FQ" => "French Southern and Antarctic Territories",
            "GA" => "Gabon",
            "GM" => "Gambia",
            "GE" => "Georgia",
            "DE" => "Germany",
            "GH" => "Ghana",
            "GI" => "Gibraltar",
            "GR" => "Greece",
            "GL" => "Greenland",
            "GD" => "Grenada",
            "GP" => "Guadeloupe",
            "GU" => "Guam",
            "GT" => "Guatemala",
            "GG" => "Guernsey",
            "GN" => "Guinea",
            "GW" => "Guinea-Bissau",
            "GY" => "Guyana",
            "HT" => "Haiti",
            "HM" => "Heard Island and McDonald Islands",
            "HN" => "Honduras",
            "HK" => "Hong Kong SAR China",
            "HU" => "Hungary",
            "IS" => "Iceland",
            "IN" => "India",
            "ID" => "Indonesia",
            "IR" => "Iran",
            "IQ" => "Iraq",
            "IE" => "Ireland",
            "IM" => "Isle of Man",
            "IL" => "Israel",
            "IT" => "Italy",
            "JM" => "Jamaica",
            "JP" => "Japan",
            "JE" => "Jersey",
            "JT" => "Johnston Island",
            "JO" => "Jordan",
            "KZ" => "Kazakhstan",
            "KE" => "Kenya",
            "KI" => "Kiribati",
            "KW" => "Kuwait",
            "KG" => "Kyrgyzstan",
            "LA" => "Laos",
            "LV" => "Latvia",
            "LB" => "Lebanon",
            "LS" => "Lesotho",
            "LR" => "Liberia",
            "LY" => "Libya",
            "LI" => "Liechtenstein",
            "LT" => "Lithuania",
            "LU" => "Luxembourg",
            "MO" => "Macau SAR China",
            "MK" => "Macedonia",
            "MG" => "Madagascar",
            "MW" => "Malawi",
            "MY" => "Malaysia",
            "MV" => "Maldives",
            "ML" => "Mali",
            "MT" => "Malta",
            "MH" => "Marshall Islands",
            "MQ" => "Martinique",
            "MR" => "Mauritania",
            "MU" => "Mauritius",
            "YT" => "Mayotte",
            "FX" => "Metropolitan France",
            "MX" => "Mexico",
            "FM" => "Micronesia",
            "MI" => "Midway Islands",
            "MD" => "Moldova",
            "MC" => "Monaco",
            "MN" => "Mongolia",
            "ME" => "Montenegro",
            "MS" => "Montserrat",
            "MA" => "Morocco",
            "MZ" => "Mozambique",
            "MM" => "Myanmar [Burma]",
            "NA" => "Namibia",
            "NR" => "Nauru",
            "NP" => "Nepal",
            "NL" => "Netherlands",
            "AN" => "Netherlands Antilles",
            "NT" => "Neutral Zone",
            "NC" => "New Caledonia",
            "NZ" => "New Zealand",
            "NI" => "Nicaragua",
            "NE" => "Niger",
            "NG" => "Nigeria",
            "NU" => "Niue",
            "NF" => "Norfolk Island",
            "KP" => "North Korea",
            "VD" => "North Vietnam",
            "MP" => "Northern Mariana Islands",
            "NO" => "Norway",
            "OM" => "Oman",
            "PC" => "Pacific Islands Trust Territory",
            "PK" => "Pakistan",
            "PW" => "Palau",
            "PS" => "Palestinian Territories",
            "PA" => "Panama",
            "PZ" => "Panama Canal Zone",
            "PG" => "Papua New Guinea",
            "PY" => "Paraguay",
            "YD" => "People's Democratic Republic of Yemen",
            "PE" => "Peru",
            "PH" => "Philippines",
            "PN" => "Pitcairn Islands",
            "PL" => "Poland",
            "PT" => "Portugal",
            "PR" => "Puerto Rico",
            "QA" => "Qatar",
            "RO" => "Romania",
            "RU" => "Russia",
            "RW" => "Rwanda",
            "RE" => "Réunion",
            "BL" => "Saint Barthélemy",
            "SH" => "Saint Helena",
            "KN" => "Saint Kitts and Nevis",
            "LC" => "Saint Lucia",
            "MF" => "Saint Martin",
            "PM" => "Saint Pierre and Miquelon",
            "VC" => "Saint Vincent and the Grenadines",
            "WS" => "Samoa",
            "SM" => "San Marino",
            "SA" => "Saudi Arabia",
            "SN" => "Senegal",
            "RS" => "Serbia",
            "CS" => "Serbia and Montenegro",
            "SC" => "Seychelles",
            "SL" => "Sierra Leone",
            "SG" => "Singapore",
            "SK" => "Slovakia",
            "SI" => "Slovenia",
            "SB" => "Solomon Islands",
            "SO" => "Somalia",
            "ZA" => "South Africa",
            "GS" => "South Georgia and the South Sandwich Islands",
            "KR" => "South Korea",
            "ES" => "Spain",
            "LK" => "Sri Lanka",
            "SD" => "Sudan",
            "SR" => "Suriname",
            "SJ" => "Svalbard and Jan Mayen",
            "SZ" => "Swaziland",
            "SE" => "Sweden",
            "CH" => "Switzerland",
            "SY" => "Syria",
            "ST" => "São Tomé and Príncipe",
            "TW" => "Taiwan",
            "TJ" => "Tajikistan",
            "TZ" => "Tanzania",
            "TH" => "Thailand",
            "TL" => "Timor-Leste",
            "TG" => "Togo",
            "TK" => "Tokelau",
            "TO" => "Tonga",
            "TT" => "Trinidad and Tobago",
            "TN" => "Tunisia",
            "TR" => "Turkey",
            "TM" => "Turkmenistan",
            "TC" => "Turks and Caicos Islands",
            "TV" => "Tuvalu",
            "UM" => "U.S. Minor Outlying Islands",
            "PU" => "U.S. Miscellaneous Pacific Islands",
            "VI" => "U.S. Virgin Islands",
            "UG" => "Uganda",
            "UA" => "Ukraine",
            "SU" => "Union of Soviet Socialist Republics",
            "AE" => "United Arab Emirates",
            "GB" => "United Kingdom",
            "US" => "United States",
            "ZZ" => "Unknown or Invalid Region",
            "UY" => "Uruguay",
            "UZ" => "Uzbekistan",
            "VU" => "Vanuatu",
            "VA" => "Vatican City",
            "VE" => "Venezuela",
            "VN" => "Vietnam",
            "WK" => "Wake Island",
            "WF" => "Wallis and Futuna",
            "EH" => "Western Sahara",
            "YE" => "Yemen",
            "ZM" => "Zambia",
            "ZW" => "Zimbabwe",
            "AX" => "Åland Islands",  // initialise  English Array
          );
          $countryList2 = array_values($countryList2);

          $countryList =  array_merge($countryList1, $countryList2 ) ;

        //  var_dump($countryList);

          $flipped_country = array_flip($countryList); 
        //  var_dump($flipped_country);
          $str = strtolower($_POST["pays"]); 
        //  var_dump($str);
          $str = ucfirst($str);
        //  var_dump($str);

          if (empty($_POST["pays"])) {
            $error = true;
            $paysError = "Veuillez entrez votre pays.";
        } else if (strlen($_POST["pays"]) < 3) {
            $error = true;
            $paysError = "Le pays doit contenir au moins 3 caractères.";
        } else if (!preg_match("/^[a-zA-Z ]*$/",$_POST["pays"])) {
        $error = true;
            $paysError = "uniquement des lettres et espaces sont autorisés.";
        } else if (strlen($_POST["pays"]) > 42) {
            $error = true;
            $paysError = "Le pays ne doit pas depasser 42 caractères.";
        }else if (isset($flipped_country[$str])) {
            $pays = $_POST["pays"];
        } else{
          $error = true;
          $paysError = "Le nom de votre pays est incorrect .";
          
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

      $options = array(
          'options' => array(
              'max_range' => 699999999,
              'min_range' => 600000000
          )
      );
    
      if (empty($_POST["telephone"])) {
            $error = true;
            $telError = "Veuillez entrez votre numéro de telephone.";
        } else if (strlen($_POST["telephone"]) != 9) {
            $error = true;
            $telError = "Le numero de telephone doit contenir exactement 9 chiffres.";
        } else if (!filter_var($_POST["telephone"], FILTER_VALIDATE_INT, $options)) {
            $error = true;
            $telError = "le numero de telephone n'est pas valide.";
      }  else {
            $telephone = test_input($_POST["telephone"]);
        }
        
    //  Contact Fbk Validation
    
      if (empty($_POST["contactFb"])) {
            $error = true;
            $contactError = "Veuillez entrez votre contact Facebook.";
        } else if (!filter_var($_POST["contactFb"], FILTER_VALIDATE_URL, array('flags' => FILTER_FLAG_SCHEME_REQUIRED ,'flags' => FILTER_FLAG_HOST_REQUIRED, 'flags' => FILTER_FLAG_PATH_REQUIRED))) {
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
    //echo $result_artiste['ObjectURL'] . "\n";
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
    //echo $result_audio['ObjectURL'] . "\n";
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
   // echo $result_cover['ObjectURL'] . "\n";
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
    //print_r($res);
    //echo $response;

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

 

   echo '<script>';
   echo 'document.getElementById(‘message’).style.display = "none";';
   echo '</script>'; 

?>
    
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
                <input type="text" name="email" class="form-control rounded" placeholder="Email">
                <span class="text-danger"><?php echo $emailError; ?></span>
              </div>
            </div>
             <div class="form-group">
            <!--  <label class="col-lg-2 control-label">Email</label> -->
              <div class="col-lg-10">
                <input type="text" name="telephone" class="form-control rounded" placeholder="Téléphone | Ne pas renseigner l'indicatif du pays">
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
  
</div>
</body>

</html>


 
