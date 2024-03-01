import React from 'react';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getFilter } from '../../strore/articles/articles.selectors';
import { setSearchValue } from '../../strore/articles/articles.slices';
import Filter from '../filter/Filter';
import CustomizationModal from '../customizationModal';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const filter = useAppSelector(getFilter);
  const dispatch = useAppDispatch();

  const handleSetSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue({ searchValue: event.target.value }));
  };

  return (
    <div className={styles.header}>
      <Input
        style={{ width: 220 }}
        value={filter.searchValue}
        placeholder="Search..."
        onChange={handleSetSearchValue}
      />
      <Filter />
      <CustomizationModal />
    </div>
  )
};

export default Header;