const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue= document.querySelector(".colorValue");

btn.addEventListener('click', async ()=>{
    let [tab] = await chrome.tabs.query({active: true,currentWindow: true});
    // console.log("hi");
    chrome.scripting.executeScript({
        target:{tabId: tab.id},
        function: pickColor,
    },async(injectionResults)=>{
        const[data]=injectionResults;
        if(data.result){
            const color=data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = color;
            try{
                await navigator.clipboard.writeText(color);
            }
            catch(err){
                console.error(err);
            }
            
        }
        
    });
});

async function pickColor() {
    try{
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
        
    }catch(err){
        console.error(err);
    }

}