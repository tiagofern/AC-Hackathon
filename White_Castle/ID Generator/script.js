

function drawCanvas() {
 const canvas = document.getElementById("demo");
  const ctx = canvas.getContext("2d");

var arr = [
    Math.ceil(Math.random() * 9),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ];

 


  var img = new Image();
  var lastname = document.getElementById("lastname").value;
  var firstName = document.getElementById("firstName").value;
  var gender = document.getElementById("gender").value;
  var height = document.getElementById("height").value;
  var birthDate = document.getElementById("birthDate").value;
  var nationatily = "PRT";
  var id = arr.join("");
  var expirationDate = "20/12/2029";



  img.onload = () => {
    var img2 = new Image();

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    img2.onload = function () {
      ctx.drawImage(img2, 200, 480, 440, 100);

      ctx.font = "28px Arial";
      ctx.fillStyle = "rgb(0, 0, 0)";

      ctx.fillText(firstName, 275, 252);
      ctx.fillText(lastname, 275, 163);
      ctx.fillText(gender, 270, 350);
      ctx.fillText(height, 326, 350);
      ctx.fillText(birthDate, 540, 350);
      ctx.fillText(nationatily, 430, 350);
      ctx.fillText(id, 282, 440);
      ctx.fillText(expirationDate, 540, 440);

      var img3 = new Image();
      img3.onload = function () {
        ctx.drawImage(img3, 704, 284, 205, 285);
      };
      img3.src = "images/Ralph_grande.png";
      var img4 = new Image();

      img4.onload = function () {
        ctx.drawImage(img4, 102, 450, 85, 90);
      };

      img4.src = "images/Ralph_pequeno.png";
    };

    img2.src = "images/ass.png";
  };

  var img3 = new Image();

  img3.onload = function () {
    ctx.drawImage(img2, 300, 480, 140, 100);
  };

  img3.src = "images/img3.png";

  img.src = "CC_clean.png";

  const downloadBtn = document.getElementById("download-btn");
  downloadBtn.addEventListener("click", function () {
    const canvas = document.getElementById("demo");
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.download = "my-image.jpg";
    link.href = imgData;
    link.click();
  });


}