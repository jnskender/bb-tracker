import '../styles/globals.css'
import { Provider } from "next-auth/client";
import Page from '../components/Page';
import { ApolloProvider } from "@apollo/client"
import withData from '../lib/withData';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </Provider>
  )
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp)
