'use strict';

const profiles = req("lib/profile/VehicleProfile");
const Vehicle = req("lib/drone/VehicleShell");

class MyMowerProfile extends profiles.RoverVehicleProfile {
    constructor() {
        super("MyMowerProfile");
    }

    matches(vehicle) { 
        return false; // super.matches(vehicle); 
    }
}

class PretenduranceProfile extends profiles.CopterVehicleProfile {
    constructor() {
        super("Pretendurance");
    }

    matches(vehicle) {
        return false; // TODO
    }
}

exports.getVehicleProfiles = () => {
    return [
        new MyMowerProfile(),
        new PretenduranceProfile()
    ];
};

