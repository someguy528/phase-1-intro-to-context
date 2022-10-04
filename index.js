// Your code here
let createEmployeeRecord = (employee) => {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    }    
};
let createEmployeeRecords = function(employeeData){
    return employeeData.map((employee) => createEmployeeRecord(employee))
};
let createTimeInEvent = (employee, timeIn) => {
    let [date,hour] = timeIn.split(' ')
    employee.timeInEvents.push({
        type:'TimeIn',
        hour:parseInt(hour,10),
        date,
    })
    return employee
};
let createTimeOutEvent = (employee, timeOut) => {
    let [date,hour] = timeOut.split(' ')
    employee.timeOutEvents.push({
        type:'TimeOut',
        hour:parseInt(hour,10),
        date,
    })
    return employee
}
let hoursWorkedOnDate = (employee, date) => {
    let inEvent = employee.timeInEvents.find((e) => 
    e.date === date)
    let outEvent = employee.timeOutEvents.find((e) => 
    e.date === date)
    return (outEvent.hour - inEvent.hour) / 100
}
let wagesEarnedOnDate = (employee, date) => {
    let rawWage = hoursWorkedOnDate(employee,date) * employee.payPerHour;
    return parseFloat(rawWage.toString()) 
}
let allWagesFor = (employee) => {
    let dates = employee.timeInEvents.map((e) => e.date);
    let allWages = dates.reduce((start, day) => {return start + wagesEarnedOnDate(employee, day)} , 0)
    return allWages
}
let calculatePayroll = (employees) => {
    return employees.reduce((total, employee) => {return total + allWagesFor(employee)},0)
}