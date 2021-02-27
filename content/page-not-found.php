<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Nasbi.com</title>
   <link rel="icon" href="../imagen/Logo-Blanco.png">
   <?php include '../include/include-css.php'; include '../include/head-js.php';?>
</head>
<body>
   <div align="center">
      <div class="row">
         <div class="col-12">
            <div class="content">
               <img src="../imagen/404.svg" class="img">
               <h4>Parece que esta página no existe</h4>
               <a href="index.php" >Ir a la página principal</a>
            </div>
         </div>
      </div>
   </div>
</body>
</html>


<style>
   .row{
      align-items: center;
   }
   .img{
      margin-top: 70px;
      width: 300px;
   }
   h4{
      margin: 0;
      font-size: 15px;
      color: #FF103D;
      font-family: "Geometos";
   }
   div a{
      color: #232A85;
      font-size: 14px;
      text-decoration: underline;
   }

   @media (max-width: 575px){
      h4{
         font-size: 13px;
      }
      .img{
         width: 230px;
      margin-top: 100px;
      }
   }
</style>