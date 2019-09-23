export const state = () => ({
    lastVisitedRoute: null
});

export const mutations = {
    setLastVisitedRoute(state, payload) {
        state.lastVisitedRoute = payload;
    }
};

export const getters = {
    getLastVisitedRoute: state => state.lastVisitedRoute,
};
