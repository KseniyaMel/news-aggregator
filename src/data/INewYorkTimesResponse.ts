interface INewYorkTimesResponse {
  status: 'OK' | 'ERROR',
  response: {
    docs: {
      abstract: string,
      pub_date: string,
      web_url: string,
      source: string,
      lead_paragraph: string
    }[]
  }
}

export default INewYorkTimesResponse;