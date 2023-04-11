const modelViewer = document.querySelector('#dimensionedmodel');

// //  ------------------------------- Start My Code ------------------------------- 
// // Used to get name within filename of model. GLB filename and data-location fields should match naming and case

// function getStringBetween(str, start, end) {
//   const result = str.match(new RegExp(start + "(.*)" + end));
//   return result[1];
// }

// // Gets all items with the attribute called data-location and saves it in the variable notes
// const notes = modelViewer.querySelectorAll("[data-location]");

// // ------------------------------- End My Code ------------------------------- 

// modelViewer.querySelector('#src').addEventListener('input', (event) => {
//   modelViewer.src = event.target.value;

//   //  ------------------------------- Start My Code ------------------------------- 

//   let modelName = getStringBetween(modelViewer.src, '/', '.glb');
//   notes.forEach(function (note) {
//     if (note.getAttribute("data-location") === modelName) {
//       return note.style.visibility = 'visible';
//     }
//     return note.style.visibility = 'hidden';
//   })

//   // ------------------------------- End My Code ------------------------------- 

// });

// // Start Toggle Annotations

// const checkbox = modelViewer.querySelector('#show-dimensions');

// function setVisibility(element) {
//   if (checkbox.checked) {
//     element.classList.remove('hide');
//   } else {
//     element.classList.add('hide');
//   }
// }

// checkbox.addEventListener('change', () => {
//   setVisibility(modelViewer.querySelector('#lines'));
//   modelViewer.querySelectorAll('button').forEach((hotspot) => {
//     setVisibility(hotspot);
//   });
// });

// End Toggle Annotations

// update svg
  function drawLine(svgLine, dotHotspot1, dotHotspot2, dimensionHotspot) {
    if (dotHotspot1 && dotHotspot1) {
      svgLine.setAttribute('x1', dotHotspot1.canvasPosition.x);
      svgLine.setAttribute('y1', dotHotspot1.canvasPosition.y);
      svgLine.setAttribute('x2', dotHotspot2.canvasPosition.x);
      svgLine.setAttribute('y2', dotHotspot2.canvasPosition.y);

      // use provided optional hotspot to tie visibility of this svg line to
      if (dimensionHotspot && !dimensionHotspot.facingCamera) {
        svgLine.classList.add('hide');
      }
      else {
        svgLine.classList.remove('hide');
      }
    }
  }

  const dimLines = modelViewer.querySelectorAll('line');

  const renderSVG = () => {
    drawLine(dimLines[0], modelViewer.queryHotspot('hotspot-dot+X-Y+Z'), modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Y'));
    drawLine(dimLines[1], modelViewer.queryHotspot('hotspot-dot+X-Y-Z'), modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dim+X-Z'));
    drawLine(dimLines[2], modelViewer.queryHotspot('hotspot-dot+X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X+Y-Z')); // always visible
    drawLine(dimLines[3], modelViewer.queryHotspot('hotspot-dot-X+Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dim-X-Z'));
    drawLine(dimLines[4], modelViewer.queryHotspot('hotspot-dot-X-Y-Z'), modelViewer.queryHotspot('hotspot-dot-X-Y+Z'), modelViewer.queryHotspot('hotspot-dim-X-Y'));
  };

  modelViewer.addEventListener('camera-change', renderSVG);

  modelViewer.addEventListener('load', () => {
    const center = modelViewer.getBoundingBoxCenter();
    const size = modelViewer.getDimensions();
    const x2 = size.x / 2;
    const y2 = size.y / 2;
    const z2 = size.z / 2;

    modelViewer.updateHotspot({
      name: 'hotspot-dot+X-Y+Z',
      position: `${center.x + x2} ${center.y - y2} ${center.z + z2}`
    });

    modelViewer.updateHotspot({
      name: 'hotspot-dim+X-Y',
      position: `${center.x + x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
    });
    modelViewer.querySelector('button[slot="hotspot-dim+X-Y"]').textContent =
        `${(size.z * 100 * 0.0328084).toFixed(1)} ft`; // 0.0328084 is to convert from cm to ft.

    modelViewer.updateHotspot({
      name: 'hotspot-dot+X-Y-Z',
      position: `${center.x + x2} ${center.y - y2} ${center.z - z2}`
    });

    modelViewer.updateHotspot({
      name: 'hotspot-dim+X-Z',
      position: `${center.x + x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
    });
    modelViewer.querySelector('button[slot="hotspot-dim+X-Z"]').textContent =
        `${(size.y * 100 * 0.0328084).toFixed(1)} ft`;

    modelViewer.updateHotspot({
      name: 'hotspot-dot+X+Y-Z',
      position: `${center.x + x2} ${center.y + y2} ${center.z - z2}`
    });

    modelViewer.updateHotspot({
      name: 'hotspot-dim+Y-Z',
      position: `${center.x} ${center.y + y2 * 1.1} ${center.z - z2 * 1.1}`
    });
    modelViewer.querySelector('button[slot="hotspot-dim+Y-Z"]').textContent =
        `${(size.x * 100 * 0.0328084).toFixed(1)} ft`;

    modelViewer.updateHotspot({
      name: 'hotspot-dot-X+Y-Z',
      position: `${center.x - x2} ${center.y + y2} ${center.z - z2}`
    });

    modelViewer.updateHotspot({
      name: 'hotspot-dim-X-Z',
      position: `${center.x - x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
    });
    modelViewer.querySelector('button[slot="hotspot-dim-X-Z"]').textContent =
        `${(size.y * 100 * 0.0328084).toFixed(1)} ft`;

    modelViewer.updateHotspot({
      name: 'hotspot-dot-X-Y-Z',
      position: `${center.x - x2} ${center.y - y2} ${center.z - z2}`
    });

    modelViewer.updateHotspot({
      name: 'hotspot-dim-X-Y',
      position: `${center.x - x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
    });
    modelViewer.querySelector('button[slot="hotspot-dim-X-Y"]').textContent =
        `${(size.z * 100 * 0.0328084).toFixed(1)} ft`;

    modelViewer.updateHotspot({
      name: 'hotspot-dot-X-Y+Z',
      position: `${center.x - x2} ${center.y - y2} ${center.z + z2}`
    });

    renderSVG();
  });