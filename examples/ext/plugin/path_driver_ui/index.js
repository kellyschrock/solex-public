'use strict';

const TAG = require("path").basename(__filename, ".js");

const VehicleShell = remote_req("lib/drone/VehicleShell");
const { SolexCC, WorkerCommand, MessageFilter } = remote_req("solexcc/SolexCC");

const WORKER_ID = "path_driver";
const MSG_RUN_PATH = "run_path";

function d(str) { remote_req("lib/util/ConsoleLog").d(TAG, str); }
function e(str) { remote_req("lib/util/ConsoleLog").e(TAG, str); }
function t(str) { remote_req("lib/util/ConsoleLog").t(TAG, str); }

let mVehicle = null;
let mUserVehicle = null;
let sendButton = null;
let mConfig = {};
let mCallback = null;
const mPath = [];

function onSendButtonClick() {
    if(!mUserVehicle) {
        return e(`send: No UserVehicle`);
    }

    const msg = {
        speed: 1,
        path: mPath
    };

    const cc = mUserVehicle.getCC();
    if(cc) {
        d(`Send ${MSG_RUN_PATH} to ${WORKER_ID}`);

        cc.sendWorkerCommand(new WorkerCommand(WORKER_ID, MSG_RUN_PATH, msg), {
            onSuccess: (command, response) => {
                e(`Yay! onSuccess()`);
            },

            onFailure: (command, response) => {
                e(`Request failed: ${response.message}`);

                if(mCallback && mCallback.onError) {
                    mCallback.onError(mConfig.id, mConfig.name, `${command.id} request failed`);
                }
            }
        });
    } else {
        return e(`send: No CC`);
    }
}

exports.onLoad = function onLoad(config, vehicle, userVehicle, callback) {
    d(`onLoad(): config=${JSON.stringify(config)}`);
    Object.assign(mConfig, config);
    mVehicle = vehicle;
    mUserVehicle = userVehicle;
    mCallback = callback;
}

exports.onMissionLoaded = function onMissionLoaded(mission) {
    d(`onMissionLoaded()`);

    const items = mission && mission.getItems && mission.getItems();
    if(items) {
        mPath.splice(0, mPath.length);

        let currSpeed = 1;
        for(const item of items) {
            // e(`item.type=${JSON.stringify(item.type)}`);
            if(item.speed) currSpeed = item.speed;
            const where = item.getLocation && item.getLocation() || null;
            if(where) {
                where.speed = currSpeed;
                mPath.push(where);
            }
        }

        if(sendButton) {
            sendButton.show();
        }
    } else {
        if(sendButton) {
            sendButton.hide();
        }
    }
}

exports.onMissionCleared = function onMissionCleared() {
    if(sendButton) {
        sendButton.hide();
    }
}

exports.onFlightPageLoad = function onFlightPageLoad() {
    d(`onFlightPageLoad()`);
}

exports.onFlightPageUnload = function onFlightPageUnload() {
    d(`onFlightPageUnload()`);
}

exports.onMapPageLoad = function onMapPageLoad() {
    d(`onMapPageLoad()`);

    const button = $("<button></button>")
        .addClass("ButtonDark")
        .addClass("Bordered")
        .addClass("panelbutton")
        .text("Run Path")
        ;

    button.on("click", onSendButtonClick);

    button.hide();
    sendButton = button;

    $("#right_panel").append(button);
}

exports.onMapPageUnload = function onMapPageUnload() {
    d(`onMapPageUnload()`);
}

exports.onVideoPageLoad = function onVideoPageLoad() {
    d(`onVideoPageLoad()`);
}

exports.onVideoPageUnload = function onVideoPageUnload() {
    d(`onVideoPageUnload()`);
}
