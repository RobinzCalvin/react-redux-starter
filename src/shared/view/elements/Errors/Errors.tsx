import * as React from 'react';
import * as block from 'bem-cn';
import './Errors.styl';

interface IProps {
  errors?: string[];
  hidden?: boolean;
}

const b = block('errors');

function Errors({ hidden, errors = [] }: IProps) {
  return (
    <div className={b({ hidden })}>
      {
        errors.map((error: string, index: number) => (
          <span key={index} className={b('error')}>{error}</span>
        ))
      }
    </div>
  );
}

export { IProps };
export default Errors;
