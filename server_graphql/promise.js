function setTimeFunction(){
    console.log(new Error().stack, '1초')
    setTimeout(() => {console.log('1초짜리'), 1000})
}

async function asyncFunction(){
    console.log(new Error().stack, '2초 시작')
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('2초짜리')
    console.log(new Error().stack, '2초 종료')
}

async function run(){
    console.log(new Error().stack, 'run')
    setTimeFunction();
    await asyncFunction();
}

run();