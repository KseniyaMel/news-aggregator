import React, { useCallback, useMemo } from 'react';
import { Button, Select, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import sourcesOption from '../../data/constants/sourcesOption';
import DynamicSelect from '../dynamicSelect';
import { getCategoriesOption, getFilter } from '../../strore/articles/articles.selectors';
import { addCategoriesOption, resetFilter, setBeginDate, setCategories, setEndDate, setSources } from '../../strore/articles/articles.slices';
import styles from './Filter.module.css';

const MyDatePicker = DatePicker.generatePicker<Moment>(momentGenerateConfig);

interface IFilterOptionsProps {
  handleClose: () => void
}

const FilterOptions: React.FC<IFilterOptionsProps> = React.memo(({ handleClose }) => {
  const filter = useAppSelector(getFilter);
  const categoriesOption = useAppSelector(getCategoriesOption);
  const dispatch = useAppDispatch();

  const handleSetDates = (dates: [Moment | null, Moment | null]) => {
    const [beginDate, endDate] = dates.map(date => (date ? date.format('YYYY-MM-DD') : null));
    dispatch(setBeginDate({ beginDate }));
    dispatch(setEndDate({ endDate }));
  };

  const handleSetSources = (value: string[]) => {
    dispatch(setSources({ sources: value }));
  };

  const handleSetCategories = (value: string[]) => {
    dispatch(setCategories({ categories: value }));
  };

  const handleAddCategoriesOption = useCallback((value: string) => {
    dispatch(addCategoriesOption({ category: value }))
  }, [dispatch]);

  const handleReset = () => {
    dispatch(resetFilter());
  };

  const memoizedBeginDate = useMemo(() => moment(filter.beginDate), [filter.beginDate]);
  const memoizedEndDate = useMemo(() => moment(filter.endDate), [filter.endDate]);

  return (
    <div className={styles.filter}>
      <MyDatePicker.RangePicker
        width={270}
        value={[memoizedBeginDate, memoizedEndDate]}
        onChange={handleSetDates}
      />
      <Select
        style={{ width: 270 }}
        mode="multiple"
        value={filter.sources}
        options={sourcesOption}
        onChange={handleSetSources}
      />
      <DynamicSelect
        width={270}
        placeholder='Select categories...'
        initItem={categoriesOption}
        handleAddItem={handleAddCategoriesOption}
        value={filter.categories}
        onChange={handleSetCategories}
      />
      <div className={styles.footer}>
        <Button type="primary" onClick={handleReset}>Reset</Button>
        <Button type="primary" onClick={handleClose}>Close</Button>
      </div>
    </div>
  );
});

export default FilterOptions;