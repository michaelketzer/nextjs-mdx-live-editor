import { ReactElement } from 'react';

interface Props {
  alt: string;
  src: string;
}

export default function Image({ alt }: Props): ReactElement {
  return (
    <div className={'imageWrapper'}>
      <div className={'placeholder'}>{alt}</div>
      <style jsx>{`
        .imageWrapper {
          width: 100%;
          padding-bottom: 50%;
          position: relative;
        }

        .placeholder {
          background-color: #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          inset: 0;
        }
      `}</style>
    </div>
  );
}
