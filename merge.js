import PDFMerger from 'pdf-merger-js';
const merger = new PDFMerger();
const merge = async (pdfArray, pagesArray, fileName) => {
    merger.reset()
    for (const pdf in pdfArray) {
        if (pdfArray.hasOwnProperty(pdf)) {
            if (pagesArray[pdf] === "") {
                await merger.add(pdfArray[pdf]);
            } else {
                await merger.add(pdfArray[pdf], pagesArray[pdf]);
            }
        }
    }
    await merger.save(`output/${fileName}.pdf`);
};

export { merge };
