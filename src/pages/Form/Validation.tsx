import React from 'react';

const Validation = (info: { changeError: string; changeDirty: boolean }) => {
  return (
    <div className="form-empty">{info.changeError && info.changeDirty ? info.changeError : ''}</div>
  );
};

export default Validation;
