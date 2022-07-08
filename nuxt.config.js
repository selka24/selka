export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: "static",

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "DEGHI",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        script: [
            {
                src: "https://kit.fontawesome.com/1aab3ce66c.js",
                type: "text/javascript",
                crossorigin: "anonymous"
            }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        "@/assets/css/formulate.css",
        "@/assets/css/main.css",
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        [
            "@nuxtclub/supabase",
            {
                /* module options */
                url: "https://elgnbuqtuzilfphmysru.supabase.co",
                key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZ25idXF0dXppbGZwaG15c3J1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NTI3ODcwNywiZXhwIjoxOTYwODU0NzA3fQ.HaRjrHMewJqi54DfjFY6CfqR_tqSR3vgWVzOBmrM8rE",
            },
        ],
        '@braid/vue-formulate/nuxt'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        "bootstrap-vue/nuxt",
    ],
    generate: {
        fallback: true,
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};
