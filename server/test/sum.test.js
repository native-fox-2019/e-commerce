function sum(num1,num2){
    return num1+num2;
}

test('add 1 plus 2 equals 3',()=>{
    expect(sum(1,2)).toBe(3);
})

describe('Bacoba sum',()=>{
    it('should work',()=>{
        expect(sum(5,6)).toBe(11);
    })

    it('should work too',()=>{
        expect(sum(5,10)).toBe(15);
    })
})