import Document, { Html, Head, NextScript, DocumentContext, Main } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />

					<meta name="description" content="Procure por filmes e visualize suas informações. Adicione-o a sua própria lista de filmes." />
					<meta itemProp="name" content="Movie Land" />
					<meta property="og.title" content="Movie Land" />
					<meta property="og.description" content="Procure por filmes e visualize suas informações. Adicione-o a sua própria lista de filmes." />
					<meta property="og.url" content="https://movieland.dev/" />

					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap" rel="stylesheet" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}