'use strict';

exports.onLoad = () => {
    const vehicle = remote_req("lib/drone/VehicleShell").getCurrentVehicle();
    const buttonArea = $("#worker_shot_buttons");
    
    // buttonArea.load(`${__dirname}/worker_shots.html`, () => {
    //     buttonArea.show();
    // });
};

exports.onUnload = () => {
    // Unload the module
};


