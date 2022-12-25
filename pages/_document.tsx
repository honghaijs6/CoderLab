
import type { NextPage } from 'next';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

    render<NextPage>() {
        return (
            <Html>
                <Head>
                    <title>CoderLab</title>
                    <meta name="description" content="CoderLab" />
                    <link rel="icon" href="/favicon.ico" />

                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"></link>

                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"></link>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"></link>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&family=Noto+Sans+JP:wght@100;300;400;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"></link>
                    


                </Head>
                <body>
                    <div id="SITE-LOADING" className='hide' style={{ position: 'fixed', height: '100%', zIndex: 3000, background: 'rgba(0,0,0,0)', width: '100%' }}>
                        <div className="progress" style={{ borderRadius: 0, maxHeight: 7 }}>
                            <div className="progress-bar" role="progressbar" aria-valuenow={100} style={{ width: '100%', WebkitAnimationDuration: '1s' }} />
                        </div>
                    </div>

                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument; 