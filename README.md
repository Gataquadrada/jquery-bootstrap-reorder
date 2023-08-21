A (very) simple jQuery (+ Bootstrap icons) reordering plugin, without drag-and-drop.  
It's simplistic interface allows for quick mobile support.

<br />
<br />

# Summary

-   [Requirements](#requirements)
-   [Usage](#usage)
-   [Localization](#localization)
-   [Options](#options)
-   [Events](#events)
-   [Templating](#templating)
-   [Theming](#theming)
-   [Known issues](#known-issues)
-   [Consider supporting me](#consider-supporting-me)

<br />
<br />

# Requirements

([Back to top](#summary))

This is a jQuery (and Bootstrap icons) oriented plugin.  
So, naturally, you'll need [jQuery](https://jquery.com/) (and [Bootstrap](https://getbootstrap.com/) for icons).

> NOTE: I believe you would be able to (very easily) adapt this plugin to your needs.

<br />
<br />

# Usage

([Back to top](#summary))

```js
$("SELECTOR").reorder({}) // {} = options
```

<br />
<br />

# Localization

([Back to top](#summary))

You can extend the plugin's `$.fn.reorder.lang` object for translating.

```js
;(function ($) {
	$.fn.reorder.lang = {
		move_before: "Bewegen sie sich vorher", // Google translate
		move_inside: "Bewegen sie sich hinein", // Google translate
		cancel: "Absagen", // Google translate
		finish: "Fertig", // Google translate
	}
})(jQuery) // encapsulating jQuery is a good practice
```

> NOTE: No RTL support.

<br />
<br />

# Options

([Back to top](#summary))

| Option        | Type          | Default           | Description                                                                                                               |
| ------------- | ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| handle        | String        | ".reorder-handle" | What element trigger reordering.                                                                                          |
| targets       | NULL/String   | NULL              | What elements are allowed to move.                                                                                        |
| containers    | NULL/String   | null              | What elements are allowed to enclose other elements.                                                                      |
| relationships | Array         | []                | A list of jQuery selectors that validate the intended hyerarchy (explained below).                                        |
| reorderBegin  | NULL/Function | null              | Triggered before reordering.                                                                                              |
| reorderCancel | NULL/Function | null              | Triggered after reordering was canceled.                                                                                  |
| reorderFinish | NULL/Function | null              | Triggered after reordering was confirmed.                                                                                 |
| beforeMove    | Function      | Function(true)    | Custom logic that will decide if the reordering attempt will go through. Triggered after reordering every single element. |
| afterMove     | NULL/Function | null              | Triggered after reordering every single element.                                                                          |

<br />
<br />

# Events

([Back to top](#summary))

| Option         | Description                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| reorder-begin  | Triggered before reordering.                                                                            |
| reorder-moved  | Triggered after reordering every single element. Triggers on both the container and individual element. |
| reorder-cancel | Triggered after reordering was canceled.                                                                |
| reorder-finish | Triggered after reordering every single element.                                                        |

<br />
<br />

# Templating

([Back to top](#summary))

You can extend the plugin's `$.fn.reorder.templates` object for translating.

```js
;(function ($) {
	$.fn.reorder.templates = {
		action_move_before: `<button class="reorder-action reorder-action-move-before" type="button" title="${$.fn.reorder.lang.move_before}"></button>`,
		action_move_inside: `<button class="reorder-action reorder-action-move-inside" type="button" title="${$.fn.reorder.lang.move_inside}"></button>`,
		action_cancel: `<button class="reorder-action reorder-action-cancel" type="button" title="${$.fn.reorder.lang.cancel}"></button>`,
		action_finish: `<button class="reorder-action reorder-action-finish" type="button" title="${$.fn.reorder.lang.finish}"></button>`,
	}
})(jQuery) // encapsulating jQuery is a good practice
```

<br />
<br />

# Theming

([Back to top](#summary))

-   📃 The `container` element has a (hopefully) unique `.reorder-container` class.
-   🔤 This plugin has an included `.css` file you can use for theming. Some comments were left in this file.

<br />
<br />

# Known issues

([Back to top](#summary))

-   🙅🏼‍♀️ Not fully tested.
-   🌇 I made this in a couple hours and to fulfill personal needs. Expect the unexpected.

<br />
<br />

# Consider supporting me

([Back to top](#summary))

-   [Buy me a coffee](https://www.buymeacoffee.com/gataquadrada)
-   [Follow me on Twitter](https://twitter.com/gataquadrada)
-   [Follow me on Twitch](https://twitch.tv/gataquadrada)
-   [Join my Discord](https://discord.gg/eYfSNQT)
-   [Get sub emotes on my channel](https://twitch.tv/gataquadrada)
