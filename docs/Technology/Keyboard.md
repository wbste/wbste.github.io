# Keyboard

## Specs

- Sofle V1
- Kailh Low Profile Choc Switches (V1) – Brown(Tactile)
- MoErgo [MCC](https://www.moergo.com/collections/mcc-keycaps) Low Profile Split Ergo Keycaps
- OLED Screens
	- 128×32 I2C OLED graphic display
- Pro Micro Type C Controllers
	- AVR ATmega32u4 8-bit microcontroller
- Choc Hotswap Sockets
- QMK firmware
	- Compatible with VIA
	- https://github.com/qmk/qmk_firmware/tree/master/keyboards/sofle
- EC11 encoder
	- 6mm stud (T18 shaft), default knob is 14mm x 17mm tall.

## Build Guide

https://choc.brianlow.com/ - useful but outdated.

## Custom Firmware

All based on the great guide [here](https://docs.qmk.fm/#/newbs_getting_started). I couldn't get QMK toolbox to flash correctly so I just used MSYS.

> [!info]
> In `../sofle/keymaps/via/rules.mk`, setting `RGBLIGHT_ENABLE = no` and `WPM_ENABLE = yes` saved a lot of space. I don't have any RGB so no issues there.

1. Open [VIA](https://www.caniusevia.com/) in Chrome, backup your layout.
2. Clone the official QMK [repo](https://github.com/qmk/qmk_firmware).
3. Download [QMK MSYS](https://msys.qmk.fm/guide.html).
4. Open it, then run `qmk setup -H <path>`
5. Set the default keyboard with `qmk config user.keyboard=sofle/rev1`
6. Set the default keymap with `qmk config user.keymap=via`
7. Make some tweaks. Even thought I have the Sofle V1 *choc* version, the [Sofle V1 VIA](https://github.com/qmk/qmk_firmware/tree/master/keyboards/sofle/keymaps/via) version worked fine.
9. Run `qmk compile` when done. Note this compiles based on the defaults set earlier.
10. Some sites say to disconnect the cable connecting the two halves, others don't. I had no problem keeping them connected.
11. Now run `qmk flash`, which will flash the firmware you just built.
12. Disconnect the USB cable and reconnect to the other half.
13. Run it again.
14. Disconnect and reconnect to left half.
15. Open VIA and import your saved layout.
16. Done!

## Custom Logo

## Links

- https://joric.github.io/qle/
- https://javl.github.io/image2cpp/
- https://docs.splitkb.com/hc/en-us/articles/360013811280-How-do-I-convert-an-image-for-use-on-an-OLED-display-

## Layers

Here's some examples from [Keebio](https://docs.keeb.io/via#layersfn).

- `LALT(KC_TAB)` - Sends Alt-Tab
- `LCTL(KC_C)` - Sends Ctrl-C
- `LGUI(KC_C)` - Sends Cmd-C or Win-C
- `LSFT(LCTL(KC_END))` - Sends Shift-Ctrl-End
- `MO(1)` - Momentarily turn on layer 1
- `LCA(KC_DEL)` - Sends Ctrl-Alt-Del
- `MT(MOD_RSFT, KC_ENT)` - Sends Shift if held, Enter if tapped

### MO(layer)

Most commonly used layer keycode, as this is basically the equivalent to an `Fn` key. This momentarily activates the desired layer while you are holding down the key. Once released, the keyboard goes back to its original layer.

### TG(layer)

Toggles a layer on and off. Similar to Num Lock.

### DF(layer)

This turns on and off your base layer. Most folks usually have their alphas, but if you're reserving your keyboard for gaming, you can use this to maintain a custom game layer to remain active. Game on, friends!

### TO(layer)

This turns on one layer. BUT! Be aware this doesn't toggle _back_, so you need to program a key on this layer to get yourself back. Or be stuck in Kansas. Your choice.

### OSL(layer)

This temporarily activates a layer until you press the next key. OSL, standing for "one-shot layer". This is generally if you want to do one thing and then jump back to what you were doing before without having to hold down the layer key.

### TT(layer)

Smush MO and TG together and you get this. holding a key down activates the layer and it releases the layer as the key does. You can configure how many times it needs to be pressed to turn the layer on or off.

## Encoders

> [!note]
> The below covers the older style of use encoders, using **Callbacks**. The newer way (I'm using) is an **Encoder Map**. Details [here](https://docs.keeb.io/reprogramming-encoders#methods-of-mapping-encoders).

For a list of supported keys, look [here](https://github.com/qmk/qmk_firmware/blob/master/docs/keycodes_basic.md).

![](_assets/VIAMap.png)

### Audio Control

Simple but effective, controlling audio is what most people will do with at least one of their encoders.

```
if (clockwise) {  
  tap_code(KC_VOLU);  
} else {  
  tap_code(KC_VOLD);  
}
```

### Scrolling

There are many ways to scroll. You can use the mousewheel scroll keycodes, or simply arrow up or down a few times. My preferred way is to use Page Up and Page Down, as I find it faster and more reliable for my needs.

```
if (clockwise) {  
  tap_code(KC_PGDN);  
} else {  
  tap_code(KC_PGUP);  
}
```

### Tabbing

Moving through your browser tabs is easy enough with Control + Tab and Control + Shift + Tab, but you can also do it with an encoder.

```
if (clockwise) {  
  tap_code16(C(KC_TAB));  
} else {  
  tap_code16(S(C(KC_TAB)));  
}
```

### Window Movement

Like with tabs, you can also move through applications. In Windows, you can do this with Alt + Tab and Alt + Shift + Tab.

The code sample below is a modified version of the Alt Tab with a macro version listed in the [QMK documentation about Macros](https://beta.docs.qmk.fm/using-qmk/advanced-keycodes/feature_macros#super-alt-tab).

Alt Tab with an encoder involves adding three pieces of code. Add the first bit at the top of your `keymap.c`:

```
bool is_alt_tab_active = false;  
uint16_t alt_tab_timer = 0;
```

Second, place this piece of code in your encoder code. It will start holding Alt if it's not holding it yet, and send a tab for each click you turn on the encoder.

```
if (clockwise) {  
  if (!is_alt_tab_active) {  
    is_alt_tab_active = true;  
    register_code(KC_LALT);  
  }  
  alt_tab_timer = timer_read();  
  tap_code16(KC_TAB);  
} else {  
  if (!is_alt_tab_active) {  
    is_alt_tab_active = true;  
    register_code(KC_LALT);  
  }  
  alt_tab_timer = timer_read();  
  tap_code16(S(KC_TAB));  
}
```

And last, the part that makes it all work. This'll release Alt for you if you haven't send a tab yet in a second. You can change the 1250 part (in milliseconds) to be higher or lower if you prefer. If `matrix_scan_user` already exists, add the body of the function below to the already existing function:

```
void matrix_scan_user(void) {  
  if (is_alt_tab_active) {  
    if (timer_elapsed(alt_tab_timer) > 1250) {  
      unregister_code(KC_LALT);  
      is_alt_tab_active = false;  
    }  
  }  
}  
```

### History Scrubbing

This will perform Control + Z when you turn the encoder clockwise, and Control + Y when turning it counterclockwise. With this, you can easily "scroll" through the history when editing a document. In some Adobe products, Control + Shift + Z is used for undo. You can hold Shift while turning counterclockwise to undo in that case.

```
if (clockwise) {  
  tap_code16(C(KC_Y));  
} else {  
  tap_code16(C(KC_Z));  
}
```

### Scrolling Horizontally by Word

This will perform Control + Right Arrow when you turn the encoder clockwise, and Control + Left Arrow when turning it counterclockwise. If you hold shift while turning the encoder, you'll be able to select words while the cursor moves!

```
if (clockwise) {  
  tap_code16(C(KC_RGHT));  
} else {  
  tap_code16(C(KC_LEFT));  
}
```

### Scrolling Through Search Results

When you search for something in your text editor, often you'll also have shortcuts to move to the next or previous result. In Visual Studio Code, these are F3 and Shift + F3. Here's how to do that on an encoder:

```
if (clockwise) {  
  tap_code(KC_F3);  
} else {  
  tap_code16(S(KC_F3));  
}
```

## Cheat Sheet

### Step 1: Declare

Create each layer as an entry in an enum. Replace YOUR_LAYER_1, YOUR_LAYER_2, etc., below, with names of your layers.

in keymap.c:

```c
// Layer Declarations
enum {
    YOUR_LAYER_1 = 0,
    YOUR_LAYER_2,
    // ..., the rest of your layers
};
```

### Step 2: Define

Add the keycodes for each layer into the keymaps array, by calling KEYMAP() for each layer.

in keymap.c, create your KEYMAPs:

```c
// Layer Definitions
const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {

  [YOUR_LAYER_1] = KEYMAP(
    // ... list all your keycodes here, separating each with comma
  ),

  [YOUR_LAYER_2] = KEYMAP(
    // ... list all your keycodes here, separating each with comma
  ),

  // ..., the rest of your layers

};
```

### Step 3: Use

Here are a variety of ways to change the layer.

|Keycode<br><br>to be added to your call to KEYMAP()|Description|
|---|---|
|```c<br>MO(YOUR_LAYER)<br>```|While held, MOmentarily switch to YOUR_LAYER.|
|```c<br>LT(YOUR_LAYER, KC_XXXX)<br>```|Layer Tap. When held: go to YOUR_LAYER.  <br>When tapped: send KC_XXXX|
|```c<br>TG(YOUR_LAYER)<br>```|Layer Toggle. When tapped, toggles YOUR_LAYER on or off|
|```c<br>TO(YOUR_LAYER)<br>```|When tapped, goes to YOUR_LAYER|
|```c<br>TT(YOUR_LAYER)<br>```|When tapped, toggles YOUR_LAYER on or off.  <br>When held, activates YOUR_LAYER.|
|```c<br>OSL(YOUR_LAYER)<br>```|One-Shot Layer. Goes to YOUR_LAYER for the next keypress|