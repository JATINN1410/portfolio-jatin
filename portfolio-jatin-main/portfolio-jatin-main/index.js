
    var typed = new Typed('#element', {
      strings: ['<i>WEBDEVELOPER</i>', '&amp;  CODER','LEARNER'],
      typeSpeed: 50,
    });
    var stringsArray = [`<i>1) Secured the position of “School Topper” from class 1 to .</i>`,`</br> `, '2) Awarded scholarship worth 10k+ in various academic and competitive domains. </br>', '3)Got AIR 9th in 11th AMU entrance.</br>','4) School topper of PCM in class 11th.</br>',' 5)Scored 99.7 , 99.4, 99+, 99+ percentile in maths in jee mains with rank 22.5K and overall percentile of 97.5 .</br>','6)Got selected in jee advanced with a rank under 18k.</br>','7)Got AIR 95 in AMUEEE .</br>',' 8)I have solved 850+ problems on Coding Ninjas platform(EXP 20k+), and got the certificate for pointers.</br>','9)Certificate of Flipkart GRiD 5.0 - Software Development Track.</br>','10)Got 2nd rank in IEEE (ZHECT) online quiz .</br>'];
    var typed2 = new Typed('#element2', {
    
      strings: [stringsArray.join('  ')],
      typeSpeed: 10,
     
      onComplete: function (self) {
        // Add the next string to the existing content
        var nextString = stringsArray.shift();
        if (nextString) {
          self.strings = [self.strings[0] + nextString];
        
          self.start();
        }
       
      },
    });
       

    // function([string1, string2],target id,[color1,color2])    
 consoleText(['SECONDARY SCHOOLING.', 'SENIOUR SECENDORY SCHOOLONG', 'GRADUATION.'], 'text',['orange','lightblue','orange']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}
const theme=document.querySelector("#theme");
theme.addEventListener('click',()=>{
theme.textContent="light mode";
document.getElementById("nav").style.backgroundColor=" rgb(142 99 232)";
document.getElementById("foot").style.backgroundColor=" rgb(113 89 230)";

});


function timestart(){
  let sec=0;
  let min=0;
  setInterval(() => {
    sec++;
    if(sec==60)
    {
      min=min+1;
      sec=0;
      document.getElementById("right2").innerText=`min${min}  sec${sec}`;
    }
    else{
      document.getElementById("right2").innerText=`min${min}  sec${sec}`;
    }
 
  
  }, 1000);
}
timestart();

