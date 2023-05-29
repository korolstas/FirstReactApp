import React from 'react';

type TValidation = {
  changeError: string;
  changeDirty: boolean;
};

const Validation = (info: TValidation) => {
  return (
    <div className="form-empty">{info.changeError && info.changeDirty ? info.changeError : ''}</div>
  );
};

export default Validation;
