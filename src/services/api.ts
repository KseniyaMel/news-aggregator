import axios, { AxiosInstance } from 'axios';
import { GUARDIAN_API, NEWS_API, NEW_YORK_TIMES_API } from './endpoints';
import IFilter from '../data/IFilter';
import INewsApiResponse from '../data/INewsApiResponse';
import IGuardianApiResponse from '../data/IGuardianApiResponse';
import IArticle from '../data/IArticle';
import INewYorkTimesResponse from '../data/INewYorkTimesResponse';
import { message } from 'antd';

const REQUEST_TIMEOUT = 5000;

export default class Api {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      timeout: REQUEST_TIMEOUT,
    });
  }

  private handleError(error: any) {
    if (error.response) {
      message.error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      message.error('Network error');
    } else {
      message.error('An error occurred');
    }
  }

  private async fetchData<T>(url: string, params: any): Promise<T | undefined> {
    try {
      const response = await this.api.get<T>(url, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async getNewsArticles(filter: IFilter, page: number): Promise<IArticle[]> {
    const { beginDate, endDate, searchValue } = filter;
    const params = {
      apiKey: NEWS_API.key,
      from: beginDate,
      to: endDate,
      q: searchValue,
      sources: 'abc-news',
      sortBy: 'publishedAt',
      page,
    };

    const response = await this.fetchData<INewsApiResponse>(NEWS_API.url, params);
    return response?.articles.map((article) => ({
      source: article.source.name,
      title: article.title,
      url: article.url,
      publishedAt: article.publishedAt,
      description: article.description,
      urlToImage: article.urlToImage,
    })) ?? [];
  }

  public async getGuardianArticles(filter: IFilter, page: number): Promise<IArticle[]> {
    const { searchValue, categories, beginDate, endDate } = filter;
    const section = categories?.length === 0 || !categories ? undefined : categories.join(',');
    const params = {
      'api-key': GUARDIAN_API.key,
      q: searchValue,
      section,
      'from-date': beginDate,
      'to-date': endDate,
      page,
    };

    const response = await this.fetchData<IGuardianApiResponse>(GUARDIAN_API.url, params);
    return response?.response.results.map((result) => ({
      source: 'The Guardian',
      title: result.webTitle,
      url: result.webUrl,
      publishedAt: result.webPublicationDate,
    })) ?? [];
  }

  public async getNewYorkTimesArticles(filter: IFilter, page: number): Promise<IArticle[]> {
    const { searchValue, categories, beginDate, endDate } = filter;
    const fq = categories?.length === 0 || !categories ? undefined : categories.join(',');
    const params = {
      'api-key': NEW_YORK_TIMES_API.key,
      'begin_date': beginDate,
      'end_date': endDate,
      q: searchValue,
      fq,
      page,
    };

    const response = await this.fetchData<INewYorkTimesResponse>(NEW_YORK_TIMES_API.url, params);
    return response?.response.docs.map((doc) => ({
      source: doc.source,
      title: doc.abstract,
      url: doc.web_url,
      publishedAt: doc.pub_date,
      description: doc.lead_paragraph,
    })) ?? [];
  }
}
