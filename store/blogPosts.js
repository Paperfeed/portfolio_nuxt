import { createClient } from '~/plugins/contentful';

const client = createClient();


export const state = () => ({
    posts: [],
    isLoading: true,
    hasMoreContent: true,
    limit: 2,
    error: false,
});


export const mutations = {
    addPosts(state, posts) {
        state.posts.push(...posts);
    },

    setHasMoreContent(state, payload) {
        state.hasMoreContent = payload;
    },

    setIsLoading(state, payload) {
        state.isLoading = payload;
    },

    setError(state, payload) {
        state.error = payload;
    }
};


export const getters = {
    getPostBySlug: (state) => (slug) => {
        return state.posts.find(post => post.fields.slug === slug)
    }
};


export const actions = {
    async getMorePosts({ commit, state }) {
        if (state.hasMoreContent) {
            let posts;

            commit('setIsLoading', true);

            try {
                posts = await client.getEntries({
                    'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
                    skip: state.posts.length,
                    limit: state.limit,
                    order: '-sys.createdAt'
                });
            } catch (e) {
                commit('setIsLoading', false);
                commit('setError', 'A network error has occurred. Maybe the servers aren\'t working or your internet is down.');
                return;
            }

            commit('setIsLoading', false);
            commit('addPosts', posts.items);
            commit('setHasMoreContent', state.posts.length < posts.total);
        }
    }
};

