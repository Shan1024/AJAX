$(function(){

  var $bearsList = $('#bears');
  var $name = $('#name');

  var orderTemplate = "<li>"+
  "Name: {{name}}"+
  "<button data-id='{{_id}}' class='remove'>X</button>"+
  "</li>";

  $.ajax ({
    type: 'GET',
    url: '/api/bears',
    success: function(bears){
      console.log('success', bears);
      $.each(bears, function(i, bear){
        console.log('name', bear);
        $bearsList.append(Mustache.render(orderTemplate, bear));
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

  $bearsList.delegate('.remove', 'click', function(){

    var $li = $(this).closest('li');

    $.ajax({
      type: 'DELETE',
      url: 'api/bears/'+$(this).attr('data-id'),
      success: function(){
        $li.remove();
      },
      error: function(){

      }
    });

  });

});
