$(function(){

  var $bearsList = $('#bears');
  var $name = $('#name');

  var orderTemplate = $('#bear-template').html();

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
        $bearsList.append(Mustache.render(orderTemplate, newBear));
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
      url: 'api/bears/'+$li.attr('data-id'),
      success: function(){
        $li.fadeOut(300, function(){
          $(this).remove();
        });
      },
      error: function(){

      }
    });

  });

  $bearsList.delegate('.editBear', 'click', function(){
    var $li = $(this).closest('li');
    $li.find('input.name').val($li.find('span.name').html());
    $li.addClass('edit');
  });

  $bearsList.delegate('.cancelEdit', 'click', function(){
    var $li = $(this).closest('li');
    $li.removeClass('edit');
  });

  $bearsList.delegate('.saveEdit', 'click', function(){

    var $li = $(this).closest('li');

    var temp = {
      name: $li.find('input.name').val()
    };

    $.ajax({
      type: 'PUT',
      url: '/api/bears/'+$li.attr('data-id'),
      data: temp,
      success: function(newBear){
        console.log(newBear);
        $li.find('span.name').html(newBear.name);
        $li.removeClass('edit');
    },
      error: function(){
        alert('Error updating bear');
      }
    });

  });

});
