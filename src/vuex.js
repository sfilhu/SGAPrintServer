import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ip: '',
        eventMatch: {},
        navigation: false,
        menu: [],
        events: [],
        sports: [],
        filter: {
            navigation: []
        },
        user: null,
        state_notification: false,
        msg_notification: '',
        color_notification: '',
        logged: false,
        coupons: [],
        markets: [],
        results: [],
        arr_match: [],
        events_favorites: [],
        msg_feedback: '',
        print: {},
        blockButton: false,
    },
    
    plugins: [ createPersistedState() ],
    
    mutations: {
        
        eventMatch(state, eventMatch) {
            state.eventMatch = eventMatch
        },

        print(state, print) {
            state.print = print
        },
        menu(state, menu) {
            state.menu = menu
        },
        navigation(state, navigation) {
            state.navigation = navigation
        },

        setFilterNavigation(state, filter) {
            state.filter.navigation = filter
        },
        events_favorites(state, events_favorites) {
            state.events_favorites = events_favorites
        },
        
        events(state, events) {
            state.events  = []
            state.events  = events
        },
        
        setUser(state, user) {
            state.user = user;
            state.logged = true
        },
        
        resetUser(state) {
            state.user = null;
            state.logged = false
        },
        
        setNotification(state, obj) {
            state.state_notification = true
            state.msg_notification = obj.msg
            state.color_notification = obj.color
        },

        setMsgFeedback(state, msg) {
            state.msg_feedback = msg
        },
        
        resetNotification(state) {
            state.state_notification = false
            state.msg_notification = ''
            state.color_notification = ''
        },

        setArrMatch(state, matchs) {
            state.arr_match = matchs
        },

        setCoupons(state, coupons) {
            state.coupons = coupons
        },
        
        setMarkets(state, markets) {
            state.markets = markets
        },
        
        setResults(state, results) {
            state.results = results
        },

        setSports(state, sports) {
            state.sports = sports
        },

        ip(state, ip) {
            state.ip = ip
        },
    },
    
    getters: {
        ip: state => {
            return state.ip;
        },
        getEventMatch: state => {
            return state.eventMatch;
        },
        getPrint: state => {
            return state.print;
        },
        getFilter: state => {
            return state.filter;
        },
        getMenu: state => {
            return state.menu;
        },
        getEventsFavorites: state => {
            return state.events_favorites;
        },
        getEvents: state => {
            return state.events;
        },
        navigation: state => {
            return state.navigation;
        },

        getUser: state => {
            return state.user;
        },
        
        getNotification: state => {
            return state.notification
        },

        getMsgFeedback: state => {
            return state.msg_feedback
        },
        
        getLogged: state => {
            return state.logged
        },

        setArrMatch: state => {
            return state.arr_match
        },
        
        getCoupons: state => {
            return state.coupons
        },
        
        getMarkets: state => {
            return state.markets
        },
        
        getResults: state => {
            return state.results
        },

        getSports: state => {
            return state.sports
        }
    }  
})