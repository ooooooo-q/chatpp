var shortcut_timer;
var LOCAL_STORAGE_ROOM_SHORTCUT = "CHATPP_ROOM_SHORTCUT";

var DOM_VK_CANCEL = 3,
    DOM_VK_HELP = 6,
    DOM_VK_BACK_SPACE = 8,
    DOM_VK_TAB = 9,
    DOM_VK_CLEAR = 12,
    DOM_VK_RETURN = 13,
    DOM_VK_ENTER = 14,
    DOM_VK_SHIFT = 16,
    DOM_VK_CONTROL = 17,
    DOM_VK_ALT = 18,
    DOM_VK_PAUSE = 19,
    DOM_VK_CAPS_LOCK = 20,
    DOM_VK_ESCAPE = 27,
    DOM_VK_SPACE = 32,
    DOM_VK_PAGE_UP = 33,
    DOM_VK_PAGE_DOWN = 34,
    DOM_VK_END = 35,
    DOM_VK_HOME = 36,
    DOM_VK_LEFT = 37,
    DOM_VK_UP = 38,
    DOM_VK_RIGHT = 39,
    DOM_VK_DOWN = 40,
    DOM_VK_PRINTSCREEN = 44,
    DOM_VK_INSERT = 45,
    DOM_VK_DELETE = 46,
    DOM_VK_0 = 48,
    DOM_VK_1 = 49,
    DOM_VK_2 = 50,
    DOM_VK_3 = 51,
    DOM_VK_4 = 52,
    DOM_VK_5 = 53,
    DOM_VK_6 = 54,
    DOM_VK_7 = 55,
    DOM_VK_8 = 56,
    DOM_VK_9 = 57,
    DOM_VK_SEMICOLON = 59,
    DOM_VK_EQUALS = 61,
    DOM_VK_A = 65,
    DOM_VK_B = 66,
    DOM_VK_C = 67,
    DOM_VK_D = 68,
    DOM_VK_E = 69,
    DOM_VK_F = 70,
    DOM_VK_G = 71,
    DOM_VK_H = 72,
    DOM_VK_I = 73,
    DOM_VK_J = 74,
    DOM_VK_K = 75,
    DOM_VK_L = 76,
    DOM_VK_M = 77,
    DOM_VK_N = 78,
    DOM_VK_O = 79,
    DOM_VK_P = 80,
    DOM_VK_Q = 81,
    DOM_VK_R = 82,
    DOM_VK_S = 83,
    DOM_VK_T = 84,
    DOM_VK_U = 85,
    DOM_VK_V = 86,
    DOM_VK_W = 87,
    DOM_VK_X = 88,
    DOM_VK_Y = 89,
    DOM_VK_Z = 90,
    DOM_VK_CONTEXT_MENU = 93,
    DOM_VK_NUMPAD0 = 96,
    DOM_VK_NUMPAD1 = 97,
    DOM_VK_NUMPAD2 = 98,
    DOM_VK_NUMPAD3 = 99,
    DOM_VK_NUMPAD4 = 100,
    DOM_VK_NUMPAD5 = 101,
    DOM_VK_NUMPAD6 = 102,
    DOM_VK_NUMPAD7 = 103,
    DOM_VK_NUMPAD8 = 104,
    DOM_VK_NUMPAD9 = 105,
    DOM_VK_MULTIPLY = 106,
    DOM_VK_ADD = 107,
    DOM_VK_SEPARATOR = 108,
    DOM_VK_SUBTRACT = 109,
    DOM_VK_DECIMAL = 110,
    DOM_VK_DIVIDE = 111,
    DOM_VK_F1 = 112,
    DOM_VK_F2 = 113,
    DOM_VK_F3 = 114,
    DOM_VK_F4 = 115,
    DOM_VK_F5 = 116,
    DOM_VK_F6 = 117,
    DOM_VK_F7 = 118,
    DOM_VK_F8 = 119,
    DOM_VK_F9 = 120,
    DOM_VK_F10 = 121,
    DOM_VK_F11 = 122,
    DOM_VK_F12 = 123,
    DOM_VK_F13 = 124,
    DOM_VK_F14 = 125,
    DOM_VK_F15 = 126,
    DOM_VK_F16 = 127,
    DOM_VK_F17 = 128,
    DOM_VK_F18 = 129,
    DOM_VK_F19 = 130,
    DOM_VK_F20 = 131,
    DOM_VK_F21 = 132,
    DOM_VK_F22 = 133,
    DOM_VK_F23 = 134,
    DOM_VK_F24 = 135,
    DOM_VK_NUM_LOCK = 144,
    DOM_VK_SCROLL_LOCK = 145,
    DOM_VK_COMMA = 188,
    DOM_VK_PERIOD = 190,
    DOM_VK_SLASH = 191,
    DOM_VK_BACK_QUOTE = 192,
    DOM_VK_OPEN_BRACKET = 219,
    DOM_VK_BACK_SLASH = 220,
    DOM_VK_CLOSE_BRACKET = 221,
    DOM_VK_QUOTE = 222,
    DOM_VK_META = 224;

var shortcuts_default = {
    reply: DOM_VK_R,
    quote: DOM_VK_Q,
    link: DOM_VK_L,
    edit: DOM_VK_E,
    copy: DOM_VK_O,
    delete: DOM_VK_D,
    task: DOM_VK_K,
    my_chat: DOM_VK_A,
    scroll: DOM_VK_S,
    toggle_mention: DOM_VK_X,
    toggle_emoticon: DOM_VK_Z,
    toggle_shortcut: DOM_VK_V,
    previous_mention: DOM_VK_K,
    next_mention: DOM_VK_J
};

var room_shortcuts = [];

$(function(){
    shortcut_timer = setInterval(
        function(){
            if (typeof CW != 'undefined' && typeof CW.view != 'undefined') {
                window.clearInterval(shortcut_timer);
                if (shortcut_status) {
                    registerShortcut();
                }
            }
        },
        100
    );
});

function registerShortcut() {
    console.log('Registering ShortCuts');
    CW.view.registerKeyboardShortcut(shortcuts_default.reply, !1, !1, !1, !1, function() {
        var message_id = getHoverMessageId();
        replyMessage(message_id);
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.quote, !1, !1, !1, !1, function() {
        triggerDefaultAction('quote');
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.link, !1, !1, !1, !1, function() {
        triggerDefaultAction('link');
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.edit, !1, !1, !1, !1, function() {
        triggerDefaultAction('edit');
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.copy, !1, !1, !1, !1, function() {
        triggerMoreAction('copy');
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.delete, !1, !1, !1, !1, function() {
        triggerMoreAction('delete');
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.task, !1, !1, !1, !1, function() {
        triggerDefaultAction('task');
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.my_chat, !1, !1, !1, !1, function() {
        RL.selectRoom(AC.getRoomId(AC.myid));
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.scroll, !1, !1, !1, !1, function() {
        RM.load(RM.timeline.getLastChatId());
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.toggle_emoticon, !1, !1, !1, !1, function() {
        toggleEmoticonsStatus();
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.toggle_mention, !1, !1, !1, !1, function() {
        toggleMentionStatus();
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.toggle_shortcut, !1, !1, !1, !1, function() {
        toggleShortcutStatus();
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.previous_mention, !1, !1, !1, !1, function() {
        var message_id = getHoverMessageId();
        goToPreviousMention(message_id);
    });

    CW.view.registerKeyboardShortcut(shortcuts_default.next_mention, !1, !1, !1, !1, function() {
        var message_id = getHoverMessageId();
        goToNexMention(message_id);
    });

    if (localStorage[LOCAL_STORAGE_ROOM_SHORTCUT] !== undefined && localStorage[LOCAL_STORAGE_ROOM_SHORTCUT]) {
        room_shortcuts = JSON.parse(localStorage[LOCAL_STORAGE_ROOM_SHORTCUT]);
    }

    for (i in room_shortcuts) {
        if (room_shortcuts[i]) {
            var room = room_shortcuts[i];
            CW.view.registerKeyboardShortcut(DOM_VK_0 + parseInt(i), !1, !1, !1, !1, selectRoom(room));
        }
    }
}

var selectRoom = function (room) {
    return function() {
        RL.selectRoom(room);
    }
};

function removeRegisteredKeyboardShortcut() {
    for (keyboard in shortcuts_default) {
        CW.view.registerKeyboardShortcut(shortcuts_default[keyboard], !1, !1, !1, !1, function() {
            return false;
        });
    }
}

function triggerDefaultAction(action) {
    var me = $('._message:hover');
    var reply = me.find("[data-cwui-ab-type='" + action + "']");
    if (isDomExists(reply)) {
        reply.trigger('click');
    }
}

function triggerMoreAction(action) {
    var more_action = $('._message:hover').find('._cwABMoreTip');
    if (isDomExists(more_action)) {
        more_action.trigger('click');
        var delete_button = $('._cwABMoreListBox').find('[data-cwui-ab-type="action"]');
        if (isDomExists(delete_button)) {
            delete_button.trigger('click');
        }
    }
}

function isDomExists(dom) {
    return dom.length > 0;
}

function getHoverMessageId() {
    return $('._message:hover').data('mid');
}

function getMessagePosition(id) {
    var messages = RM.timeline.chat_list;
    for (var i = messages.length -1; i >= 0; i--) {
        if (messages[i].id == id) {
            return i;
        }
    }

    return -1;
}

function goToPreviousMention(current) {
    var position = getMessagePosition(current);
    var messages = RM.timeline.chat_list;
    for (var i = position - 1; i >= 0; i--) {
        if (isMentionMessage(messages[i])) {
            RM.load(messages[i].id);
            return true;
        }
    }

    if (!RM.timeline.has_old && messages.length == 0) {
        return false;
    }

    RM.timeline.loadOld();
}

function goToNexMention(current) {
    var position = getMessagePosition(current);
    var messages = RM.timeline.chat_list;
    for (var i = position + 1; i > 0 && i < messages.length; i++) {
        if (isMentionMessage(messages[i])) {
            RM.load(messages[i].id);
            return true;
        }
    }

    return false;
}

function isMentionMessage(message) {
    var regex_reply = new RegExp('\\[.* aid=' + myid + ' .*\\]');
    if (regex_reply.test(message.msg)) {
        return true;
    }

    var regex_to = new RegExp('\\[To:' + myid + '\\]');
    return regex_to.test(message.msg);
}

function replyMessage(message) {
    var data = RM.timeline.chat_id2chat_dat[message];
    if (data) {
        $C("#_chatText").focus();
        var name = ST.data.private_nickname && !RM.isInternal() ? AC.getDefaultNickName(data.aid) : AC.getNickName(data.aid);
        CS.view.setChatText("[" + L.chatsend_reply + " aid=" + data.aid + " to=" + RM.id + "-" + message + "] " + name + "\n", !0);
    }
}