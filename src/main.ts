import {createApp} from 'vue';
import VueGtag from 'vue-gtag';
import './assets/main.css';

/*Icons*/
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faStopwatch, faMap, faLocationPin, faClock, faRuler, faStar, faHashtag, faArrowDown19, faHourglass} from '@fortawesome/free-solid-svg-icons';
import {faTwitter, faFacebook, faDiscord, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons';
library.add(faTwitter, faFacebook, faDiscord, faInstagram, faGithub, faStopwatch, faMap, faLocationPin, faClock, faRuler, faStar, faHashtag, faArrowDown19, faHourglass);

import Router from './components/App.vue';
const app = createApp(Router).component('font-awesome-icon', FontAwesomeIcon);
app.use(VueGtag, {
    config: {id: 'G-QK5NFEFDJ7'},
    enabled: false,
});
app.provide('gtag', app.config.globalProperties.$gtag);
app.mount('main');

import NavBar from './components/NavBar.vue';
const nav = createApp(NavBar);
nav.mount('nav');

import Footer from './components/Footer.vue';
const foot = createApp(Footer).component('font-awesome-icon', FontAwesomeIcon);
foot.mount('footer');
