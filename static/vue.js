const app = Vue.createApp({
    data() {
        return {
            ui: 'home',
            chan: {
                id: '1',
                urlbase: 'https://thismu.ch/connect/',
                hostid: '',
                users: [],
                config: {
                    hostvote: false,
                    abstainers: true,
                    autoreveal: false
                }
            },
            user: {
                id: 321,
                name: getStoredUserName()
            }
        }
    }
})

app.component('ui-idle', {
    emits: ['new'],
    template: `<div class="ui-idle">
        <div class="status">Not connected. Create a new channel?</div>
        <button @click="$emit('new')">Create new estimation channel</button>
    </div>`
})
app.component('ui-offline', {
    props: ['chan'],
    emits: ['connect', 'reset'],
    template: `<div class="ui-offline">
        <div class="status">Uh oh. Disconnected from channel.</div>
        <button @click="$emit('connect', chan.id)">Reconnect</button>
        <button @click="$emit('reset')">Cancel</button>
    </div>`
})
app.component('ui-setname', {
    props: ['name'],
    data() { return { n:{} } },
    watch: { name: { immediate: true, handler: function(v){ this.n = v } } },
    emits: ['name-save', 'home'],
    template: `<div class="ui-setname">
        <div class="status">What's your name?</div>
        <div><label>Change your name to: <input type="text" v-model="n"></label></div>
        <button @click="$emit('name-save', this.n)">Save</button><button @click="$emit('home')">Cancel</button>
    </div>`
})
app.component('ui-setup', {
    props: ['config'],
    data() { return { c:{} } },
    watch: { config: { immediate: true, deep: true, handler: function(v){ this.c = {...v} } } },
    emits: ['config-save', 'home'],
    template: `<div class="ui-setup">
        <div class="status">Alright, let's change a couple settings...</div>
        <ul class="settings">
            <li><label><input type="checkbox" v-model="c.hostvote"> Host (you!) also votes</label></li>
            <li><label><input type="checkbox" v-model="c.abstainers"> Allow voters to abstain (ie skip the vote)</label></li>
            <li><label><input type="checkbox" v-model="c.autoreveal"> Automatically reveal if everybody voted</label></li>
        </ul>
        <button @click="$emit('config-save', this.c)">Save</button><button @click="$emit('home')">Cancel</button>
    </div>`
})
app.component('ui-alone', {
    props: ['chan', 'user'],
    emits: ['setname', 'reset'],
    template: `<div class="ui-alone">
        <div class="status">You're the only one here! Share the following link with your team to start.</div>
        <chan-link :chan="chan"></chan-link>
        <div class="you">
            Your name is currently
            <span class="name">{{user.name}}</span>,
            which you can <a href="#" @click.prevent="$emit('setname')">change</a>.
        </div>
        <button @click="$emit('reset')">Disconnect</button>
    </div>`
})
app.component('ui-active', {
    props: ['chan', 'user'],
    emits: ['setname', 'reset'],
    template: `<div class="ui-active">
        <div class="status">Connected to your team!</div>
        <button @click="$emit('reset')">Disconnect</button>
        <chan-link :chan="chan"></chan-link>
        <ul class="connectedusers">
            <li v-for="chanuser in chan.users" class="user">
                <span class="name">{{ chanuser.displayname }}</span>
                <span class="you" v-if="chanuser.id==user.id">
                &nbsp;(<a href="#" @click.prevent="$emit('setname')">change</a>)</span>
            </li>
        </ul>
    </div>`
})

app.component('chan-link', {
    props: ['chan'],
    methods: {
        copyLink() {
            navigator.clipboard.writeText(this.chan.urlbase + this.chan.id)
                .catch(e => console.log('failed to set clipboard contents', e))
        }
    },
    template: `<div class="share">
        This channel is available at:
        <a :href="chan.urlbase+chan.id" @click.prevent="copyLink" title="Click to copy">{{chan.urlbase}}{{chan.id}}</a>
    </div>`
})


// container
app.component('ui-container', {
    props: ['ui', 'chan', 'user'],
    template: `<div>
        <ui-setup   v-if="ui=='setup'" :config="chan.config"></ui-setup>
        <ui-setname v-else-if="ui=='setname'" :name="user.name"></ui-setname>
        <ui-active  v-else-if="ui=='home' && chan.users.length > 1" :chan="chan" :user="user"></ui-active>
        <ui-alone   v-else-if="ui=='home' && chan.users.length > 0" :chan="chan" :user="user"></ui-alone>
        <ui-offline v-else-if="ui=='home' && chan.id != ''" :chan="chan"></ui-offline>
        <ui-idle    v-else-if="ui=='home'"></ui-idle>
    </div>`
})
