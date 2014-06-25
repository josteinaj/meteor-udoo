var selftest = require('../selftest.js');
var Sandbox = selftest.Sandbox;
var PhantomClient = selftest.PhantomClient;
var utils = require('../utils.js');
var Future = require('fibers/future');
var net = require('net');
var _ = require('underscore');
var files = require('../files.js');

selftest.define("css injection", function () {
  var s = new Sandbox({
    clients: {
      phantomJs: true,
      browserStack: true
    },
  });

  // Starting a run
  s.createApp("myapp", "browser-test");
  s.cd("myapp");

  var numClients = 0;
  s.testWithAllClients(function (run) {
    numClients++;
    s.set("METEOR_TEST_TMP", files.mkdtemp());
    run.match("myapp");
    run.match("proxy");
    run.match("MongoDB");
    run.waitSecs(5);
    run.match("running at");
    run.match("localhost");

    run.connectClient();

    run.waitSecs(20);
    run.match("client connected");

    // Initially there is no CSS file.
    run.waitSecs(20);
    run.match("numCssChanges: 0");
    run.match("new css:");

    // The num changes variable is set to 0 on a client refresh.
    // Since CSS changes should not trigger a client refresh, numCssChanges
    // variable should not reset.

    // XXX change test expectations when CSS injection patch lands.
    s.write("test.css", "body { background-color: red; }");
    run.waitSecs(20);
    run.match("numCssChanges: 0");
    run.match("new css: body { background-color: red; }");
    s.write("test.css", "body { background-color: blue; }");
    run.waitSecs(20);
    run.match("numCssChanges: 0");
    run.match("new css: body { background-color: blue; }");
    run.stop();
  });
  selftest.expectEqual(numClients, 2);
});
