const { log } = require('console')
const express = require('express')
const fs = require('fs');
const app = express()
const path = require('path')
const multer = require('multer')
const { merge } = require('./merge')
const upload = multer({ dest: 'uploads/' })
const port = 3000
app.use('/static', express.static('output'));
app.use(express.static(path.join(__dirname, 'template')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "template/index.html"))
})

app.post('/merge', upload.array('pdfs'), async function(req, res, next) {
    try {
        let pdfArray = [];
        for (const pdf in req.files) {
            if (req.files.hasOwnProperty(pdf)) {
                const pdfPath = path.join(__dirname, req.files[pdf].path);
                pdfArray.push(pdfPath);
            }
        }
        const pagesArray = req.body.pages;
        const fileName = path.basename(pdfArray[0], path.extname(pdfArray[0]))
        await merge(pdfArray, pagesArray, fileName)
        res.redirect(`http://localhost:${port}/static/${fileName}.pdf`);
    } catch (error) {
        console.error('Error during merge:', error);
        res.status(500).send('An error occurred while merging the PDFs. Make sure you input valid details');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
