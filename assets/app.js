$(document).ready(function(){

    $(".tag").on("click",function(){
        console.log("hi");
        var keyword = $(this).attr("data-keyword");
        getGifs(keyword);
    });

    function getGifs(keyword){
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Lt9w0mHeKyolbv2uVngRO2equXDDpbyE&limit=10&q="+keyword;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var gifSet = response.data;
            //add to page
            gifSet.forEach(function(giphyObj){
                var gif =  $("<div>");
                var img = $("<img>");
                var rating = $("<h6>");

                var rated = giphyObj.rating;
                var moving = false;
                var stillURL = giphyObj.images.fixed_width_still.url;
                var movingURL = giphyObj.images.fixed_width.url;

                rating.text("Rating: "+rated);
                img.attr({
                    "src": stillURL,
                    "data-moving": moving,
                    "data-stillURL": stillURL,
                    "data-movingURL": movingURL
                });
                gif.append(rating).append(img);
                console.log(gif);
                $(".results").prepend(gif);
            });
           
        })
    }

});