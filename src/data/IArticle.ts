interface IArticle {
  source: string,
  title: string,
  url: string,
  publishedAt: string,
  description?: string,
  urlToImage?: string | null
}

export default IArticle;