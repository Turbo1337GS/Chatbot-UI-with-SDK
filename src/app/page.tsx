// 'use client' jest dyrektywą Next.js oznaczającą, że plik ma być uruchamiany tylko po stronie klienta
'use client';

// Import dynamicznego ładowania komponentów w Next.js
import dynamic from 'next/dynamic';
import Head from 'next/head'; // Import dla zarządzania <head>

// Dynamiczne ładowanie komponentu bez SSR (Server Side Rendering)
const ChatWithNoSSR = dynamic(() => import('./components/main'), {
  ssr: false,
});

// Komponent główny Home
export default function Home() {
  return (
    <>
      <Head>
        <title>GigAI Models</title>
        <meta name="description" content="Explore the forefront of natural language processing with GigAI Models. Our innovative AI models are revolutionizing the way we interact with technology, making it more intuitive and accessible than ever before." />
        <meta name="keywords" content="GigAI, AI Models, Natural Language Processing, NLP, Innovation, Technology" />
      </Head>
      <main>
        <ChatWithNoSSR />
      </main>
    </>
  );
}
