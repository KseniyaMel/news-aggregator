import React, { useCallback, useState } from 'react';
import { Button, Popover } from 'antd';
import FilterOptions from './FilterOptions';

const Filter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Popover
      content={<FilterOptions handleClose={handleClose} />}
      title="Filter"
      trigger="click"
      open={isOpen}
      onOpenChange={handleOpen}
      overlayStyle={{ minWidth: '250px' }}
    >
      <Button type="primary">Filter</Button>
    </Popover>
  );
};

export default Filter;