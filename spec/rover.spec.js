const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let position = new Rover(1234);
    expect(position.mode).toEqual('NORMAL');
    expect(position.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    //console.log(response);
    expect(response.results.length).toEqual(2);
  });

  it("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    //console.log(commands);
    let message = new Message('Test message with one command', commands);
    //console.log(message);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message).results;
    expect(response[0].roverStatus.mode).toEqual(rover.mode);
    expect(response[0].roverStatus.generatorWatts).toEqual(rover.generatorWatts);
    expect(response[0].roverStatus.position).toEqual(rover.position);
  });

  it("responds correctly to the mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    //console.log(commands);
    let message = new Message('Test message with one command', commands);
    //console.log(message);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    //console.log(rover.mode);
    expect(rover.mode).toEqual('LOW_POWER');
    commands = [new Command('MODE_CHANGE', 'NORMAL')];
    //console.log(commands);
    message = new Message('Test message with one command', commands);
    //console.log(message);
    rover = new Rover(98382);
    response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('NORMAL');
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('MOVE', 1000)];
    //console.log(commands);
    let message = new Message('Test message with one command', commands);
    //console.log(message);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message).results;
    expect(response[1].completed).toEqual(false);
  });

  it("responds with the position for the move command", function() {
    let roverPosition = 4321;
    let stepsMoved = 100;
    let commands = [new Command('MOVE', stepsMoved)];
    //console.log(commands);
    let message = new Message('Test message with one command', commands);
    //console.log(message);
    let rover = new Rover(roverPosition);
    let response = rover.receiveMessage(message).results;
    expect(rover.position).toEqual(stepsMoved);
  });
  });
