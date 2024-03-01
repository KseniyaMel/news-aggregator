import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import type { InputRef } from 'antd';
import IOption from '../../data/IOption';

interface IDynamicSelectProps {
  onChange: (value: string[]) => void;
  handleAddItem: (value: string) => void;
  initItem?: string[];
  placeholder?: string;
  value?: string[];
  width?: number;
}

const DynamicSelect: React.FC<IDynamicSelectProps> = React.memo(({
  onChange,
  handleAddItem,
  initItem = [],
  value = [],
  placeholder,
  width = '100%',
}) => {
  const [items, setItems] = useState<IOption[]>(initItem.map((item) => ({ value: item, label: item })));
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (items.some((item) => item.label === name)) return;
    const newItem = { label: name, value: name };
    setItems((prevItems) => [...prevItems, newItem]);
    handleAddItem(name);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      mode="multiple"
      style={{ width }}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items}
    />
  );
});

export default DynamicSelect;