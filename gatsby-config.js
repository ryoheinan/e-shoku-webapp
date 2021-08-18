module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "eshoku",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
  ],
};
