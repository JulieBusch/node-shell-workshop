var commands = require('./commands')

// console.log(process);
// Output a prompt
process.stdout.write('prompt > ');
//console.log(process);

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  commands.checkInput(cmd);





  // process.stdout.write('You typed: ' + cmd);
  // process.stdout.write('\nprompt > ');

});

