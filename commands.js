var fs = require('fs');
var commands = {};

commands.checkInput = function(cmd) {
  if (cmd === "pwd"){
    commands.pwd();
  }
  if (cmd === "date"){
    commands.date();
  }
  if (cmd === "ls"){
    commands.ls();
  }
  if (cmd.slice(0, 4) === "echo"){
    commands.echo(cmd);
  }
  if (cmd.slice(0, 3) === "cat"){
    var file = cmd.slice(4);
    commands.cat(file);
  }
  if (cmd.slice(0, 4) === "tail"){
    var file = cmd.slice(5);
    commands.tail(file);
  }
  // process.stdout.write('\nprompt > ');
};

commands.pwd = function(fileName) {
  var lastSlash = process.argv[1].lastIndexOf("/");
  var directory = process.argv[1].slice(0, lastSlash);
  process.stdout.write(directory);
  process.stdout.write('\nprompt > ');
}

commands.date = function(fileName) {
  var theDate = new Date();
  process.stdout.write(theDate.toString());
  process.stdout.write('\nprompt > ');
}

commands.ls = function(fileName) {
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      process.stdout.write(file.toString() + "\n");
    });
    process.stdout.write('\nprompt > ');
  });
}

commands.echo = function(cmd){
  cmd = cmd.slice(5);

  if(cmd.charAt(0) === "$"){
    cmd = cmd.slice(1);
    var path = process.env[cmd];
    process.stdout.write(path);
  } else {
   process.stdout.write(cmd);
  }

  process.stdout.write('\nprompt > ');

}

commands.cat = function(fileName){
  fs.readFile(fileName, function(err, data){
    if (err) throw err;
    process.stdout.write(data);
  });
}

commands.head = function(fileName) {
  fs.readFile(fileName, function(err, data){
    if (err) throw err;
    var dataArr = data.toString().split("\n");
    var dataHead = dataArr.slice(0, 5).join("\n");
    process.stdout.write(dataHead);
    process.stdout.write('\nprompt > ');
  });
}

commands.tail = function(fileName) {
  fs.readFile(fileName, function(err, data){
    if (err) throw err;
    var dataArr = data.toString().split("\n");
    var dataTail = dataArr.slice(-5).join("\n");
    process.stdout.write(dataTail);
    process.stdout.write('\nprompt > ');
  });
}

module.exports = commands;
