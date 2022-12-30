import {createApp} from 'vue';
import './assets/main.css';

/*Icons*/
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faStopwatch, faMap, faLocationPin, faClock, faRuler, faStar, faHashtag, faArrowDown19, faHourglass} from '@fortawesome/free-solid-svg-icons';
import {faTwitter, faFacebook, faDiscord, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons';
library.add(faTwitter, faFacebook, faDiscord, faInstagram, faGithub, faStopwatch, faMap, faLocationPin, faClock, faRuler, faStar, faHashtag, faArrowDown19, faHourglass);

import Router from './components/App.vue';
const app = createApp(Router);
app.mount('body');
