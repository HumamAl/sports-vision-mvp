Hi,

I built a working prototype of your sports vision app to show you exactly how I'd approach this:

**Live Demo: https://sports-vision-mvp.vercel.app**

The demo includes a live scanner view with animated AR bounding boxes, LiDAR spatial estimation with distance measurements between detected objects, and real-time confidence scoring across categories like players, balls, goals, and equipment. You can run a scan simulation, see objects detected one-by-one with animated overlays, then review the results with ranked comparisons and a bird's-eye spatial map — all the core detection and visualization features you described.

I build lean and fast. This prototype was built to mirror the on-device experience you're targeting with iPhone camera + LiDAR, focusing on the detection pipeline and AR overlay UX rather than polish. I'd take the same approach with the iOS build — get the core ARKit/Vision pipeline working first, then iterate on accuracy and edge cases.

Happy to jump on a quick call to walk through the architecture and discuss the iOS implementation plan.

Best,
Humam
