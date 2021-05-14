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

// run()

function test_ () {
    var a = 5;

    const instance = new test();
    const dbConnectionInfo = instance.useDatabase();
    dbConnectionInfo.셀렉트, 인설트

}

class test {
    #connection
    constructor() {
        this.#num = 5;
        this.dbConn();
        this.loadDatabase();
    }

    useDatabase(){
        return this.#connection
    }

    // 데이터베이스 로드
    loadDatabase(){
        this.#connection = this.dbConn();
    }

    // 데이터베이스 연결
    dbConn(){
        // DB 연결 코드
        return true;
    }

    getConnection(){return this.#num};
}