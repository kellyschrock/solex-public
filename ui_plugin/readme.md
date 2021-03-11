# Solex/Desktop UI Plugins

UI plugins are a way to customize the flight screen, video screen and map screen arbitrarily with a JavaScript file. You have access to the vehicle, `UserVehicle` features, and all of the SDKs Solex/Desktop has access to.

## Creating and installing a plugin

This is pretty easy... In the Solex home directory, find the `ext` directory and the `plugin` directory under that. Make a directory for your plugin, and put a JavaScript file in it. 

Now, navigate to the `user_vehicle` directory and find the file for the appropriate vehicle. Open it, and put something like this in it:

```json
    "plugins": [
        { "id": "path_driver_ui", "name": "Path Driver UI", "path": "path_driver_ui/index.js" }
    ],
```

The `path` component of the plugin item above is the relative path from the `plugin` directory. If Solex/Desktop finds this file, it will load it into the UI and call its `onLoad()` function if present. 

The `path_driver_ui` example in this repo is an example of a UI plugin that gets notified when a mission is loaded into the flight screen, and adds a "Run Path" button to the right-hand toolbar on the map screen. When you click it, it uses the `path_driver` SolexCC worker to run the mission in Guided mode (as opposed to Auto mode as with conventional missions).

