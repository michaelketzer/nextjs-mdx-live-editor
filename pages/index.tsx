import Editor from '@/components/editor/editor';
import { GetStaticPropsResult } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Preview from '@/components/preview/preview';
import { ReactElement } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import useLocalStorageState from '@/hooks/useLocalStorage';

const defaultMdx = `---
title: MDX file title
path: /path-in-browser
created: 2021-07-05
updated: 2021-07-05
---

# Start writing your MDX content

- Test bullet point

Custom elements <Shape /> can be viewed instantly

*lets write **some cool** markdown*
`;

function downloadMdx(content: string): void {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', 'markdown.mdx');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export default function Home({ defaultPreview }: { defaultPreview: MDXRemoteSerializeResult }): ReactElement {
  const [code, setCode] = useLocalStorageState('mdxContent', defaultMdx);

  return (
    <>
      <main>
        <div className={'actions'}>
          <a href={'https://github.com/michaelketzer/nextjs-mdx-live-editor'} target={'_blank'} rel={'norefeerer'}><button>Github</button></a>
          <button onClick={() => downloadMdx(code)}>Download</button>
        </div>

        <div className={'editor'}>
          <Editor value={code} setValue={setCode} />
        </div>

        <div className={'preview'}>
          <Preview content={code} defaultPreview={defaultPreview} />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ defaultPreview: MDXRemoteSerializeResult }>> {
  const defaultPreview = await serialize(defaultMdx);
  return {
    props: {
      defaultPreview,
    },
  };
}
