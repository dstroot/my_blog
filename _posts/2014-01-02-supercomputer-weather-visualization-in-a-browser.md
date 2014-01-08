---
layout:    post
title:     "Supercomputer Weather Visualization in a Browser"
date:      "2014-01-02 10:00:00 −08:00"
author:    dan
published: true
categories:
tags:
---

<img class="lazy img-rounded img-responsive" alt="Earth's Weather" data-original="https://dl.dropboxusercontent.com/u/300203/blog-images/earth_wind_map.jpg" width="750" height="300">

This is a pretty amazing technology demonstration of what is possible using the currently available open source tooling, open source data, and using cloud service providers for hosting and content delivery.  It was written by Cameron Beccario (@cambecc). Check it out below.
<!-- more -->
## Earth

["A visualization of global weather conditions forecast by supercomputers updated every three hours"](http://earth.nullschool.net/)

> Note: be sure to click on the globe and move the earth around to see different views!

## Technology Stack

* The code is publicly available on Github [here](https://github.com/cambecc/earth).
* It's hosted on Amazon S3 and cached with CloudFlare.
* Development tools/libraries: D3.js, when.js, backbone.js, node.js.
* Data from [Natural Earth](http://www.naturalearthdata.com/), converted to TopoJSON format, and [National Weather Service](http://www.emc.ncep.noaa.gov/).

## Wow!

