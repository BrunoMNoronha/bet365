const { firefox } = require('playwright');

const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

let lista;

function name(lista) {
    app.get('/', (req, res) => {
        res.send(lista)
      })
}

async function minhaFuncaoAssincrona() {
    
    // const browser = await firefox.launch({headless: false})
    const browser = await firefox.launch()

    const page = await browser.newPage({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.63',
        extraHTTPHeaders: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Connection': 'keep-alive',
            'Cookie': 'rmbs=3; aps03=cf=N&cg=1&cst=0&ct=28&hd=N&lng=33&oty=2&tzi=16; cc=1; qBvrxRyB=A45IeaqEAQAAWy947jhK5mBXhZKpg0wmrWpF8YvPIs8kAW3F66ISs9f9JVHIAbtW4TWucm46wH8AAEB3AAAAAA|1|1|95c2dbb2f3558a5131fcb4a3ed6ce2c4fa54a062; _ga=GA1.1.734257009.1669307460; _ga_45M1DQFW2B=GS1.1.1669307459.1.1.1669309006.0.0.0; __cf_bm=.1bioOUncIlhLl66vFpebwEu64aQgKMpmaHf4CurRZc-1673977339-0-AeuOKVMdXQmfrz6vbkvSBxvqGq1Y/U+XQPRpDpMcBbhyYIM5vIcWgPiYlDsMT2yL3zCRMpCQQuJFfcUloPxbuRU=; pstk=689A9290987C448FB07976BB33B1B4DF000003; swt=AbtPT2kmQ9ifaI6zOZfiKAovxtDVn+ZH4oIEsrB7xXPDdRLIEdT9jdKP0EdzUs4Vna7rxfCNaqjLULJ3Q8YFrcFtrBlulVQA3lWAH3REt51Mck3v'
        }
    })

    await page.goto('https://www.bet365.com/#/IP/B1')
    await page.waitForTimeout(3000)
    // await page.screenshot( { path: `./bloqueiobet365.png`})
     await page.locator('.iip-IntroductoryPopup_Cross').click()

     const products = await page.$$eval('.ovm-FixtureDetailsTwoWay_TeamName', all_products => {
        const data = []
        all_products.forEach(product => {
            const title = product.innerText
            data.push({ title })
        });

        function agruparEmPares(array) {
            const resultado = [];
            for (let i = 0; i < array.length; i += 2) {
              const par = [array[i], array[i + 1]];
              resultado.push(par);
            }
            return resultado;
          }
          
          // Agrupa em pares e imprime o resultado
          const grupos = agruparEmPares(data);
        
        return grupos
    })
    // await browser.close()

    return products

    // console.log(products)


  }

    // (async () => {
    //     lista = await minhaFuncaoAssincrona()
    //     name(lista)
    // })();

    
    app.listen(port, () => {
        // console.log(`Example app listening on port ${port}`)
        (async () => {
            lista = await minhaFuncaoAssincrona()
            name(lista)
        })();
      })
