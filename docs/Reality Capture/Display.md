# Display

The below sections cover how to display meshes or point clouds on the **web**. While many commercial and non-self hosted solutions exist, I was looking for open source solutions that I could host the file and service on my own, and use with Mkdocs for this site.

## Mesh

Using information from [here](https://modelviewer.dev/), you can actually embed a 3D mesh. They also have an [editor](https://modelviewer.dev/editor/) that you can use to create annotation/hotspots, and modify the other variables to your liking.

1. Save the file from `https://unpkg.com/@google/model-viewer@2.1.1/dist/model-viewer.min.js` to your project (or just reference it directly).
2. Copy the rest of the example from `https://modelviewer.dev/`, or use the code below. Remove `poster`, `ar environment-image` if you don't have them.

To display the below on this page, we first load up some javascript files:

```html
<script type="module" src="../../javascripts/model-viewer.min.js"></script>
<script type="module" src="../../javascripts/dimensions.js"></script>
<script type="module" src="../../javascripts/fullscreen.js"></script>
```

I also added `stylesheets/modelviewer.css` to `mkdocs.yml`, under the `extra_css:` section. That defines what the buttons look like. I used the variable colors in the theme to make sure they always match.

Then we load the asset, and create some buttons. Most of those buttons will be for the dimensions created from the model. The other is a callout. The position for the callout was found by uploading the model to the above editor and clicking on the location.

> [!bug]
> For some reason the online editor has now changed from outputting `data-position` and `data-normal` to `data-surface`, which doesn't seem to work when embedded. Need to test more.

```html
<model-viewer id="dimensionedmodel"ar ar-modes="webxr scene-viewer quick-look" camera-controls touch-action="pan-y" auto-rotate shadow-intensity="1" exposure="0.75" environment-image="legacy" src="../_assets/snowperson.glb">
  <button slot="hotspot-dot+X-Y+Z" class="dot" data-position="1 -1 1" data-normal="1 0 0"></button>
  <button slot="hotspot-dim+X-Y" class="dim" data-position="1 -1 0" data-normal="1 0 0"></button>
  <button slot="hotspot-dot+X-Y-Z" class="dot" data-position="1 -1 -1" data-normal="1 0 0"></button>
  <button slot="hotspot-dim+X-Z" class="dim" data-position="1 0 -1" data-normal="1 0 0"></button>
  <button slot="hotspot-dot+X+Y-Z" class="dot" data-position="1 1 -1" data-normal="0 1 0"></button>
  <button slot="hotspot-dim+Y-Z" class="dim" data-position="0 -1 -1" data-normal="0 1 0"></button>
  <button slot="hotspot-dot-X+Y-Z" class="dot" data-position="-1 1 -1" data-normal="0 1 0"></button>
  <button slot="hotspot-dim-X-Z" class="dim" data-position="-1 0 -1" data-normal="-1 0 0"></button>
  <button slot="hotspot-dot-X-Y-Z" class="dot" data-position="-1 -1 -1" data-normal="-1 0 0"></button>
  <button slot="hotspot-dim-X-Y" class="dim" data-position="-1 -1 0" data-normal="-1 0 0"></button>
  <button slot="hotspot-dot-X-Y+Z" class="dot" data-position="-1 -1 1" data-normal="-1 0 0"></button>
  <button class="Hotspot" slot="hotspot-1" data-position="-0.297m 0.973m 0.136m" data-normal="-0.962m 0.267m 0.047m" data-visibility-attribute="visible">
    <div class="HotspotAnnotation">First snowman of the year!</div>
  </button>
  <button id="fullScreen">Go Fullscreen</button>
```

I did comment out the checkbox and multiple models bit as shown below, and renamed the value in `document.querySelector('...')` to `'#dimensionedmodel'` to match the id on this page (see second code block above).

```js
const modelViewer = document.querySelector('#dimensionedmodel');
// Below is for when you want to load multiple models.
  // modelViewer.querySelector('#src').addEventListener('input', (event) => {
  //   modelViewer.src = event.target.value;
  // });
// Below is for annotations (dimensions or callouts)
  // const checkbox = modelViewer.querySelector('#show-dimensions');
  // function setVisibility(element) {
  //   if (checkbox.checked) {
  //     element.classList.remove('hide');
  //   } else {
  //     element.classList.add('hide');
  //   }
  // }
  // checkbox.addEventListener('change', () => {
  //   setVisibility(modelViewer.querySelector('#lines'));
  //   modelViewer.querySelectorAll('button').forEach((hotspot) => {
  //     setVisibility(hotspot);
  //   });
  // });
  // end toggle annotations
  // update svg

  function drawLine(svgLine, dotHotspot1, dotHotspot2, dimensionHotspot) {
...
```

Once all that's done, you get this (which you can view in the source of this page between the `<!--Start of actual code for 3d model below-->` and `<!--End of actual code for 3d model below-->` comment).

<!--Start of actual code for 3d model below-->
<script type="module" src="../../javascripts/model-viewer.min.js"></script>
<script type="module" src="../../javascripts/dimensions.js"></script>
<script type="module" src="../../javascripts/fullscreen.js"></script>
<model-viewer id="dimensionedmodel"ar ar-modes="webxr scene-viewer quick-look" camera-controls touch-action="pan-y" auto-rotate shadow-intensity="1" exposure="0.75" environment-image="legacy" src="../_assets/snowperson.glb">
  <button slot="hotspot-dot+X-Y+Z" class="dot" data-position="1 -1 1" data-normal="1 0 0"></button>
  <button slot="hotspot-dim+X-Y" class="dim" data-position="1 -1 0" data-normal="1 0 0"></button>
  <button slot="hotspot-dot+X-Y-Z" class="dot" data-position="1 -1 -1" data-normal="1 0 0"></button>
  <button slot="hotspot-dim+X-Z" class="dim" data-position="1 0 -1" data-normal="1 0 0"></button>
  <button slot="hotspot-dot+X+Y-Z" class="dot" data-position="1 1 -1" data-normal="0 1 0"></button>
  <button slot="hotspot-dim+Y-Z" class="dim" data-position="0 -1 -1" data-normal="0 1 0"></button>
  <button slot="hotspot-dot-X+Y-Z" class="dot" data-position="-1 1 -1" data-normal="0 1 0"></button>
  <button slot="hotspot-dim-X-Z" class="dim" data-position="-1 0 -1" data-normal="-1 0 0"></button>
  <button slot="hotspot-dot-X-Y-Z" class="dot" data-position="-1 -1 -1" data-normal="-1 0 0"></button>
  <button slot="hotspot-dim-X-Y" class="dim" data-position="-1 -1 0" data-normal="-1 0 0"></button>
  <button slot="hotspot-dot-X-Y+Z" class="dot" data-position="-1 -1 1" data-normal="-1 0 0"></button>
  <button class="Hotspot" slot="hotspot-1" data-location="snowperson" data-position="-0.297m 0.973m 0.136m" data-normal="-0.962m 0.267m 0.047m" data-visibility-attribute="visible">
    <div class="HotspotAnnotation">First snowman of the year!</div>
  </button>
  <button class="md-button md-button--primary" id="fullScreen">Go Fullscreen</button>
  <svg id="dimLines" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="dimensionLineContainer">
    <line class="dimensionLine"></line>
    <line class="dimensionLine"></line>
    <line class="dimensionLine"></line>
    <line class="dimensionLine"></line>
    <line class="dimensionLine"></line>
  </svg>
</model-viewer>

<!--End of actual code for 3d model below-->

## Xeokit

The below is a work in progress at this time. Looks like it fulfils all the needs I was looking for (nearly any model type, point clouds, measurements with X, Y, Z, and a number of other items). Information [here](https://xeokit.io/). Need to work on the below so measurements are only started with someone left-clicks, not both left and right-click. You can also view the page full screen [here](../xeokit/index.html).

<iframe src="../xeokit/index.html" style="border:none;height:800px;width:100%;" title="Potree Viewer"></iframe>

## Point Cloud

Use [Potree](https://github.com/potree/potree) to display .LAS (georeferenced color point clouds) in a web browser! There is a conversion that needs to take place in [Potree Desktop or PotreeConverter](https://github.com/potree/potree#downloads). Note the documentation hasn't been updated since the new version. From the repo, you'll need to include the `build`, `libs`, and `pointclouds` folders, but that's it. Also the HTML page that correctly points to the folders. You'll want to update the HTML page to point to the `metadata.json` file assuming you're using the 2.0 Potree conversion.

1. Download the [latest release](https://github.com/potree/potree/releases).
2. Extract it. All you need for hosting on your own site seem to be `build`, `libs`, and `pointclouds` folders. You can use one of the HTML files in the `examples` folder to update the path to your model.
3. You should have the following folders once you're done (note I took an example HTML file out, called it `model.html`, and placed it into a new folder called `pages`).


```
build
  potree
  shaders
libs
  brotli
  Cesium
  ...
pages
  model.html
pointclouds
  model
    hierarchy.bin
    log.txt
    metadata.json
    octree.bin
```

You can embed a viewer via `iframe` as below:

```html
<iframe src="../potree/pages/model.html" style="border:none;height:800px;width:100%;" title="Potree Viewer"></iframe>
```

### Reload Saved Scene

This will reload saved dimensions, annotations, etc. After exporting in `Poltree` format, under the *Scene* section of the sidebar, you can re-load the `potree.json5` file by including `viewer.loadProject("potree.json5")` in the HTML file that renders the file. Make sure the path is correct.

### Show Desired Units

Assuming the point cloud is in meters, but you want to display any measurements in feet, enter `viewer.setLengthUnitAndDisplayUnit('m','ft');` in the Developer console or the HTML file. You can also change `setLengthUnit` if it's wrong. All contained within the `viewer.js` [file](https://github.com/potree/potree/blob/master/src/viewer/viewer.js).

### Make High Quality

Add `viewer.useHQ = true;` to the HTML page for *Splat Quality* to be **High Quality**.

### Customize Sidebar

By modifying the HTML page that has the model, you can hide various aspects of the sidebar. Below are some of the options I hid. Their naming corresponds to the `sidebar.html` file.

```js
		viewer.loadGUI(() => {
			viewer.setLanguage('en');
			$("#menu_appearance").hide();
			$("#menu_tools").next().show();
			$("#menu_measurements").next().show();
			$("#menu_annotations").hide();
			$("#menu_scene").next().show();
			$("#menu_filters").hide();
			$("#menu_classification").hide();
			$("#menu_other_settings").hide();
			$("#menu_about").hide();
			$("#scene_export").hide();
			$("#sldMoveSpeed").hide();
```

You can also change the color scheme by modifying `potree.css`. Use the link the Palette in the file, then export a CSS. Copy and paste that into the `potree.css` file, then change the root colors 0 thru 4 to align with the rgba codes from Palette.

```css
/* Palette URL: http://paletton.com/#uid=13p0u0k3V4WaYgf7Lb1ac80gJaQ */

/* Feel free to copy&paste color codes to your application */

/* As hex codes */

.color-primary-0 { color: #161819 }	/* Main Primary color */
.color-primary-1 { color: #364A51 }
.color-primary-2 { color: #2A3437 }
.color-primary-3 { color: #1C2528 }
.color-primary-4 { color: #1B2F36 }


/* As RGBa codes - copy the below rgba values into root below */

.rgba-primary-0 { color: rgba( 22, 24, 25,1) }	/* Main Primary color */
.rgba-primary-1 { color: rgba( 54, 74, 81,1) }
.rgba-primary-2 { color: rgba( 42, 52, 55,1) }
.rgba-primary-3 { color: rgba( 28, 37, 40,1) }
.rgba-primary-4 { color: rgba( 27, 47, 54,1) }

/* Generated by Paletton.com © 2002-2014 */
/* http://paletton.com */

:root{
	
	--color-0: 			rgba( 22, 24, 25,1);
	--color-1: 			rgba( 54, 74, 81,1);
	--color-2: 			rgba( 42, 52, 55,1);
	--color-3: 			rgba( 28, 37, 40,1);
	--color-4: 			rgba( 27, 47, 54,1);

...

```

### Add Transformation Gizmo

To allow movement of the point clouds you can include the following code in `potree.js`. Just click on the point cloud and it will bring up the transformation gizmo. Thanks to the commenter [here](https://github.com/potree/potree/issues/634#issuecomment-753481326) for the tip! The transformations are not saved, so you can refresh the page to "reset".

```js
if(!consumed){
	if (e.button === MOUSE.LEFT) {
		if (noMovement) {
			let selectable = this.hoveredElements
				.find(el => el.object._listeners && el.object._listeners['select']);

// start new code

	  let pointCloudIntersect = Utils.getMousePointCloudIntersection(
		  this.mouse,
		  this.viewer.scene.getActiveCamera(),
		  this.viewer,
		  this.viewer.scene.pointclouds,
		  {pickClipped: true})
	  if (selectable || pointCloudIntersect) {
		  selectable = selectable ? selectable.object : pointCloudIntersect.pointcloud;

// end new code, then comment out the below two items. 

//			if (selectable) {
//				selectable = selectable.object;
				if (this.isSelected(selectable)) {
					this.selection
						.filter(e => e !== selectable)
						.forEach(e => this.toggleSelection(e));
				} else {
					this.deselectAll();
					this.toggleSelection(selectable);
				}
			} else {
				this.deselectAll();
```
