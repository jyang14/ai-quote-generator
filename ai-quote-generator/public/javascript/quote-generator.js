const select = new mdc.select.MDCSelect(document.querySelector('.mdc-select'));

let model = null;

async function generateQuote(category){

    if (model === null) {
        model = await tf.loadModel('https://raw.githubusercontent.com/jyang14/ai-quote-generation-data/3e50d6f3abf7d61a09d65a43b5768a7cf5c7a027/model.json');
    }


};

select.listen('change', () => {
    const category = select.value;
    generateQuote(category);
});