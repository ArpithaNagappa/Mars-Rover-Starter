
const Message = require('./message.js');
const Command = require('./command.js');
class Rover {
   // Write code here!
   constructor (position){
      this.position =position;
      if (!position) {
        throw Error("position is required.");
      }
      this.mode ='NORMAL';
      this.generatorWatts = 110;
   }

receiveMessage(message)
{
  
  let commandOutput = [];
  let commandStatus = false;
  for(let i=0;i<message.commands.length;i++)
  {
    if(message.commands[i].commandType=='STATUS_CHECK')
    {
      commandOutput[commandOutput.length] = {
               completed: true,
               roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }
           } 
    }

    if(message.commands[i].commandType=='MOVE')
    {
      if(this.mode == 'LOW_POWER')
      {
      commandOutput[commandOutput.length] = {
                       completed: false
             } 
      }
      else
      {
      commandOutput[commandOutput.length] = {
                         completed: true
                      } 
      this.position = message.commands[i].value;
      }
    }

    if(message.commands[i].commandType=='MODE_CHANGE')
    {
      commandOutput[commandOutput.length] = {
                                                  completed: true
                                                 } 
      this.mode = message.commands[i].value;
    }
  }
  //console.log(commandOutput);

  let output = {
                 'message':message.name,
                 results: commandOutput
               };
  return output
}
}


module.exports = Rover;
