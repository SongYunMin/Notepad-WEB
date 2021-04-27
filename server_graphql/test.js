async function test(){
    setTimeout(()=>{
        console.log('실행됨')
    }, 1000)

    let test = 1;

    await new Promise(resolve => {
        setTimeout(resolve,2000)
    })
    console.log("끝이 남");
    console.log(test);
}

test();