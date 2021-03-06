# Notes

## Testing

### Browsers

On december 3<sup>rd</sup>, 2017.

| Passing       | Not passing   |
|:------------- |:--------------|
| Safari      	| Edge 		      |
| Chrome      	| IE      		  |
| Firefox 	  	| Android     	|
|            		| iOS    	  	  |

> iOS: "date value is not finite in DateTimeFormat format()"

> Android: "expected '17:17' to equal '14:17'"

[Choose browsers to test on sauce](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/) and add them to  **wct.conf.json**

**first config**

[WCT with sauce](https://github.com/Polymer/tools/tree/master/travis)
```
gem install travis
travis encrypt SAUCE_USERNAME=yourusername --add
travis encrypt SAUCE_ACCESS_KEY=youraccesskey --add
```

**wct.conf.json**
```javascript
      "browsers": [
        {
          "browserName": "MicrosoftEdge",
          "platform": "Windows 10",
          "version": ""
        }, 
        {
          "browserName": "internet explorer",
          "platform": "Windows 8.1",
          "version": "11.0"
        },
        {
          "browserName": "safari",
          "platform": "OS X 10.11",
          "version": "10.0"
        },
        {
          "browserName": "Safari",
          "appiumVersion": "1.7.1",
          "deviceName": "iPhone X Simulator",
          "deviceOrientation": "portrait",
          "platformVersion": "11.0",
          "platformName": "iOS"
        }, 
        {
          "browserName": "Chrome",
          "appiumVersion": "1.6.4",
          "deviceName": "Android GoogleAPI Emulator",
          "deviceOrientation": "portrait",
          "platformVersion": "7.1",
          "platformName": "Android"
        }
      ]
```

After each push, watch test results at [travis](https://travis-ci.org/vladimirbrasil/time-glimpse).

This [video](https://www.youtube.com/watch?v=afy_EEq_4Go) is the great resource for configuration. 

Testing with polymer [help page](https://www.polymer-project.org/2.0/docs/tools/tests).

### Timezone

Date and time tests rely on a known timezone for proper evaluation. 

**travis.yml**
```
before_install:
- export TZ=America/Sao_Paulo
```
The above code is needed at **travis.yml** file for tests to evaluate results properly.

## Known issues

#### iron-pages
Not stub `iron-pages` causes several chrome-render processes to consume all CPU. Inspect element's CPU usage. Inspect render processes.

#### paper-toggle-button
Stub `paper-toggle-button` causes tests to fail. For some reason. Actually, couldn't manage to access `paper-toggle-button` at tests, when tried to do so. Build a test that toggles that button would be useful.

# Todos

Should test charts.
Should detect what is causing excessive rendering cpu consumption.
Should change iron-pages if it is really causing excessive rendering cpu consumption.
Should rely less on google charts if they are causing excessive rendering cpu consumption.

Pode agrupar todos os pontos no mesmo ano e colorir de claro para escuro (botão agrupar)
Time-glimpse pode aceitar datas e também um objeto:
```javascript
{ 
  correios: 1, 
   Cef: 0,
   Veículo: 1,
   Local: 0,
   (etc) 
}
```
Permitindo ter filtros por cada item ou ítens do objeto.
