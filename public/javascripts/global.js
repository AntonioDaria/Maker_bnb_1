// spacelist data array for filling in info box
var spaceListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the Space table on initial page load
  populateTable();

});

$('#btnAddSpace').on('click', addSpace);

// Delete User link click
$('#spaceList table tbody').on('click', 'td a.linkdeletespace', deleteSpace);

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/users/spaceList', function( data ) {
    spaceListData = data;

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td>' + this.name + '</td>';
      tableContent += '<td>' + this.description + '</td>';
      tableContent += '<td>' + this.price + '</td>';
      tableContent += '<td><a href="#" class="linkdeletespace" rel="' + this._id + '">delete</a></td>'
    });

    // Inject the whole content string into our existing HTML table
    $('#spaceList table tbody').html(tableContent);
  });
};

// Add Space
function addSpace(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addSpace input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all Space info into one object
    var newSpace = {
      'name': $('#addSpace fieldset input#inputSpaceName').val(),
      'description': $('#addSpace fieldset input#inputSpaceDescription').val(),
      'price': $('#addSpace fieldset input#inputSpacePrice').val()
    }

    // Use AJAX to post the object to our addSpace service
    $.ajax({
      type: 'POST',
      data: newSpace,
      url: '/users/addspace',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addSpace fieldset input').val('');

        // Update the table
        populateTable();

      }
      else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  }
  else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};

// Delete User
function deleteSpace(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this user?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/users/deletespace/' + $(this).attr('rel')
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      populateTable();

    });

  }
  else {

    // If they said no to the confirm, do nothing
    return false;

  }

}
