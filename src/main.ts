import {createApp} from 'vue';
import './assets/main.css';

import Router from './components/Router.vue';
const app = createApp(Router);
app.mount('main');

import NavBar from './components/NavBar.vue';
const nav = createApp(NavBar);
nav.mount('nav');
