// Helper functions to gather browser and system information
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/);
        if (tem != null) return { name: 'Opera-Edge', version: tem[1] };
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return { name: M[0], version: M[1] };
}

function loadInfo() {
    const browser = getBrowserInfo();
    document.getElementById('browserInfo').textContent = `${browser.name} ${browser.version}`;
    document.getElementById('platform').textContent = navigator.platform;
    document.getElementById('screenWidth').textContent = screen.width;
    document.getElementById('screenHeight').textContent = screen.height;

    // Fetch user IP
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('userIp').textContent = data.ip;
            
            // Fetch country info using IP
            return fetch(`https://ipapi.co/${data.ip}/country/`);
        })
        .then(response => response.text())
        .then(country => {
            document.getElementById('country').textContent = country;
        })
        .catch(error => {
            console.error("Error fetching IP information:", error);
            document.getElementById('userIp').textContent = "Unavailable";
            document.getElementById('country').textContent = "Unavailable";
        });
}

// Run the loadInfo function when the page loads
window.onload = loadInfo;
