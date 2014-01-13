---
layout:    post
title:     "NY FinTech Community is Thriving"
date:      "2014-01-13 10:00:00 −08:00"
author:    dan
published: true
categories:
tags:
---

<img class="lazy img-rounded img-responsive" src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=" alt="Earth's Weather" data-original="https://dl.dropboxusercontent.com/u/300203/blog-images/new-ui.jpg" width="750" height="360">

I was reading up on the "MEAN" stack: Mongo, Express, Angular and Node and came across a blog post from [Francesca Krihely](http://francescak.me/blog/2013/04/09/fintech-hackathon-recap/) about the FinTech hackathon from back in April, 2013.  

This interested me because as a former "insider" in a large financial services company I can see clearly how open source code and tooling will eventually replace more proprietry code and tooling (for example .net/visual studio) but that it requires an entirely different skill set for internal developers. The hard part is predicting "when".
<!-- more -->
For the economics to work the cost of the "new" platform had to be not just lower (or more productive) than the old, but low enough to also fund the reskilling or hiring of the types of developers that would be needed as well as corporate inertia.

I get the sense that the momentum is picking up. The NY hackathon atracted over 400 people and some of the apps/apis were very interesting (you can read Francesca's post for more) but all built on a modern technology stack.

The underlying technology stacks of companies like Twitter, Facebook, eBay, etc. are designed for millions of events per minute.  There is an obvious parallel to trading technology where you need to deliver real-time news, tick data, messages, etc. to a user interface that allows for quick understanding and reaction.  

One of the companies I discovered is [OpenFin](https://openf.in/).  Since I used to deliver equity trading applications to global trading desks I know the challenges well.  I really like the approach here and it's clear to me this is what the future holds.  This is similar to [Caplin.com](http://www.caplin.com) and others.  

It is really exciting to see the innovation here and where this is going!

Using Caplin's technology for example I can show a simple _example_ feed for Apple Stock with a little javascript:

<script type="text/javascript" src="http://platform.caplin.com/sljs/streamlink.js"></script>

<script>

    // Get the streamLink.
    var streamLink = caplin.streamlink.StreamLinkFactory.create({
                  username: "pat",
                  password: "cappass",
      liberator_urls: "rttp://platform.caplin.com"
    });

    // Define the subscription listener.
    var subscriptionListener = {

      onSubscriptionStatus : function(subscription, event) {
        log(subscription.getSubject() + " is now " + event.getStatus());
      },

      onSubscriptionError : function(subscription, event) {
        log("Error: Subject " + subscription.getSubject() + " is " + event.getError());
      },

      onRecordUpdate : function(subscription, event) {
        //Place each updated field into a map of all events.
        //This will act as a cache of all the current values,
        //not just the values updated in this event
        for (field in event.getFields())
        {
          fields[field] = event.getFields()[field];
        }
        render();
        streamlink.disconnect();
      }
    };

    // Display the latest record values.
    var fields = {};
    function render() {
       document.getElementById("recordLog").innerHTML = symbol + "\t" +
        fields["BestBid"] + "\t" + fields["BestAsk"] + "\t" + fields["VolumeAcc"] + "\t" + fields["NetChange"] + "\t" + fields["Time"] + "\t" + fields["Last"];
    }

    // Subscribe to the record.
    var symbol = "AAPL";
    var subject = "/EXAMPLES/PRICING/TYPE1/" + symbol;
    streamLink.subscribe(subject, subscriptionListener);

    // Connect.
    streamLink.connect();

</script>

<div class="container" onunload="streamLink.disconnect();">
  <br>
  <p>EXAMPLE STREAMING DATA:</p>
  <p>Symbol, Bid, Ask, Volume, Net Change, Time, Last Trade</p>
  <p id="recordLog" style="color:blue"></p>
</div>





