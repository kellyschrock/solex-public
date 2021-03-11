
# Solex Copter

(_NOTE:_ "Solex Copter" is the name this project has, until I come up with a real name for it.)

A few people have asked for information about the Solex Copter, and here's what's known about it so far.

Here are the design goals I had starting out:

*	Amenable to experimentation. That means it's big enough to provide room for the basic stuff (flight controller, receiver, GPS, ESC, and
	a companion computer and of course a battery). This works out to it being roughly the same size and weight as a 3DR Solo.
*	Something that could be made out of cheap easily-attainable materials.
*	Not looking like someone raided the tubing-and-bolts section of a hardware store in order to build it.
*	Folding arms. 

To get to these goals, I had the idea for a frame with vertical side rails held at a distance from each other by stand-offs of various lengths. 
This makes it possible to make the copter wider or narrower, depending on what's inside. The stuff inside is mounted on movable shelves that slide in and 
latch into place in various slots. This makes it possible to lower the bottom shelf to make room for a bigger battery, or make it wider to accommodate a 
bigger companion computer or whatever. All of this goes toward the goal of making it amenable to experimentation. The bulk of experimentation is, for me,
a process of sticking various things in the copter, and the fact that it can accommodate things of different heights and widths helps with that.

As for the cheap easily-attainable materials, well... the frame is easy. Rotor arms (especially ones that fold) took a while, though the process of designing 
them and getting them to work was kind of fun. Overall, the total material cost in this copter's frame is around $15. The amount of time it takes to print and mill everything is probably 30 hours. Total weight is 1125 grams without the battery. 

As for not looking like a bunch of tubing, mission accomplished. But it is kind of boxy looking. It's essentially a flying cabinet full of drone parts. The
next version of the frame will look less cabinet-like.

---------------------------------------------------------

For a while, I've thought it would be cool to design a copter. The main reason for this is that I have a bunch of ideas for things I think would be cool to do in software on a vehicle, but doing so requires a machine with more than just an autopilot running ArduCopter, and a Solo isn't always appropriate. The stuff I want to build needs a "home", something with a companion computer set up a certain way, etc. You can't really tell people "hey, I've got a bunch of software, and if you build a drone a specific way, you can use it", blah blah blah. That's asking a lot. If you SHOW them a drone set up a specific way that's already doing that kind of thing, it makes more sense. 

This summer, I was working on Solex on the desktop, and built a whole thing for monitoring and controlling multiple vehicles at a time from one app. I tested it in SITL with a number of machines and it worked well. But when it came time to fly some _real_ machines around in formation, or partitioning a large mission into multiple small parallel missions, I found that Solo's weren't going to work very well (since each Solo operates on its own WiFi network and I had no real success getting them to forward mavlink packets somewhere else without freaking out and beeping constantly). I didn't want to use the typical frame available off the internet, either. It seems like you can buy a mass-produced frame, carefully build a copter out of it, and it ends up looking really home-made. Plus I want folding arms. So I thought it would be cool to see about building my own. I had some ideas:

.	I want it to be roughly Solo-sized, which in my experience is a good size for general screwing around.
.	I want it to be mod- and developer- friendly. 
.	I want folding arms.
.	I want to have plenty of space inside for whatever I might want to stick in there.
.	I want room for a companion computer, and not just a Pi. Something bigger, like a Jetson, should also fit.
.	I want a pluggable payload bay. Cameras, lights, various sensors, etc should have a place to sit on it without hanging under it.
.	I want to be able to make it out of readily-available materials, without having to spend a ton of money on it.
	Copters crash, and things break. Replacing broken items shouldn't be difficult or expensive.
.	If making it out of more exotic/expensive materials is your thing, that should also be possible.
.	I want to be able to build any number of these in a repeatable way, using relatively-simple tools. (See "ton of money" above.)
.	I want to do all of the above and not have the result look like someone raided the "tubing" aisle at a hardware store.


This machine is roughly Solo-sized, and currently weighs 300g less than a Solo (to be fair, that's a Solo with a gimbal and a BMSOne on it). The drivetrain on this one is using Solo motors and props, which T-Motor still sells as the "Air Gear 450 Set".

The frame in this design consists of 2 vertical frame panels that are cut down to the minimum for the parts that bolt to them. These are made of Baltic Birch, but carbon fiber could be used. The Birch ones weigh 39g each. CF ones might weigh 20g each. I'll find out eventually.

The panels are held apart by cross members. The positioning of the cross members makes the frame extremely stiff. In my "scientific testing", you can squeeze this frame as hard as you can with both hands, and it doesn't flex at all. It's like a 70g brick. You can use shorter or longer cross members to vary the width. This one is 80mm wide, which won't fit a Jetson. But a 100mm one will, and that's not a difficult change to make.

Inside the panels are brackets into which "shelves" can be slid. Shelves can be made out of whatever 3mm-thick material you think is appropriate. Carbon fiber, MDF, foam board, etc. Whatever will support what you need. On this one, the battery/ESC shelf is 3D printed, and the top shelf is HD fiber board. I had it lying around (see "readily-available materials" above).

All of the panels, including the green ones, can be easily slid in and out of their mounts and replaced with equal-size panels with other configurations. So instead of that grill at the front at the top, you could have one that has a place for sensors or whatever. The panels on this one are 1mm acrylic sheet painted on the back side. My wife thought it would be cool to engrave something into the panels. Or you can not use panels at all, and have all of the stuff hanging out in the open air. 

Arms, arm mounts, LED lenses, and the grills are all 3D printed. In this case, they're PLA, but could be PETG, nylon, ABS, or PEKK. I'm familiar with the "PLA is too weak" gospel. I started out with the idea of designing these so they could be made out of something else, because PLA doesn't have a great reputation when it comes to durability. The arms are 3-piece. The top is the shape you see here, and the bottom is an angled lens holder. Then a clear "lens" slides into that part. The bottom and top are glued with CA glue. In more of my "scientific testing", I've found these arms to be really stiff. A lot moreso than, say, an Iris's arms, which are flexible and twisty. 

The arms are folding, and spring-loaded. The arm mount has a spring and nylon bushing inside it and provide outward pressure against the root of the arm. The root of the arm has a cam shape that causes it to snap into place when you pull the arm out into the "fly" position, and when you push it into the "haul it around" position.

I've been testing this machine a lot and keeping a close eye on everything, looking for signs of wear or distress in the arms and frame. So far, nothing has shown up, other than dirt and stuff on the bottom of the frame from landing. Time will tell. I mean, let's be real here: Suppose you have a set of arms and mounts that appear to withstand 40-50 lbs of force each without any damage, and you attach 4 of them to a copter that will never weigh more than 4.5 lb. It seems reasonable to expect them to perform well without snapping off or something. I guess we'll see. Worst-case, I'd just need a printer that can print PEKK. That stuff is strong. It's used in aerospace, which seems appropriate. I also have a variant of the arm design which could be routed out of carbon fiber as a fallback.

There really aren't any restrictions on what you can put inside, flight-controller-wise. This one has a Pixhawk 1 on it, with a FrSky receiver, an mRo GPS, and a Raspberry Pi. Just stuff I had lying around. The ESC is a 4-in-1 from an upcycled Iris. The battery is a 3S dumb battery, and there's a Raspberry Pi 4 in it running SolexCC and cmavnode to put it on a WiFi network so I can connect to it with UDP. The next one will have a Cube Orange in it with a Here, and probably a Jetson Nano for the companion computer, and a HobbyWing BLHeli32 4-in-1 ESC. You could put a HereLink air unit in it, it would fit easily. I'll do that too at some point.

As far as the pluggable payload bay goes: Eventually this will have a way to attach payloads to the front, and the software running on the companion computer will be able to probe the payload area and find out what's plugged in. So if you have a camera, a light, some kind of sensor for a specific application, etc, you can 
plug it in and have the copter know what's plugged into it. I've already done a lot of this, but the initial implementation was too complicated and involved an "internal ad-hoc network" that was kind of a cool idea, but not really necessary.

As far as the developer-friendly aspects of this go: I'm a developer. I think things that I can easily modify with little pieces of easy code are pretty cool. I've already done a bunch of work in this area, and this will be no different. In a theoretical world where someone has this copter and wants to do something specific with it, they'd be able to write 80-100 lines of code, upload it via a web interface, and get the feature they're looking for. TBH, I do that pretty often here. (That is, when I'm not head-down designing a copter frame.) It's easy.

Speaking of which, let's talk Smart Shots. That's one of Solo's tricks, and they're super cool. The whole "developer-friendly" idea in general started with me in early 2017, when I was thinking "it seems like people like Solex, but it's built to work with a copter that is out of production". It seemed like something needed to be done about that, but nobody else seemed like they were doing anything in that area. I worked on it a bit at the time. But after sketching out an initial idea, I got super busy working on other stuff (Solex itself, and other projects) and didn't come back to it until sometime in 2018. Then I got busy with other stuff again. :-)

Smart Shots are implemented as scripts on the Solo's companion computer, and they temporarily take control of the vehicle and make it do things outside the scope of a mission or other "standard ArduPilot" things. That's a concept that can be extended well beyond smart shots, and that's basically what's in place. The companion computer works on the idea of a "plug in" environment, so you can write a plugin to do a specific thing, upload it via the web interface, turn it on, and there it is. When you want to get rid of it, you just delete it from the plugin environment, and it's gone. Smart Shots in this environment are just more plugins. Last summer, I built Selfie, Orbit, and one I think I called "Spiral", which is like orbit but starts at a given radius around the center and flies in or out to a point on the end radius. I'm going to do MPCC next.

So about the looks: I still think it looks kind of home-made. It kind of reminds me of a flying cabinet, which I guess, to be fair, it is. There's room for improvement. The arms look kind of clunky to my eye, and I'll eventually come up with a way to hide the motor wires from view inside them. 

I'm thinking about making another one in Baltic Birch and finishing the wood with a light stain and Tung Oil finish, to see what that looks like. A "fine cabinetry drone". :-D

Anyway, that's what I've got so far. Sorry for the long-winded explanation.


----------------

Apologies in advance for the long-winded explanation.

Back in July/August, I was working on my Solex/Desktop app (Win/Mac/Linux). That app lacks some features the Android app has, but also has some features the Android app doesn't. It's not meant to be the exact same thing... The intent for the desktop app is for easier/more-accurate mission planning, the idea being that you could plan a mission on the desktop, send the mission to the Android app, take it out to the field, and fly it. Also, I plan to eventually integrate the desktop into a more wide-ranging system for _completely_ automatic operation, such as scheduled patrols of fixed areas, etc, which is easier to do using a real computer vs an Android tablet.

Anyway, I was working on something in Solex/Desktop that lets you monitor and control multiple vehicles from the app at the same time. Suppose
you have 4 copters and you need to survey a 100-acre area. You can partition a mission into 4 25-acre missions, one for each vehicle, send each vehicle their piece of the mission, launch them all, and fly over the 100 acres in 1/4th the time. Or you can have vehicles follow each other in a variety of ways, or fly in formation, etc. I built all of that and tested it in SITL running on 2 laptops to simulate controlling 2 vehicles. It works well there, which I was happy about. Then I wanted to take some actual machines out somewhere and fly them around in this way.

My initial plan was to use Solos for this. But in order for the multi-vehicle thing to work, all of the machines need to either use a USB radio connection, or forward mavlink packets on the WiFi network Solex/Desktop is on. I tried a few things, and sort of got it to work, but the Solos spent all their time beeping in an ominous way and acting weird. So I abandoned that idea. Rather than potentially screw up a number of Solos, I would just build a set of new machines.

Which left me looking for a frame on the internet to build another copter on. There's a ton of frames available, but I didn't see any I really liked. Frames like that are mass-produced, but a copter you build out of them looks like you raided the tubing section of a carbon-fiber store in most cases. Plus they always seem to lack space on the frame for all of the stuff I want to put on a copter. Plus they're almost all X-shaped, which looks kind of generic to my eye.

I wanted it to be roughly Solo-sized, which seems like a good size for general screwing around. I wanted folding arms. I wanted there to be plenty of space inside for various stuff. I wanted to be able to build it out of a variety of materials: Either cheap and locally-available stuff, or more exotic/expensive material. I also wanted to be able to build them repeatably, using relatively-crude tools, without it looking like some DIY piece of crap that came out of someone's garage. :-D

So FINALLY, I'm getting to talking about the actual copter.

The main frame of this machine is two vertical frame panels. Here, they're made of 1/4" Baltic Birch, but carbon fiber can also be used. The panels are cut down to the minimum size that will support the stuff that bolts to it, to keep them light. (The Birch panels weigh 39g each.) They're held apart from each other by cross members. The positioning of the cross members makes the frame extremely stiff. You can squeeze it has hard as you can, and it doesn't flex at all. (Which is good, because autopilots don't fly well at all when the vehicle they're on is flexible and squishy.)

Inside the frame panels are brackets at the front and rear with 3mm slots in them. Into these, you slide "shelves" made of whatever 3mm material is appropriate. In this particular one, the top shelf is 3mm fiberboard, and the bottom is a 3D printed piece. They could also be carbon fiber. Shelves are fastened using 2 tiny screws at the back. This way, you can put shelves in different places for different-sized stuff. 

The arms are folding. The arm mounts are printed out of PLA or PLA+ with high infill. Inside them, there is a nylon bushing trapped inside. Under that is a 16mm spring pushing up on the bushing with about 30 lbs of force. This provides the "spring loaded" action of the arms. The arms themselves have a cam shape in them so that when you pull them out, they snap into position. When you push them in for transport, they snap into the other position. 

Also inside the panels are rails that form a 1mm groove that goes around the panels' perimeter, and provide supports for devices above the payload area. The green panels seen on this machine are 1mm acrylic panels that are painted on the inside. So you can paint them any color you want. I used this color because I thought it looked kind of cool.



