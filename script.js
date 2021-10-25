const input = document.getElementById("input");
const remove = document.getElementById("delete");
const output= document.getElementById("output");
const buttons = document.querySelectorAll("button");
const clear = document.querySelector(".clear");
const bracket = document.getElementById("bracket");
const audio = document.getElementById("audio");
const result = document.getElementById("result");
const displaying = ['%','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.'];
const operations = ['+','/','*','-','%'];
buttons.forEach((press) => {
    press.addEventListener("click", () => {
        audio.play()
        for(let i = 0;i < displaying.length;i++){
            if(press.textContent == 'x' && displaying[i] == '*'){
                input.value += '*';
            }
            if(press.textContent == displaying[i]){
                input.value += press.textContent;
            }
        }
    })
})


clear.addEventListener("click", () => {
    input.value = '';
    output.textContent = '';
})


remove.addEventListener("click", () => {
    audio.play();
    const inside = input.value;
    if(inside.length > 0){
        let final = inside.slice(0,inside.length - 1);
        input.value = final;
    }

    //below code will be useful if the string no longer contain similar characters.if similar character exists in that particular string,then below code removes the least indexed character first.
    // let final = inside.replace(inside[inside.length - 1],'');
    // console.log(final);
    // input.value = final;
    // console.log(input.value.length);
})

bracket.addEventListener("click", () => {
    const inpValue = input.value;
    let final = '';
    if(inpValue.length > 0){
        if(inpValue[0] == '(' && inpValue[inpValue.length - 1] != ')'){
            final = inpValue + ')';
            input.value = final;
        }
        if(inpValue[inpValue.length - 1] == ')' && inpValue[0] != '('){
            final = '(' + inpValue;
            input.value = final;
        }
        if(inpValue[0] != '(' && inpValue[inpValue.length - 1] != ')'){
            final = '(' + inpValue + ')'
            input.value = final;
        }
        if(inpValue == '('){
            final = '(';
            input.value = final;
        }
    }
})


result.addEventListener("click", () => {
    const finalInput = input.value;
    let opIndex = '';
    let inpArr = [];
    let first = '';
    let second = '';
    if(finalInput.length > 0){
        for(let i = 0;i < finalInput.length;i++){
            inpArr.push(finalInput[i]);
        }
        for(let i = 0;i < inpArr.length;i++){
            for(let j = 0;j < operations.length;j++){
                if(inpArr[i] == operations[j]){
                    opIndex = inpArr.indexOf(inpArr[i]);
                }
            }
        }
        for(let i = 0;i < opIndex;i++){
            first += finalInput[i];
        }
        for(let i = opIndex+1;i < finalInput.length;i++){
            second += finalInput[i];
        }
        first = parseFloat(first);
        second = parseFloat(second);
        let op = finalInput[opIndex];
        switch(op){
            case '-':output.textContent = first - second;
            break;
            case '+':output.textContent = first + second;
            break;
            case '/':output.textContent = first / second;
            break;
            case '*':output.textContent = first * second;
            break;
            case '%':output.textContent = first % second;
            break;
            default:output.textContent = "Syntax error";
        }
    }
})