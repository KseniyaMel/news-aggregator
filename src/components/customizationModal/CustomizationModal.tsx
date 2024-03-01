import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, Select } from 'antd';
import DynamicSelect from '../dynamicSelect';
import sourcesOption from '../../data/constants/sourcesOption';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addCategoriesOption, setCategories, setSources } from '../../strore/articles/articles.slices';
import addToLocalStorage from '../../utils/addToLocalStorage';
import getFromLocalStorage from '../../utils/getFromLocalStorage';
import LOCAl_STORAGE_KEYS from '../../data/constants/localStorageKeys';
import styles from './CustomizationModal.module.css';
import { getCategoriesOption } from '../../strore/articles/articles.selectors';

interface ICustomSettings {
  categories: string[],
  sources: string[]
}

const CustomizationModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const categoriesOption = useAppSelector(getCategoriesOption);
  const [isOpen, setIsOpen] = useState(false);
  const [customSettings, setCustomSettings] = useState<ICustomSettings>({
    categories: [],
    sources: [],
  });

  useEffect(() => {
    const categories = getFromLocalStorage(LOCAl_STORAGE_KEYS.Categories);
    const sources = getFromLocalStorage(LOCAl_STORAGE_KEYS.Sources);
    setCustomSettings({ categories, sources });
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    addToLocalStorage(LOCAl_STORAGE_KEYS.Sources, customSettings.sources);
    addToLocalStorage(LOCAl_STORAGE_KEYS.Categories, customSettings.categories);

    dispatch(setSources({ sources: customSettings.sources }));
    dispatch(setCategories({ categories: customSettings.categories }));

    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSettingsChange = useCallback((key: string, value: string[]) => {
    setCustomSettings(prevSettings => ({
      ...prevSettings,
      [key]: value,
    }));
  }, []);

  const handleAddCategoriesOption = useCallback((value: string) => {
    dispatch(addCategoriesOption({ category: value }))
  }, [dispatch]);

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Customize
      </Button>
      <Modal
        title="Customize News Feed"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.customization_modal}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            value={customSettings.sources}
            options={sourcesOption}
            onChange={(value: string[]) => handleSettingsChange('sources', value)}
          />
          <DynamicSelect
            placeholder='Select categories...'
            initItem={categoriesOption}
            value={customSettings.categories}
            onChange={(value: string[]) => handleSettingsChange('categories', value)}
            handleAddItem={handleAddCategoriesOption}
          />
        </div>
      </Modal>
    </div>
  )
};

export default CustomizationModal;