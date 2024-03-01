interface IFilter {
  searchValue?: string;
  beginDate: string;
  endDate: string;
  sources: string[];
  categories?: string[];
}

export default IFilter;