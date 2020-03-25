let date = new Date()
const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']

console.log(`${dayName[date.getDay()]}, ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
console.log(`${dayName[date.getDay()]}, ${date.getDate()}`)
console.log(`${date.getHours()}:${date.getMinutes()}`)