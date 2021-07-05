import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function H2({ children }: Props): ReactElement {
  return (
    <h2>
      {children}

      <style jsx>{`
        h2 {
          color: crimson;
        }
      `}</style>
    </h2>
  );
}
