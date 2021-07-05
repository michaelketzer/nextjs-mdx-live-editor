import { ReactElement } from 'react';

export default function Shape(): ReactElement {
  return (
    <i>
      <style jsx>{`
        i {
          width: 1.6rem;
          height: 1.6rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: #F0F;
        }
      `}</style>
    </i>
  );
}
