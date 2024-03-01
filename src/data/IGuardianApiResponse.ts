interface IGuardianApiResponse {
  response: {
    status: string,
    total: number,
    results: {
      webPublicationDate: string,
      webTitle: string,
      webUrl: string
  }[]
  }
}

export default IGuardianApiResponse;