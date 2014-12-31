(function (angular, $, document) {
    'use strict';
    angular.module('jPlayerModule', [])
        .factory('jPlayer', function () {
            return function (instance) {
                var
                    me = instance,
                    events = {
                        ready: [],
                        setMedia: [],
                        flashReset: [],
                        resize: [],
                        repeat: [],
                        click: [],
                        error: [],
                        warning: [],
                        loadStart: [],
                        progress: [],
                        suspend: [],
                        abort: [],
                        emptied: [],
                        stalled: [],
                        play: [],
                        pause: [],
                        loadedMetadata: [],
                        loadedData: [],
                        waiting: [],
                        playing: [],
                        canPlay: [],
                        canPlayThrough: [],
                        seeking: [],
                        seeked: [],
                        timeUpdate: [],
                        ended: [],
                        rateChange: [],
                        durationChange: [],
                        volumeChange: []
                    },
                    ready = false,
                    checkEvent = function (eventName, event) {
                        if (Object.keys(events).indexOf(eventName) < 0) {
                            throw 'No such event("' + eventName +'")!';
                        }
                        if (typeof event !== 'function') {
                            throw ('Can`t bind "' + (typeof event) + '" as event handler!');
                        }
                    },
                    self = this,
                    createEventHandler = function (eventCode) {
                        return function (event) {
                            var k;
                            for (k in events[eventCode]) {
                                if (events[eventCode].hasOwnProperty(k)) {
                                    events[eventCode][k](event, self);
                                }
                            }
                        };
                    },
                    eventCode;
                this.setMedia = function (media) {
                    me.jPlayer('setMedia', media);
                    return this;
                };
                this.play = function (position) {
                    me.jPlayer('play', position);
                    return this;
                };
                this.preload = function () {
                    me.jPlayer('load');
                    return this;
                };
                this.pause = function (position) {
                    me.jPlayer('pause', position);
                    return this;
                };
                this.pauseOthers = function (position) {
                    me.jPlayer('pauseOthers', position);
                    return this;
                };
                this.clearMedia = function () {
                    me.jPlayer('clearMedia');
                    return this;
                };
                this.stop = function () {
                    me.jPlayer('stop');
                    return this;
                };
                this.tellOthers = function (command, options, filterFunction) {
                    if (typeof filterFunction !== 'function') {
                        filterFunction = function () {
                            return true;
                        };
                    }
                    me.jPlayer('tellOthers', command, filterFunction, options);
                    return this;
                };
                this.getOption = function (name) {
                    return me.jPlayer('option', name);
                };
                this.setOption = function (name, value) {
                    me.jPlayer('option', name, value);
                    return this;
                };
                this.seekAndPlay = function (percents) {
                    me.jPlayer('playHead', percents);
                    return this;
                };
                this.destroy = function () {
                    me.jPlayer('destroy');
                    me = null;
                };
                this.mute = function () {
                    me.jPlayer('mute');
                    return this;
                };
                this.unmute = function () {
                    me.jPlayer('unmute');
                    return this;
                };
                this.muteToggle = function () {
                    if (this.isMuted()) {
                        this.unmute();
                    } else {
                        this.mute();
                    }
                };
                this.isMuted = function () {
                    return this.getOption('muted');
                };
                this.isPlaying = function () {
                    return me.data().jPlayer.status.paused;
                };
                this.toggle = function () {
                    if (this.isPlaying()) {
                        this.pause();
                    } else {
                        this.play();
                    }
                    return this.isPlaying();
                };
                this.on = function (eventName, event) {
                    checkEvent(eventName, event);
                    events[eventName].push(event);
                    return this;
                };
                this.once = function (eventName, event) {
                    checkEvent(eventName, event);
                    events[eventName] = [event];
                    return this;
                };
                this.isReady = function () {
                    return ready;
                };
                this.on('ready', function () {
                    ready = true;
                });
                for (eventCode in events) {
                    if (events.hasOwnProperty(eventCode)) {
                        me.bind($.jPlayer.event[eventCode.toLowerCase()], createEventHandler(eventCode));
                    }
                }
            };
        })
        .service('jPlayerFactory', ['$document', 'jPlayer', function ($document, Player) {
            var createNewInstance = function (selector, options) {
                var
                    element   = document.createElement('div'),
                    $element  = $(element),
                    container = $(selector),
                    instance  = $element.jPlayer(options);
                container.append(instance);
                return new Player($(container.children()[0]));
            };
            this.createPlayer = function (selector, media) {
                var thePlayer = createNewInstance(selector, {});
                thePlayer.on('ready', function (e, pl) {
                    pl.setMedia(media);
                });
                return thePlayer;
            };
            this.createLiveStreamPlayer = function (selector, mediaStream) {
                var thePlayer = createNewInstance(selector, {});
                return thePlayer
                    .setOption('supplied', Object.keys(mediaStream).filter(function (element) {
                        return element !== 'title';
                    }).join(', '))
                    .setOption('preload', 'none')
                    .setOption('wmode', 'window')
                    .setOption('autoBlur', false)
                    .setOption('keyEnabled', true)
                    .on('ready', function () {
                        thePlayer.setMedia(mediaStream);
                    })
                    .on('pause', function () {
                        thePlayer.clearMedia();
                    })
                    .on('error', function () {
                        if (thePlayer.isReady()) {
                            thePlayer
                                .setMedia(mediaStream)
                                .play();
                        }
                    })
                    .on('ended', function () {
                        thePlayer
                            .clearMedia()
                            .setMedia(mediaStream)
                            .play();
                    });
            };
        }]);
}(window.angular, window.jQuery, window.document));