import MonacoEditor from '@monaco-editor/react';
import { ReactElement } from 'react';

const options = {
  selectOnLineNumbers: true,
};

interface Props {
  fullWidth?: boolean;
  value: string;
  setValue: (value: string) => void;
}

export default function Editor({ fullWidth, setValue, value }: Props): ReactElement {
  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <MonacoEditor
      width={fullWidth ? '100vw' : '50vw'}
      height="100vh"
      language="markdown"
      theme={'vs-dark'}
      value={value}
      options={options}
      onChange={onChange}
      onMount={(editor) => editor.focus()}
    />
  );
}
