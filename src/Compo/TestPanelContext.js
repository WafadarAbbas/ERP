import React, { createContext, useState, useContext } from 'react';
import { slideToggle } from '../Compo/composables/slideToggle';
 
const TestPanelContext = createContext();
 
export const TestPanelProvider = ({ children }) => {
  const [expand, setExpand] = useState(false);
  const [reload, setReload] = useState(false);
  const [remove, setRemove] = useState(false);
  const [MaxResultCount, setMaxResultCount] = useState(5);

  const toggleExpand = () => setExpand(!expand);
  const toggleRemove = () => setRemove(!remove);
  const toggleCollapse = (e) => slideToggle(e.target.closest('.panel').querySelector('.panel-body'));
  const toggleReload = () => {
    if (!reload) {
      setReload(true);
      setTimeout(() => setReload(false), 2000);
    }
  };

  const handleSelectChange = (e) => {
    setMaxResultCount(Number(e.target.value));
  };

  const panelState = {
    expand,
    reload,
    remove,
    MaxResultCount,
    toggleExpand,
    toggleReload,
    toggleRemove,
    toggleCollapse,
    handleSelectChange,
  };

  return (
    <TestPanelContext.Provider value={panelState}>
      {children}
    </TestPanelContext.Provider>
  );
};

// Custom hook to use the TestPanelContext
export const useTestPanel = () => {
  return useContext(TestPanelContext);
};
