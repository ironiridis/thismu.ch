if (0) {
    var ws = new WebSocket("wss://ws.thismu.ch/");

    ws.onopen = function(e) {
        console.log('ws open event', e);
        ws.send(JSON.stringify({hello: 'we connected, sorry'}));
    }
    ws.onmessage = function(e) {
        console.log('ws message event', e);
    }
    ws.onerror = function(e) {
        console.log('ws error event', e);
    }
    ws.onclose = function(e) {
        console.log('ws close event', e);
    }



    let btn = document.getElementById('boopBtn');
    btn.addEventListener('click', function(e) {
        ws.send(JSON.stringify(e))
    });

}
