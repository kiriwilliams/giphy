$(document).ready(function(){

    var topics = ["clouds","waves","leaves","windy","snail","dewdrop","fern","ripple"];
    loadButtons(topics);
    function loadButtons(topics){
        $("#tags").empty();
        for(var i = 0; i < topics.length; i++){
            var tag = topics[i];
            button = $("<button>");
            button.attr({"class":"tag","data-keyword":tag}).text(tag);
            $("#tags").append(button);
            button.on("click",function(){
                var keyword = $(this).attr("data-keyword");
                getGifs(keyword);
            });
        }
    }
    $("#submit").on("click", function(event){
        event.preventDefault();
        topics.push($("#text").val().trim());
        loadButtons(topics);        
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

                gif.attr("class","block");
                rating.text("Rating: "+rated);
                img.attr({
                    "src": stillURL,
                    "data-moving": moving,
                    "data-stillURL": stillURL,
                    "data-movingURL": movingURL,
                    "class": "giphy"
                });
                img.on("click",function(){
                    if($(this).attr("data-moving") == "true"){
                        $(this).attr({
                            "data-moving":"false",
                            "src": $(this).attr("data-stillURL")
                        });
                    }
                    else{
                        $(this).attr({
                            "data-moving":"true",
                            "src": $(this).attr("data-movingURL")
                        })
                    }
                });
                gif.append(rating).append(img);
                
                $(".results").prepend(gif);
            });
           
        })
    }

});