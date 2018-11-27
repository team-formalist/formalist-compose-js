# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

# v3.0.2 2018-11-27

* Upgrade `nodemon` to avoid `event-stream` and `flatmap-stream` security issue

# v3.0.1 2018-10-16

* Use americanized spelling for initialize references

# v3.0.0 2018-10-11

* [Add named paths and API for modifying field data](https://github.com/icelab/formalist-compose/pull/20). This changes the way actions are expected to be called by consuming forms.

# v2.0.2 2017-03-12

* Fix bug where buses were singletons (and thus shared between all instances).

# v2.0.1 2017-03-12

* Remove broken TEST define for now.

# v2.0.0 2017-03-12

* Added internal and external event bus structure.
* Removed direct access to redux store, now exposed through the event bus and the `getState` method.

# v1.0.0 2017-02-23

* No changes. Releasing as v1.0.0 for better semver compatibility.

# v0.0.1 2017-01-23

* First release
