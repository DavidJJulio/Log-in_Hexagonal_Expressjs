//  rateLimit -> express-rate-limit es un middleware para aplicaciones de Express que permite
//  limitar la cantidad de solicitudes que un cliente puede hacer a un servidor en un período de tiempo determinado.
//  De manera interna express-rate-limit almacena en un contador la cantidad de solicitudes que un usuario realiza,
//  identifica a los usuarios mediante su dirección IP.

const rateLimit = require('express-rate-limit');



// Lista de User-Agents de bots conocidos.

const botUserAgents = [
    "Prerender", "Googlebot", "Google\\+", "bingbot", "Googlebot-Mobile", "seochat", "SemrushBot", "SemrushBot-SA",
    "Bot", "SEOChat", "Baiduspider", "Yahoo", "YahooSeeker", "DoCoMo", "Twitterbot", "TweetmemeBot", "Twikle",
    "Netseer", "Daumoa", "SeznamBot", "Ezooms", "MSNBot", "Exabot", "MJ12bot", "sogou\\sspider", "YandexBot",
    "bitlybot", "ia_archiver", "proximic", "spbot", "ChangeDetection", "NaverBot", "MetaJobBot", "magpie-crawler",
    "Genieo\\sWeb\\sfilter", "Qualidator.com\\sBot", "Woko", "Vagabondo", "360Spider", "ExB\\sLanguage\\sCrawler",
    "AddThis.com", "aiHitBot", "Spinn3r", "BingPreview", "GrapeshotCrawler", "CareerBot", "ZumBot", "ShopWiki",
    "bixocrawler", "uMBot", "sistrix", "linkdexbot", "AhrefsBot", "archive.org_bot", "SeoCheckBot", "TurnitinBot",
    "VoilaBot", "SearchmetricsBot", "Butterfly", "Yahoo!", "Plukkie", "yacybot", "trendictionbot", "UASlinkChecker",
    "Blekkobot", "Wotbox", "YioopBot", "meanpathbot", "TinEye", "LuminateBot", "FyberSpider", "Infohelfer",
    "linkdex.com", "Curious\\sGeorge", "Fetch-Guess", "ichiro", "MojeekBot", "SBSearch", "WebThumbnail",
    "socialbm_bot", "SemrushBot", "Vedma", "alexa\\ssite\\saudit", "SEOkicks-Robot", "Browsershots", "BLEXBot",
    "woriobot", "AMZNKAssocBot", "Speedy", "oBot", "HostTracker", "OpenWebSpider", "WBSearchBot", "FacebookExternalHit",
    "Google-Structured-Data-Testing-Tool", "baiduspider", "facebookexternalhit", "twitterbot", "rogerbot",
    "linkedinbot", "embedly", "quora\\slink\\spreview", "showyoubot", "outbrain", "pinterest", "slackbot",
    "vkShare", "W3C_Validator"
];



//  Configuración del middleware
//  windowMs    ->  Define el periodo de tiempo en el que se cuentan las solicitudes.
//  max         ->  Define el maximo de solicitudes en ese periodo de tiempo      
//  handler     ->  Funcion que se ejecuta cuando un cliente supera el máximo de solicitudes.
//                  Acepta 3 parametros, request, response y next.
//                  Primero se obtiene el userAgent de la request.
//                  Verifica que userAgent exista y que userAgent coincide con algun bot
//                  previamente definido.
//                  Si es el caso, retorna un 403. Si no es el caso, un 429.

exports.limiTotal = rateLimit({
    
    windowMs: 15 * 60 * 1000,
    max: 100,

    handler: (req, res, next) => {

        const userAgent = req.get('User-Agent');

        if (userAgent && botUserAgents.some(bot => new RegExp(bot, 'i').test(userAgent))) {

            return res.status(403).json({

                error: 'Forbidden',
                message: 'Bot access is not allowed.'

            });

        }

        res.status(429).json({
            message: 'You have made too many requests in a short period of time. Please try again later.'
        });
    }

});