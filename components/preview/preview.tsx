import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ReactElement, useEffect, useRef, useState } from 'react';

import ErrorBoundary from './errorBoundary';
import { MDXComponents } from './../mdx/components';
import { debounce } from 'lodash';
import matter from 'gray-matter';

async function fetchSerialize(content: string): Promise<MDXRemoteSerializeResult> {
  const response = await fetch('/api/serialize', {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const { result } = await response.json();
    return result as MDXRemoteSerializeResult;
  }
}

interface Props {
  content: string;
  defaultPreview: MDXRemoteSerializeResult;
}

function convertPossibleDate(input: any): string {
  if (input instanceof Date) {
    return (new Date(input)).toISOString().split('T')[0];
  }

  return `${input}`;
}

export default function Preview({ content, defaultPreview }: Props): ReactElement {
  const [data, setData] = useState({});
  const [preview, setPreview] = useState<MDXRemoteSerializeResult>(defaultPreview);

  async function updateSearlizeResult(input: string) {
    const { data, content } = matter(input);
    try {
      const result = await fetchSerialize(content);
      if (result) {
        setPreview(result);
        setData(data);
      }
    } catch (error) {
      console.error('Error searialize the result', error);
      throw error;
    }
  }

  const updatePreview = useRef(debounce(updateSearlizeResult, 500));

  useEffect(() => {
    if (content) {
      updatePreview.current(content);
    }
  }, [content]);

  return (
    <ErrorBoundary content={preview}>
      {Object.keys(data).length > 0 && (
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{convertPossibleDate(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <MDXRemote {...preview} components={MDXComponents} />
    </ErrorBoundary>
  );
}
