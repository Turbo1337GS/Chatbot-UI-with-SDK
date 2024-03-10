import Fade from '@mui/material/Fade';
import { AiFillCopy } from "react-icons/ai";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import rehypeMathjax from 'rehype-mathjax';
import rehypeRaw from 'rehype-raw';
import { Box, keyframes } from '@mui/material';
import remarkBreaks from 'remark-breaks';
import { TiInputCheckedOutline } from "react-icons/ti";
import * as mui from "@mui/material"
interface CodeBlockProps {
  text?: string;
}
interface ImageProps {
  node: any;
  src: string;
  alt?: string;
}

const ImageComponent: React.FC<ImageProps> = ({ src, ...props }) => {
  let ampFixedSrc = decodeURIComponent(src).replace(/&amp;/g, '&');
  const isBase64 = ampFixedSrc.startsWith('data:image/');
  
  return (
    <>
      {isBase64 ? (
        <img {...props} src={ampFixedSrc} alt={props.alt} />
      ) : (
        <>
          <img {...props} src={ampFixedSrc} alt={props.alt} />
          <p>Image url: {ampFixedSrc}</p>
        </>
      )}
    </>
  );
};

const CodeBlock: React.FC<CodeBlockProps> = ({ text }) => {
  const [isValid, setIsValid] = useState(false);
  const [language, setLanguage] = useState('');

  const [messageCopied, setMessageCopied] = useState(false);

  const renderers = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || 'none');
      if (match) {
        setLanguage(match[1]);
      }

      const handleCopy = () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(String(children)).then(() => {
          setMessageCopied(true);
          setTimeout(() => {
            setMessageCopied(false); <AiFillCopy />
          }, 2000);
        });
      };

      if (!inline && match) {
        return (
          <div style={{ position: 'relative', padding: '14px' }}>

            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <button
                onClick={handleCopy}
                style={{
                  backgroundColor: '#646464',
                  borderRadius: '5px',
                  border: 'none',
                  color: 'white',
                  padding: '5px',
                  cursor: 'pointer'
                }}
              >
                {messageCopied ? (
                  <TiInputCheckedOutline size={25} />
                ) : (
                  <AiFillCopy size={20} />
                )}
              </button>
            </div>
            <mui.Paper
              sx={{ p: 1 }}>{language}</mui.Paper>

            <SyntaxHighlighter style={vscDarkPlus} language={language} PreTag="div">
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        return <code className={className} {...props}>{children}</code>;
      }
    },
    link: ({ node, children, ...props }: any) => {
      return (
        <a
          {...props}
          target="_blank"
          rel="noopener noreferrer"
          href={decodeURIComponent(props.href).replace(/&amp;/g, '&')}
        >
          {children}
        </a>
      );
    },

    img: ({ node, ...props }: any) => {
      const ampFixedSrc = decodeURIComponent(props.src).replace(/&amp;/g, '&');
      //return (<><img {...props} src={ampFixedSrc} /><p>Image url: {props.src}</p></>)
      return (
        <ImageComponent node={node}  alt={props.alt || ''} src={ampFixedSrc} />
      )
    },
    heading: ({ level, children }: any) => {

      return React.createElement(`h${level}`, {}, children);
    },
    list: ({ ordered, children }: any) => {
      if (ordered) {
        return <ol style={{ paddingLeft: '20px' }}>{children}</ol>;
      } else {
        return <ul style={{ paddingLeft: '20px' }}>{children}</ul>;
      }
    },
    listItem: ({ children }: any) => {
      return <li style={{ marginLeft: '4px' }}>{children}</li>;
    },
    p: ({ children }: any) => {
      return (
        <mui.Box>
        {children}
        </mui.Box>
      );
    },

  };

  return (
    <div style={{ maxWidth: '95%', width: 'auto', maxHeight: 'auto' }}>
      <Box
        sx={{ m: 1, p: 1 }}>
        <ReactMarkdown
          components={renderers}
          remarkPlugins={[gfm, remarkBreaks, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeMathjax, rehypeKatex]}
        >
          {text}
        </ReactMarkdown>
      </Box>
    </div>
  );
}

export default CodeBlock

