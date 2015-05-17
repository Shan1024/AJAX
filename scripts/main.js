$(function(){

  var $bearsList = $('#bears');
  var $name = $('#name');

  $.ajax ({
    type: 'GET',
    url: '/api/bears',
    success: function(bears){
      console.log('success', bears);
      $.each(bears, function(i, bear){
        // console.log('name', bear.name);
        $bearsList.append('<li>Name: '+bear.name+'</li>');
      });
    },
    error: function(){
      alert('Error loading data');
    }
  });

  $('#add-bear').on('click', function(){

    console.log($name.val());

    var temp = {
      name: $name.val()
    };

    $.ajax({
      type: 'POST',
      url: '/api/bears',
      data: temp,
      success: function(newBear){
        console.log(newBear);
        $bearsList.append('<li>Name: '+newBear.name+'</li>');
      },
      error: function(){
        alert('Error saving bear');
      }
    });

  });

});
