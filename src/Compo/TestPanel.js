import React from 'react';
import { useTestPanel } from './TestPanelContext';
import { slideToggle } from './composables/slideToggle';

function TestPanel(props) {
  const {
    expand,
    reload,
    remove,
    toggleExpand,
    toggleRemove,
    toggleCollapse,
    toggleReload,
  } = useTestPanel();

  return (
    !remove && (
      <div className={`panel panel-${props.theme ? props.theme : 'inverse'} ${expand ? 'panel-expand' : ''} ${reload ? 'panel-loading' : ''} ${props.className ? props.className : ''}`}>
        {props.children}
      </div>
    )
  );
}

function TestPanelHeader(props) {
  const {
    toggleExpand,
    toggleRemove,
    toggleCollapse,
    toggleReload,
    selectedValue,
    handleSelectChange,
  } = useTestPanel();

  return (
    <div className={`panel-heading ${props.className}`}>
      <h4 className="panel-title">{props.children}</h4>
      {!props.noButton && (
        <div className="panel-heading-btn">

          <button className="btn btn-xs btn-icon btn-circle btn-default" onClick={toggleExpand}>
            <i className="fa fa-expand"></i>
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-xs btn-icon btn-circle btn-success" onClick={toggleReload}>
            <i className="fa fa-redo"></i>
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-xs btn-icon btn-circle btn-warning" onClick={toggleCollapse}>
            <i className="fa fa-minus"></i>
          </button>
          &nbsp;&nbsp;
   
          <select
                style={{
                  borderRadius: '50px',
                  padding: '0.0001rem 0.1rem',
                  fontSize: '0.67rem',
                  height: 'auto',
                  width: 'auto',
                  color: 'white',
                  textAlign: 'center',
                  backgroundColor: '#49b5f2'
                }}
                className="form-select form-select-sm"
                value={selectedValue}
            onChange={handleSelectChange}
              >
                {[5, 10, 15, 20, 25].map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
        </div>
      )}
    </div>
  );
}

function TestPanelBody(props) {
  const { reload } = useTestPanel();

  return (
    <div className={`panel-body ${props.className}`}>
      {props.children}
      {reload && (
        <div className="panel-loader">
          <span className="spinner spinner-sm"></span>
        </div>
      )}
    </div>
  );
}

function TestPanelFooter(props) {
  return <div className={`panel-footer ${props.className}`}>{props.children}</div>;
}

export { TestPanel, TestPanelHeader, TestPanelBody, TestPanelFooter };
