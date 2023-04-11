# Review and Edit

The page will detail how to edit the various files types, as well as combining different file types for reviewing (i.e. add a 3D model to a point cloud to see if there are any conflicts).

## Review

1. Export a scan from the iPad (via [Scaniverse](https://apps.apple.com/us/app/scaniverse-3d-scanner/id1541433223)) to a GLB file. This method should work with PLY files as well, but I got errors.
2. Using modeling software, create whatever 3D geometry you want. Export that to an OBJ with the MTL file if you want it.
3. Download [3D Builder](https://www.microsoft.com/store/productId/9WZDNCRFJ3T6) from the Microsoft Store.
4. Also download [3D Viewer](https://www.microsoft.com/store/productId/9NBLGGH42THS).
5. Open 3D Builder, and import your OBJs and GLBs. Modify as needed, and export as a GLB.
	1. OBJ will need to be scaled correctly on import. Typically it's in meters.

## Edit

Some popular options for editing meshes and/or point clouds include [CloudCompare](https://www.danielgm.net/cc/), [Potree Desktop](https://github.com/potree/PotreeDesktop), [MeshLab](https://www.meshlab.net/), and [Blender](https://www.blender.org/). 