import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function H1({ children }: Props): ReactElement {
  return (
    <h1>
      {children}

      <style jsx>{`
        h1 {
          color: skyblue;
        }
      `}</style>
    </h1>
  );
}
