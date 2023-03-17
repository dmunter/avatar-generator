import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head  
       meta name="viewport" content="width=device-width" nitial-scale="1"/>
       <link rel="shortcut icon" href="../logo-black.svg" />
      <body>       
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
