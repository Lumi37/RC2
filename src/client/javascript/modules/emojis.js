const emojis =     ['128512', '128513', '128514', '128515', '128516', '128517', '128518',
'128519', '128520', '128521', '128522', '128523', '128524', '128525', '128526', '128527',
'128528', '128529', '128530', '128531', '128532', '128533', '128534', '128535', '128536',
'128537', '128538', '128539', '128540', '128541', '128542', '128543', '128544', '128545',
'128546', '128547', '128548', '128549', '128550', '128551', '128552', '128553', '128554',
'128555', '128556', '128557', '128558', '128559', '128560', '128561', '128562', '128563',
'128564', '128565', '128566', '128567', '128568', '128569', '128570', '128571', '128572',
'128573', '128574', '128575', '128576', '128577', '128578', '128579', '128580', '129312',
'129313', '129314', '129315', '129316', '129317', '129318', '129319', '129320', '129321',
'129322', '129323', '129324', '129325', '129326', '129327']
const emojiBox = document.querySelector('.emojiBox')
const emojiButton = document.querySelector('#emojis')

emojis.forEach((e,i)=>{
    // console.log(i%10)
    // if((i%10)==0)emojiBox.innerHTML +="<br>"
    emojiBox.innerHTML += `<div class='emoji' data-emoji-num=${i}>${String.fromCodePoint(e)}</div>`
   
})

document.querySelectorAll('.emoji').forEach(emoji=>{
    emoji.addEventListener('click',e=>{
        textTypingArea.innerHTML += String.fromCharCode(emoji.textContent)
    })
})

emojiButton.addEventListener('click',e=>{
    emojiBox.style.visibility = "visible"
})
document.addEventListener('click',e=>{
    if(!emojiBox.contains(e.target))
        emojiBox.style.visibility = "hidden"
})