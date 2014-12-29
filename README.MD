angular-jplayer-wrapper
=======================

Simple wrapper around jPlayer for angularJS.

API
===

Services
--------

 * `jPlayer` - provides wrapper-class for jPlayer instance;
 * `jPlayerFactory` - creates new players;

Methods
-------

**jPlayerFactory**

`jPlayerFactory::createPlayer(selector, media): jPlayer` - creates new player instance and puts it into element specified by `selector`; Parameters: `selector` - valid jQuery selector, `media` - valid jPlayer media object.

`jPlayerFactory::createLiveStreamPlayer(selector, media): jPlayer` - same as `jPlayerFactory::createPlayer`, except design for live streams;

**jPlayer**

`jPlayer::play([position]): jPlayer` - if `position` not set resume playing otherwise play from specified `position`;

`jPlayer::pause([position]): jPlayer` - if `position` not set pause playing otherwise move to `position` and pause;

`jPlayer::setMedia(media): jPlayer` - set media for player, where `media` valid jPlayer media-object;

`jPlayer::preload(): jPlayer` - starts loading of media;

`jPlayer::pauseOthers([position]): jPlayer` - calls `jPlayer::pause(position)` on other players;

`jPlayer::clearMedia(): jPlayer` - clears media;

`jPlayer::stop(): jPlayer` - stops player;

`jPlayer::tellOthers(command, [options, [filterFunction]]): jPlayer` - tells others to do the `command` with `options`, "others" are filtered by `filterFunction`;

`jPlayer::getOption(optionName): mixed` - get value of an option with specified name;

`jPlayer::setOption(optionName, optionValue): jPlayer` - set value for option with specified name;

`jPlayer::seekAndPlay(positionInPercents): jPlayer` - seek to position specified in percents and play;

`jPlayer::destroy(): null` - destroy player;

`jPlayer::mute(): jPlayer` - mute player;

`jPlayer::unmute(): jPlayer` - unmute player;

`jPlayer::isMuted(): bool` - check whether player is muted or not;

`jPlayer::muteToggle(): bool` - toggle mute mode and return new value;

`jPlayer::isPlaying(): bool` - check whether player is playing or not;

`jPlayer::toggle(): bool` - toggle playing and return new value;

`jPlayer::on(eventName, eventCallback): jPlayer` - add event handler;

`jPlayer::once(eventName, eventCallback): jPlayer` - set event handler;

`jPlayer::isReady(): bool` - check whether player is ready or not;

Events
------

See jPlayer event list, the only difference: in this wrapper all event names are camelized(in camelCase) and callback signature is `function(originalEvent, wrappedPlayer)`.

