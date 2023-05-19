import React from 'react';

const Validation = (info: { changeError: string; changeDirty: boolean }) => {
  return info.changeError && info.changeDirty ? (
    <div className="form-empty">{info.changeError}</div>
  ) : (
    <div className="form-empty"></div>
  );
};

export default Validation;
