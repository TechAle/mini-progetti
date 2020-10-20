const diz = {
    "terms" : "(pyro terms) Chargebacks, Refunds etc...\n" +
        "You may not attempt to chargeback or otherwise get a refund from this modification. Doing so will result in a permanent ban from the modification.\n" +
        "Unacceptable use\n" +
        "Redistributing the installer, launcher, or modification files\n" +
        "Attempting to reverse engineer or modify the modification in any way\n" +
        "Doing either of the above activities will result in a permanent ban from the modification without warning. (Please contact me if you believe you were banned in error.)\n" +
        "You may still be banned or removed from, or disallowed to purchase the modification without warning at the developers' discretion.\n" +
        "If you knowingly purchase access to the modification while banned, you will not be refunded.\n" +
        "Treat these terms as broadly as possible, as that is how the developers will interpret them.\n" +
        "These terms may change without notice\n" +
        "Last updated: 6/14/2020\n" +
        "Explanation/Simplification\n" +
        "If you try to chargeback or get a refund, you get permbanned.\n" +
        "If you try to leak, crack, deobf etc..., permbanned\n" +
        "The last clause is mostly there as a fallback. You will not be banned for personal reasons.\n",
    "download" : "Konas Utility Mod. Price: 11USD. Contact Darki#5041 on Discord if you wanna buy.",
    "modules" : "Combat:\n" +
        "AutoTotem: Automatically puts a totem in your offhand\n" +
        "Criticals: Makes every hit critical on some servers\n" +
        "CrystalAura: Automatically places and breaks crystals\n" +
        "KillAura: Automatically hits targets\n" +
        "Surround: Places obsidian around you\n" +
        "Offhand: Automatically puts crystals/gaps/totems/etc. in your offhand\n" +
        "TotemPopCounter: Pops totem pops\n" +
        "Trap: Traps targets in obsidian\n" +
        "Player:\n" +
        "AutoArmor: Automatically equips best armor in inventory\n" +
        "BreakTweaks: Changes the way you break blocks\n" +
        "FastUse: Removes delay between item uses\n" +
        "Freecam: Lets your camera fly around without moving player\n" +
        "GUIMove: Lets you move in GUIs\n" +
        "HotbarRefill: Refills item stacks in your hotbar\n" +
        "Step: Lets you step up blocks instantly\n" +
        "Timer: Changes your client-side tick speed\n" +
        "Misc:\n" +
        "Spam: Hides chat messages containing spam\n" +
        "AutoGG: Automatically says GG to players you kill\n" +
        "BlockAura: Breaks blocks around you\n" +
        "ChatAppend: Adds \"Konas\" to the end of your chat messages\n" +
        "FakePlayer: Spawns a fake player. Useful for configuring CA\n" +
        "HoleBreakAlert: Alerts you when your hole is being mined out\n" +
        "NoEntityTrace: Prevents you from hitting entities (at all times or when holding a pickaxe)\n" +
        "Scaffold: Places blocks under you. Has a tower mode to go up quickly\n" +
        "SmartWhisper: /r doesn't reply to any whispers you received while typing your reply\n" +
        "Translate: Automatically translates chat messages\n" +
        "VisualRange: Alerts you when players enter your visual range\n" +
        "YawLock: Locks your yaw\n" +
        "Render:\n" +
        "ArmourHud: Shows what armor you have and it's durability\n" +
        "BlockHighlight: Highlights the block you're currently looking at\n" +
        "Breadcrumbs: Draws a line behind you as you move\n" +
        "CameraClip: Allows your camera to clip through walls in 3rd person view\n" +
        "Chams: Renders entities that are behind walls\n" +
        "ESP: Highlights entities and storages\n" +
        "FullBright: Makes the world completely bright\n" +
        "HoleESP: Highlights holes\n" +
        "LogoutSpots: Shows where players have logged out\n" +
        "Nametags: Draws better nametags above players\n" +
        "NoRender: Hides certain effects/overlays/particles, such as explosions, lava overlay, and xp orbs\n" +
        "PacketRender: Shows packet rotations\n" +
        "PortalTracers: Draws lines to portals\n" +
        "Sky: Lets you change sky color\n" +
        "Tracers: Draws lines to players\n" +
        "ViewModel: Changes where your items are rendered\n" +
        "Movement:\n" +
        "CreativeFly: Allows you to fly like in creative mode on vanilla servers\n" +
        "ElytraFly: Lets you elytra fly without using fireworks\n" +
        "FastLadder: Go up ladders faster\n" +
        "FastSwim: Swim faster\n" +
        "IceSpeed: Slide on ice faster\n" +
        "Jesus: Walk on water!\n" +
        "NoSlow: Prevents eating from slowing you down\n" +
        "NoWeb: Prevents webs from slowing you down\n" +
        "LongJump: Makes your jumps very long\n" +
        "Speed: Makes you go way faster Strafe works on 2b! Faster than most other clients\n" +
        "Sprint: Automatically sprints\n" +
        "TPSpeed: Makes you go faster using teleportation\n" +
        "Velocity: Cancels velocity from explosions and hits\n" +
        "Exploit:\n" +
        "AntiVoid: Reduces the chances of falling into the void (only works on some servers)\n" +
        "BeaconSelector: Lets you select any effect even if it's not unlocked\n" +
        "Blink: Cancels all movement and sends it all at once later\n" +
        "DualUse: Lets you use both of your hands at the same time\n" +
        "EntityControl: Allows you to control untamed and unsaddled entities\n" +
        "LiquidInteract: Gives you the ability to place blocks on liquids (only works on some servers)\n" +
        "NoFall: Packet: makes you fall slower - Vanilla: removes all fall damage on vanilla servers - TP: Tries to rubberband back up\n" +
        "PacketFly: Lets you fly on almost every server - Factor: works on 9b/0b, can go very fast - Setback/Fast: Works on most other servers, but is slower Works better than any public packetfly on lots of servers (better than future/seppuku/etc.)\n" +
        "PacketMine: Lets you mine blocks without swinging at them\n" +
        "PortalGodmode: Makes you invincible after going through portals as long as you don't move\n" +
        "XCarry: Lets you carry items in your crafting slots on some servers"
}

function functionAlert(msg, myYes) {
    var confirmBox = $("#confirm");
    confirmBox.find("#titolo").text(msg);
    confirmBox.find(".message").text(diz[msg]);
    confirmBox.find(".yes").unbind().click(function() {
        confirmBox.hide();
    });
    confirmBox.find(".yes").click(myYes);
    confirmBox.show();
}