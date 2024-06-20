const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res)=>{
    fs.readdir('./files', (err, files)=>{
        // console.log(files.length);
        res.render("index", {files: files});
    })
    
})

app.get('/file/:filename', (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, filedata)=>{
        res.render('show', {filename: req.params.filename, filedata: filedata});
        // console.log(filedata);
    })
    
})

app.get('/edit/:filename', (req,res)=>{
    
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, filedata)=>{
        res.render('edit', {filename: req.params.filename, filedata: filedata});
        // console.log(filedata);
    })
    
})

app.post('/create', (req,res)=>{
    // console.log(req.body.title.split(' ').join(''));
    fs.writeFile(`./files/${req.body.title.split(' ').join('_')}.txt`, req.body.details, function(error){
        res.redirect('/');
    })
    
})

app.post('/edit', (req,res)=>{
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.previoustitle.split(' ').join('_')}.txt`, req.body.details, { encoding: 'utf8', flag: 'w' }, (error)=>{
        
    });
    fs.rename(`./files/${req.body.previoustitle.split(' ').join('_')}.txt`, `./files/${req.body.newtitle.split(' ').join('_')}.txt`, function(error){
        res.redirect('/');
    })
    
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`);
})