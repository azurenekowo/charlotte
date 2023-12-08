## What is this?

This is the part that will be bootstrapped to mapping into a "MVC" layout better. Non of those module will be served as a REST endpoint. 

If you want to make a rest endpoint, with documents, make it under pages/api

## What are the reqs

Well all the defs in this module will eventually stand for...relay stuff from piehtvn backend.

So, in order to work in a static-typed environment, each module must:

- Know what it needs (parameter, typewise if you want)
- Know what it get (panic doesn't count, just the pure schema written in Typescript)