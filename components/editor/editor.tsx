import MonacoEditor from '@monaco-editor/react';
import { ReactElement } from 'react';

const options = {
  selectOnLineNumbers: true,
  wordWrap: 'on',
  scrollbar: {
    horizontal: 'auto'
  }
};

interface Props {
  fullWidth?: boolean;
  value: string;
  setValue: (value: string) => void;
}

export default function Editor({ setValue, value }: Props): ReactElement {
  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <MonacoEditor
      width={'100%'}
      height={'100%'}
      language="markdown"
      theme={'vs-dark'}
      value={value}
      options={options}
      onChange={onChange}
      onMount={(editor) => editor.focus()}
    />
  );
}
