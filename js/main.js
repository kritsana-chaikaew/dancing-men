var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var mapping = {};
var original = '';
var step_val = 0;

function resetChar() {
  for (var i=0; i<chars.length; i++) {
    mapping[chars[i]] = chars[i];
  }
  render();
}

function resetStep () {
  $('#slider').val(0);
  $('#step').html(0);
  render();
}

function subtitute(cip) {
  var plain = '';
  for (var i=0; i<cip.length; i++) {
    if (cip[i] == ' ') {
      plain = plain + '&nbsp;';
    } else if (cip[i] != mapping[cip[i]]){
      plain = plain + '<b>' + mapping[cip[i]] + '</b>';
    } else {
      plain = plain + mapping[cip[i]];
    }
  }
  return plain;
}

function display() {
  $('#plaintext').html(subtitute(original));
}

function rotate (val) {
  for (var i=0; i<chars.length; i++) {
    mapping[chars[i]] = chars[(i+Number(val))%26];
  }
}

function render() {
  display();
  $("#char").each(function () {
    $(this).html('');
    for (var i=0; i<6; i++) {
      $(this).append(
        '<div class="row w-100 m-0" id="'+i+'"></div>\
        <div></div>'
      );
    }
  });

  $(".row").each(function () {
    $(this).html('');
    var id = Number($(this).attr('id'));
    for (var i=1; i<6; i++) {
      var col_id = (id * 5) + i;
      $(this).append('<div class="col p-0" id="'+col_id+'"></div>');
      if (id == 5) {
        $(this).append('<button class="btn btn-danger w-50" id="reset">reset</button>');
        break;
      }
    }
  });

  $(".col").each(function () {
    var index = Number($(this).attr('id'));
    var key = chars[index-1];
    var map = mapping[key];
    $(this).html(
      '<div class="btn-group w-100 pb-1 pr-1">\
      <button class="btn btn-primary w-50" disabled>'+key+'</button>\
      <button class="btn btn-primary dropdown-toggle w-50" type="button" data-toggle="dropdown">'+map+'</button>\
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">\
      </div>\
      </div>'
    );
  });

  $.each(mapping, function(key, value) {
    $('.dropdown-menu').append('<a class="dropdown-item" href="#" value="'+key+'">'+key+'</a>');
  });

  $('.dropdown-item').click(function () {
    var val = $(this).attr('value');
    var col = $(this).parent().parent().parent();
    var id = col.attr('id');
    var key = chars[id-1]
    mapping[key] = val;
    resetStep();
  });

  $('#cipher').bind('input propertychange', function () {
    $(this).val( $(this).val().replace(/[^a-zA-Z ]/gi, ""));
    var cipher = $(this).val();
    cipher = String(cipher).toUpperCase()
    original = cipher;
    display();
  });

  $('#reset').click(function () {
    resetChar();
    resetStep();
  });

  $('#slider').on('input', function () {
    var val = $(this).val();step_val
    if (step_val != val) {
      step_val = val;
      $('#step').html(step_val);
      rotate(step_val);
      render();
    }
  });
}

resetStep();
resetChar();
