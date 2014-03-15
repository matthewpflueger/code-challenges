Knight's Tour
===========

Knight's tour implementation in Javascript using Highland for stream output.
Uses Warnsdorff's rule to find a knight's tour on boards above 5x5.  This implementation always
uses square boards...

See the [Wikipedia article](http://en.wikipedia.org/wiki/Knight's_tour).

To run an interactive session:

```bash
node ./index.js
```

To run the tests:

```bash
jasmine-node ../../spec/server/knightstour/*
```