var thismuch = {}

window.addEventListener('load', function() {
    thismuch = app.mount('#v');
})


function makeNamePrefix() {
    const p = ['Convincing ', 'Clever ', 'Candid ', 'Careful ', 'Classic ']
    return p[Math.floor(Math.random() * p.length)]
}

function makeNameSuffix() {
    const p = ['Coder', 'Collaborator', 'Coach', 'Calculator', 'Cataloger', 'Calibrator']
    return p[Math.floor(Math.random() * p.length)]
}

function getStoredUserName() {
    let n = window.localStorage.getItem('thismuch_name')
    if (n == null || n == '') {
        return makeNamePrefix() + makeNameSuffix()
    }
    return n
}

function setStoredUserName() {
    window.localStorage.setItem('thismuch_name', thismuch.$data.user.name)
}