;(function ($) {
    $.fn.reorder = function (options = {}) {
        const defaults = {
            handle: ".reorder-handle", // ONE OR MULTIPLE
            targets: null,
            containers: null,
            relationships: [], // EG: YOU CAN PREVENT A FOLDER FROM BEING INSERTED INSIDE ANOTHER FOLDER
            reorderBegin: null, // BEFORE ANYTHING HAPPENS
            reorderEnd: null, // RETURNS AN ARRAY WITH ALL ELEMENTS AND CHILDREN
            reorderCancel: null,
            reorderFinish: null,
            beforeMove: () => {
                return true
            }, // IN CASE YOU NEED CUSTOM LOGIC FOR DECIDING RELATIONSHIPS
            afterMove: null,
        }

        const settings = $.extend(defaults, options)

        return this.each(function () {
            const _HISTORY = []

            /*
             * ELEMENTS
             */
            const _this = this
            const elem = $(_this).addClass("reorder-container")

            const doReset = () => {
                elem.removeClass("reorder-is-moving")

                elem.find(
                    ".reorder-target-current, .reorder-interactable"
                ).removeClass("reorder-target-current reorder-interactable")

                elem.find(".reorder-action").remove()

                if (settings.containers) {
                    elem.find(settings.containers).each(function () {
                        if (
                            !$(this).addClass("reorder-subcontainer").children()
                                .length
                        )
                            $(this).html("")
                    })
                }
            }

            const checkRelationships = (moving = null, target = null) => {
                if (!settings.relationships || !settings.relationships.length)
                    return true

                if (!moving || !target) return false

                const ghost = $(`<div>`, {
                    class: moving.attr("class"),
                })
                    .css("border", "2px solid yellow !important")
                    .removeClass("reorder-target-current")

                ghost.insertBefore(target)

                var proceed = false

                $.each(settings.relationships, (i, v) => {
                    if ($(ghost).is(v)) proceed = true
                })

                ghost.remove()

                return proceed
            }

            const getOrder = () => {
                const order = []

                elem.find(settings.targets || "> *").each(function () {
                    const item = $(this)
                    order.push(item)
                })

                return order
            }

            elem.on("click", settings.handle, function (e) {
                e.preventDefault()

                doReset()

                const handle = $(this)
                const moving = settings.targets
                    ? handle.closest(settings.targets)
                    : handle.parent()

                if (!moving.length) return null

                moving.addClass("reorder-target-current")

                moving.append($.fn.reorder.templates.action_cancel)
                moving.append($.fn.reorder.templates.action_finish)

                if (!_HISTORY.length) {
                    elem.find(settings.targets || "> *").each(function () {
                        _HISTORY.push({
                            target: $(this),
                            parent: $(this).parent(),
                        })
                    })
                }

                elem.find(settings.targets || "> *")
                    .not(".reorder-target-current")
                    .each(function () {
                        $(this).addClass("reorder-interactable")

                        const btn = $(
                            $.fn.reorder.templates.action_move_before
                        ).appendTo($(this))

                        if (!checkRelationships(moving, $(this))) btn.remove()
                    })

                if (settings.containers) {
                    elem.find(settings.containers).each(function () {
                        const btn = $(
                            $.fn.reorder.templates.action_move_inside
                        ).appendTo($(this))

                        if (!checkRelationships(moving, btn)) btn.remove()
                    })
                }

                elem.addClass("reorder-is-moving")
                    .append($.fn.reorder.templates.action_move_inside)
                    .trigger("reorder-begin")

                if (
                    settings.reorderBegin &&
                    typeof function () {} == typeof settings.reorderBegin
                ) {
                    settings.reorderBegin()
                }
            })

            elem.on("click", ".reorder-action-move-before", function (e) {
                e.preventDefault()

                const btn = $(this)

                const moving = elem.find(".reorder-target-current")

                if (!moving.length) return null

                const target = settings.targets
                    ? btn.closest(settings.targets)
                    : btn.parent()

                if (!target.length) return null

                if (
                    !checkRelationships(moving, target) ||
                    !settings.beforeMove(moving, target)
                ) {
                    btn.remove()
                    return null
                }

                moving
                    .insertBefore(target)
                    .trigger("reorder-moved", moving, target)

                elem.trigger("reorder-moved", moving, target)

                if (
                    settings.afterMove &&
                    typeof function () {} == typeof settings.afterMove
                ) {
                    settings.afterMove(moving, target)
                }
            })

            elem.on("click", ".reorder-action-move-inside", function (e) {
                e.preventDefault()

                const btn = $(this)

                const moving = elem.find(".reorder-target-current")

                if (!moving.length) return null

                if (
                    !checkRelationships(moving, btn) ||
                    !settings.beforeMove(moving, btn)
                ) {
                    btn.remove()
                    return null
                }

                moving
                    .insertBefore(btn)
                    .trigger("reorder-moved", moving, target)

                elem.trigger("reorder-moved", moving, target)

                if (
                    settings.afterMove &&
                    typeof function () {} == typeof settings.afterMove
                ) {
                    settings.afterMove(moving, target)
                }
            })

            elem.on("click", ".reorder-action-cancel", function (e) {
                e.preventDefault()

                $.each(_HISTORY, function (i, item) {
                    item.parent.append(item.target)
                })

                _HISTORY.splice(0, _HISTORY.length)

                doReset()

                elem.trigger("reorder-cancel")

                if (
                    settings.reorderCancel &&
                    typeof function () {} == typeof settings.reorderCancel
                ) {
                    settings.reorderCancel()
                }
            })

            elem.on("click", ".reorder-action-finish", function (e) {
                e.preventDefault()

                _HISTORY.splice(0, _HISTORY.length)

                doReset()

                const order = getOrder()

                elem.trigger("reorder-finish", order)

                if (
                    settings.reorderFinish &&
                    typeof function () {} == typeof settings.reorderFinish
                ) {
                    settings.reorderFinish(order)
                }
            })

            doReset()
        })
    }

    $.fn.reorder.lang = {
        move_before: "Move before",
        move_inside: "Move inside",
        cancel: "Cancel",
        finish: "Finish",
    }

    $.fn.reorder.templates = {
        action_move_before: `<button class="reorder-action reorder-action-move-before" type="button" title="${$.fn.reorder.lang.move_before}"></button>`,
        action_move_inside: `<button class="reorder-action reorder-action-move-inside" type="button" title="${$.fn.reorder.lang.move_inside}"></button>`,
        action_cancel: `<button class="reorder-action reorder-action-cancel" type="button" title="${$.fn.reorder.lang.cancel}"></button>`,
        action_finish: `<button class="reorder-action reorder-action-finish" type="button" title="${$.fn.reorder.lang.finish}"></button>`,
    }
})(jQuery)
