
const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.get('/api/bet365', async (req, res) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.bet365.com/#/IP/B1');

  const pageData = await page.evaluate(() => {
    let resultado = {};
    let listaDeTimes = [];

    const times = document.querySelectorAll('.ovm-FixtureDetailsTwoWay_TeamName')

    times.forEach(time => {
      listaDeTimes.push(time.outerText)
    });

    function agruparTimes(listaDeTimes) {

      const grupos = [];

      for (let i = 0; i < listaDeTimes.length; i += 2) {
        if (i + 1 < listaDeTimes.length) {
          grupos.push([listaDeTimes[i], listaDeTimes[i + 1]]);
        } else {
          grupos.push([listaDeTimes[i]]);
        }
      }

      return grupos;
    }

    const gruposDeDois = agruparTimes(listaDeTimes);

    // Criando um objeto com o resultado
    resultado = {
      grupos: gruposDeDois.map((grupo, index) => ({
        grupo: index + 1,
        times: grupo
      }))
    };

    console.log(resultado)

    return resultado;

  });

  await browser.close();

  res.send(this.resultado)
});


app.listen(3000, () => {
  console.log('server started')
});