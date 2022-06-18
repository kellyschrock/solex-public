'use strict';

// Simple module that translates a simple "land" command into an actual landing.

const Vehicle = req("lib/drone/VehicleShell");

function performLandCommand() {
    const vehicle = Vehicle.getCurrentVehicle();
    Vehicle.land(vehicle);
    return "Start landing";
}

exports.processCommand = (input) => {
    if(input.toLowerCase() == "land") {
        return performLandCommand();
    }

    return null;
};

exports.handlesKeyword = (word) => word.toLowerCase() == "land";

exports.getHelp = () => {
    return `land\tLand the vehicle\tUsage: land`;
}

