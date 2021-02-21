# Performance Settings

When you need to adjust specific parameters on your vehicle to affect the way it operates, you can use sliders from the flight screen (map and video modes). 

Sliders were were initially implemented in Solex/Android to allow quick adjustment of parameters that affect the "speed" (responsiveness to pitch/roll inputs) and "steering" (responsiveness to yaw inputs) of a 3DR Solo. This was implemented using a specific set of parameters that applied to the Solo, along with parameter values for each of the 5 possible performance settings (very slow, slow, medium, fast, very fast). These parameters were embedded in Solex itself. This made it easy for a 3DR Solo user to confidently adjust their Solo's performance, but also made the sliders irrelevant for any other vehicles.

The sliders system has thus been changed to make the sliders user-configurable, allowing adjustments to the handling of any vehicle type (copter, plane, rover), and only used where they're relevant.

This page details how you can create a performance-slider preset file and assign it to your vehicle.

It should also be made clear that the process of assigning parameters to a slider and using the slider to adjust a vehicle's flight characteristics should in no way be considered "tuning", any more than changing the radio station in your car is considered "tuning" your car. Tuning is a process where you arrive at parameter values that make the vehicle fly well in general. Perf sliders are meant to function more like a "drive mode" selector in a fancy car: Select "rain/snow" mode to ensure your car never spins its tires, "sport" mode to make the engine noisier and the handling more skiddy, etc. It's not "tuning". It's more like "tweaking".

This page details how you can create perf-slider preset for use with your vehicle. The general idea (as of this date) is that users with various vehicles can create slider presets, notify me (the author of Solex) and have those files included in the set of presets embedded in Solex.


## Solex/Android

Embedded within Solex are several slider presets you can use. Go into the "Vehicles" screen and select your vehicle from the list listed by SSID or `connectiontype_VEHICLE_TYPE` (e.g. `usb_ROVER`). A form appears with details about your vehicle, where you can give it a name, etc. One of the fields at the top is "Slider Preset", and is a drop-down list of all of the available presets; those embedded in Solex itself, and those you might have created and stored as files on your Android device. There are presets for Black Cube - Copter, Green Cube - Copter, Orange Cube - Copter, etc. 

Select the appropriate slider and click "SAVE". If you're already connected to the vehicle, disconnect and re-connect. After connecting again, open the flight screen, click "Controls" in the lower-left area of the screen, and click the "sliders" button. You'll see a panel pop out with labels like "Speed", "Steering", and "Yaw". Moving these sliders will change the parameters they affect, and change the handling characteristics of your vehicle.

If you don't want to see sliders at all, select "None" from the drop-down list in the Vehicles screen.

You can also create a `sliders` element in the file for a vehicle directly, with the content of the `sliders` element having the same structure as the slider example below.

## Creating a preset

You can create your own presets by placing files on your Android device in the `/sdcard/Solex/perf_preset` directory. You need at least 2 files: `perf_preset_index.json`, and at least one other file that contains the actual slider definitions (and is referenced from `perf_preset_index.json`).

### `perf_preset_index.json`

Here is an example of what the index looks like:

```json
[
  { "id":  "my_huge_copter", "name": "My huge copter", "path":  "my_huge_copter.json" },
  { "id":  "tiny_copter", "name": "Tiny copter", "path":  "tiny_copter.json" }
]
```

Create a file in the `/sdcard/Solex/perf_preset` directory named `my_huge_copter.json` (for this example) and put the slider definition below in the file.
Create another one called `tiny_copter.json` in the same place. Now, when you look at a vehicle's details in the Vehicles screen, you'll notice "My huge copter"
and "Tiny copter" in the list of available presets.

## Solex/TX on HereLink

Since there is only one connection in Solex/TX on HereLink (the corresponding air-side unit), there is only one slider set to deal with.


## Solex/Desktop

The process for Solex Desktop is different and simpler -- owing to the fact that on a real computer, you can actually use the file system without having to work around Google's desire to keep you away from it.

Each time you connect a vehicle, a file is created in the `user_vehicle` directory in the Solex home directory (under your user directory). This file is where many things related to your vehicle are specified, and `sliders` is just one of those things. Definitions found in this file are used when you connect to that specific vehicle, and there are no presets. The slider definitions are the same as what's described elsewhere in this document.

## Slider definitions

Here's an example of a slider definition for a copter, giving 3 sliders: Speed, Steering, and Yaw (for missions).

```json
[
  {
    "id": "speed", "name": "Speed", "def_param_index": 0, "def_value_index": 2,
    "names": [ "Very Slow", "Slow", "Medium", "Fast", "Very Fast" ],
    "params": [
      { "param": "ANGLE_MAX", "values": [ 2000, 2333, 2649, 2950, 3500 ] },
      { "param": "LOIT_SPEED", "values": [ 500, 700, 900, 1100, 1500 ] },
      { "param": "PILOT_VELZ_MAX", "values": [ 133, 186, 240, 293, 400 ] },
      { "param": "PILOT_SPEED_UP", "values": [ 133, 186, 240, 293, 400 ] },
      { "param": "PILOT_SPEED_DN", "values": [ 133, 186, 240, 293, 400 ] },
      { "param": "PILOT_ACCEL_Z", "values": [ 100, 140, 180, 220, 300 ] },
      { "param": "ATC_ACCEL_R_MAX", "values": [ 36000, 43200, 50400, 57600, 72000 ] },
      { "param": "ATC_ACCEL_P_MAX", "values": [ 36000, 43200, 50400, 57600, 72000 ] },
      { "param": "RC_FEEL_RP", "values": [ 20, 28, 36, 44, 70 ] },
      { "param": "ATC_INPUT_TC", "values": [ 0.25, 0.21, 0.18, 0.16, 0.11 ] },
      { "param": "ACRO_BAL_PITCH", "values": [ 1, 0.5, 0.25, 0.1, 0 ] },
      { "param": "ACRO_BAL_ROLL", "values": [ 1, 0.5, 0.25, 0.1, 0 ] },
      { "param": "ACRO_RP_P", "values": [ 4, 4.8, 5.6, 6.4, 8 ] },
      { "param": "ACRO_TRAINER", "values": [ 2, 2, 2, 2, 0 ] }
    ]
  },
  {
    "id": "steering", "name": "Steering", "def_param_index": 0, "def_value_index": 2,
    "names": [ "Slowest", "Slow", "Normal", "Fast", "Fastest" ],
    "params": [
      { "param": "ATC_ACCEL_Y_MAX", "values": [7000.0, 9800.0, 12600.0, 22400.0, 36000.0] },
      { "param": "ACRO_YAW_P", "values": [1.0, 1.4, 1.8, 2.2, 3.0] }
    ]
  },
  {
    "id": "yaw", "name": "Yaw", "def_param_index": 0, "def_value_index": 2,
    "names": [ "Slowest", "Slow", "Normal", "Faster", "Fastest" ],
    "params": [
      { "param": "ATC_ACCEL_Y_MAX", "values": [7000.0, 9800.0, 12600.0, 22400.0, 36000.0] },
      { "param": "ACRO_YAW_P", "values": [1.0, 1.4, 1.8, 2.2, 3.0] }
    ]
  }
]

```

As you can see, this is JSON, and the top element is an array of sliders. Each slider has the following fields:

*	`id`: Used to identify the slider, and must be unique within the set.
*	`name`: What you see in the slider panel next to the slider.
*	`names`: The labels that appear for each of the values in the slider's range.
*	`def_param_index`: The index into the `params` array that Solex uses to figure out where to put the slider initially when the screen loads.
*	`def_value_index`: The index of the value in the default parameter to use when setting a default value when the screen loads.
*	`params`: A list of vehicle parameters affected by the slider:
	*	`param`: The name of the affected parameter.
	*	`values`: An array of values, one for each of the values in the slider's range.

### Some important notes

*	You can have any number of `names` for a given slider, as long as that number is greater than 2.
*	The number of values for each `param` *MUST* match the number of `names` for a given slider. 
*	The number of values must be the same for *ALL* `param` elements within a slider.

