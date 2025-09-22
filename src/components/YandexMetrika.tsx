'use client';

import Script from 'next/script';

const YM_ID = '104240256';

export default function YandexMetrika() {
    return (
        <>
            <Script
                src={`https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}`}
                strategy="lazyOnload"
            />
            <Script id="yandex-metrika" strategy="lazyOnload">
                {`
                    (function(m,e,t,r,i,k,a){
                        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');

                    ym(${YM_ID}, 'init', {
                        ssr:true,
                        webvisor:true,
                        clickmap:true,
                        ecommerce:"dataLayer",
                        accurateTrackBounce:true,
                        trackLinks:true
                    });
                `}
            </Script>
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${YM_ID}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                        width="1"
                        height="1"
                    />
                </div>
            </noscript>
        </>
    );
}
