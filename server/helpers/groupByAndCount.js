module.exports = (ArrOfObj) => {
    let code = []
    let date = []
    let count = []
    for (let i = 0; i < ArrOfObj.length; i++) {
        let flag = true
        for (let j = 0; j < code.length; j++) {
            if (ArrOfObj[i].code == code[j]) {
                flag = false
                break
            }
        }
        if (flag) {
            code.push(ArrOfObj[i].code)
            date.push(ArrOfObj[i].createdAt)
        }
    }

    for (let i = 0; i < code.length; i++) {
        let count_temp = 0
        for (let j = 0; j < ArrOfObj.length; j++) {
            if (ArrOfObj[j].code == code[i]) {
                count_temp++
            }
        }
        count.push(count_temp)
    }

    return [code, count, date]
}