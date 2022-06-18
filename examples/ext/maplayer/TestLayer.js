'use strict';

// Simple map layer that shows up in the "Map Layers" list view and draws on the map.

const { MapLayer } = req("app/maplayer/MapLayer");

const path = require("path");
const ConsoleLog = remote_req("lib/util/ConsoleLog");
const DroneInterface = remote_req("app/DroneInterface");
const MathUtils = remote_req("lib/util/MathUtils");

const TAG = path.basename(__filename, ".js");
const LISTENER_ID = "TestLayer";

function d(str) { ConsoleLog.d(TAG, str); }
function e(str) { ConsoleLog.e(TAG, str); }
function t(str) { ConsoleLog.t(TAG, str); }

class TestLayer extends MapLayer {
    constructor() {
        super();
        this.testLine = null;
        this.dropMarker = null;
        this.mapping = null;
        this.vehiclePosition = null;
        this.drawColor = "white";
        this.tooltip = "You did this";
        this.draggable = true;
        this.someNumber = 432;
    }

    getName() { return "Test Layer"; }
    isEnabled() { return true; }

    setDrawColor(color) {
        e(`setDrawColor(${color})`);
        this.drawColor = color;

        if(this.dropMarker) {
            this.dropMarker.setClass(`wp_smaller nav_${color}`);
        }

        if(this.testLine) {
            this.testLine.setColor(color);
        }
    }

    setTooltip(v) {
        e(`setTooltip(${v})`);
        this.tooltip = v;

        if(this.dropMarker) {
            this.dropMarker.setTitle(v);
        }
    }

    setSomeNumber(v) {
        e(`setSomeNumber(${v})`);
    }

    setDraggable(b) {
        e(`setDraggable(${b})`);
        this.draggable = b;

        if(this.dropMarker) {
            this.dropMarker.setDraggable(b);
        }
    }

    getProperties() {
        // Return an object dictating what's shown on the Layer Properties popup
        return {
            // valid prop types are enum, boolean, string, number.
            props: [
                {
                    id: "drawColor", name: "Arrow Color", type: "enum",
                    values: [
                        { id: "blue", name: "Blue", value: "blue" },
                        { id: "white", name: "White", value: "white" },
                        { id: "red", name: "Red", value: "red" },
                        { id: "yellow", name: "Yellow", value: "yellow" },
                        { id: "magenta", name: "Magenta", value: "magenta" }
                    ],
                    get: (item) => item.drawColor, set: (item, value) => { item.setDrawColor(value); }
                },
                { id: "tooltip", name: "Tooltip", type: "string", get: (item) => item.tooltip || "", set: (item, value) => { item.setTooltip(value); } },
                { id: "someNumber", name: "A Number", type: "number", get: (item) => item.someNumber || "", set: (item, value) => { item.setSomeNumber(value); } },
                { id: "draggable", name: "Draggable", type: "boolean", get: (item) => item.draggable || false, set: (item, value) => { item.setDraggable(value); } }
            ],
            // Actions the layer can perform. These are basically functions in the layer object. A button is created for each action.
            actions: [
                { id: "doSomething", name: "Do something", perform: (item) => item.doSomething() },
                { id: "otherThing", name: "Other thing", perform: (item) => item.otherThing() }
            ]
        }
    }

    setActive(active) {
        super.setActive(active);
        // A layer is active when a user turns it on. When turned off, it shouldn't be listening to drone events, etc. since it won't do anything
        // with drone events anyway.
        e(`setActive(): ${active}`);

        if(active) {
            DroneInterface.addDroneListener(LISTENER_ID, {
                onLocationUpdated: (vehicle, where) => {
                    this.vehiclePosition = where;

                    if (this.dropMarker) {
                        const outPoint = this.dropMarker.position;

                        if (this.dropMarker) {
                            const pointHere = MathUtils.getHeadingFromCoordinates(outPoint, where);
                            this.dropMarker.rotate(pointHere);
                        }

                        if (this.testLine) {
                            this.mapping.setLinePoints(this.testLine, [where, outPoint]);
                        } else {
                            this.testLine = this.mapping.addLine({ points: [where, outPoint], width: 2, color: this.drawColor });
                        }
                    }
                }
            });
        } else {
            DroneInterface.removeDroneListener(LISTENER_ID);
        }

        // Show/hide map elements based on active status.
        if(this.dropMarker) {
            this.dropMarker.setVisible(active);
        }

        if(this.testLine) {
            this.testLine.setVisible(active);
        }
    }

    onPageCreate(mapping) {
        this.mapping = mapping;
    }

    // Host page is being destroyed.
    onPageDestroy() {
        if(this.mapping) {
            if(this.dropMarker) this.mapping.removeMarker(this.dropMarker);
            if(this.testLine) this.mapping.removeLine(this.testLine);
        }

        this.dropMarker = null;
        this.testLine = null;
    }

    // User clicked the map at the specified location (lat, lng)
    onMapClick(where) {
        if(!this.active) return;

        if(!this.dropMarker) {
            this.dropMarker = this.mapping.addMarker({ where: where, class_name: "wp_smaller nav_white", title: this.tooltip, draggable: true });
        } else {
            this.dropMarker.moveTo(where);

            if(this.mapping && this.testLine && this.vehiclePosition) {
                this.mapping.setLinePoints(this.testLine, [ this.vehiclePosition, where ]);

                this.dropMarker.rotate(MathUtils.getHeadingFromCoordinates(where, this.vehiclePosition));
            }
        }
    }

    // Marker was right-clicked.
    onMarkerRightClick(marker) {
        if (!this.active) return;

        if(this.mapping && this.dropMarker && marker.id == this.dropMarker.id) {
            this.mapping.removeMarker(this.dropMarker);
            this.dropMarker = null;

            if(this.testLine) {
                this.mapping.removeLine(this.testLine);
                this.testLine = null;
            }
        }
    }

    // User finished dragging a marker.
    onMarkerDragEnd(marker) {
        if (!this.active) return;

        // If this is our marker, update the line
        if(this.mapping && this.dropMarker && this.dropMarker.id == marker.id) {
            if(this.testLine && this.vehiclePosition) {
                this.mapping.setLinePoints(this.testLine, [ marker.position, this.vehiclePosition ]);
                this.dropMarker.rotate(MathUtils.getHeadingFromCoordinates(marker.position, this.vehiclePosition));
            }
        }
    }

    onMapCleared() {
        this.dropMarker = null;
        this.testLine = null;
    }

    // Actions
    doSomething() {
        e(`doSomething()`);
    }

    otherThing() {
        e(`otherThing()`);
    }
}

// If a module only exports one layer type, newInstance() can be implemented to instantiate the layer.
// exports.newInstance = () => {
//     return new TestLayer();
// }

// If a module exports multiple layer types, return a list of type ids, one for each supported layer type
exports.getTypes = () => {
    return [ "test" ];
}

// Return a new instance of the specified type (returned from getTypes())
exports.newInstanceOf = (type) => {
    switch(type) {
        case "test": return new TestLayer();
        default: return null;
    }
}

