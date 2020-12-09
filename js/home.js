
      $(document).ready(function(){
        $('.heartContent').click(function(){
          if( $(this).text().trim() == "Like" )
        {
          console.log( $(this))
          $(this).toggleClass("heart-active")
          $(this).children('span').toggleClass("heart-active")
          $(this).children('span.numb').css("Text",55)
          
          //$('.heartContent').toggleClass("heart-active")
          //$('.heartTtext').toggleClass("heart-active")
          //$('.numb').toggleClass("heart-active")
          //$('.heart').toggleClass("heart-active")
        }
        });
        $('.starContent').click(function(){
          $(this).toggleClass("star-active")
          $(this).children('span').toggleClass("star-active")
          });
        $('.postTitle').click(function(){
          window.location.href = "../html/post.html";
        });
        $('.addPost').click(function(){
          window.location.href = "../html/publishArticle.html";
        });
      });
