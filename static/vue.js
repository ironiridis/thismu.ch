const app = Vue.createApp({})
app.component('state-idle', {
    template: `
    <div class="status">Not connected. Create a new channel?</div><button>Create new estimation channel</button>`
})
app.component('state-disconnected', {
    template: `
    <div class="status">Uh oh. Disconnected from server.</div><button>Reconnect</button><button>Cancel</button>`
})
app.component('state-hosting-setup', {
    template: `
    <div class="status">Alright, let's change a couple settings...</div>
    <ul class="settings">
        <li><input type="checkbox" name="hostvote"><label for="hostvote">Host (you!) also votes</label></li>
        <li><input type="checkbox" name="abstainers"><label for="abstainers">Allow voters to abstain (ie skip the vote)</label></li>
        <li><input type="checkbox" name="autoreveal"><label for="autoreveal">Automatically reveal if everybody voted</label></li>
    </ul>`
})
app.component('state-hosting-alone', {
    template: `
    <div class="status">Ready! Share this link with your team: <a href="x">x</a></div>`
})
app.component('state-hosting-active', {
    template: `
    <div class="status">Connected to your team!</div>
    <ul class="connectedvoters"><li v-for="voter in voters" class="voter"><span class="name">{{ voter.displayname }}</span></li></ul>
    `
})
app.component('state-voter-active', {
    template: `
    <div class="status">Connected to your host and your team!</div>
    <ul class="connectedvoters"><li v-for="voter in voters" class="voter"><span class="name">{{ voter.displayname }}</span></li></ul>
    `
})
