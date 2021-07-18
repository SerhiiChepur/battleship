"use strict";
function mainHandler() {
    /*console.log('ssss');
    const testO = {
        personName: "Serhii",
        division: {
            divisionName: "Some div lvl 1"
        },
        rootDivision :{
            closedDivisions: [{
                location: 'uk'
            }],
        }
    };
    const traversationResult = traverseFind(['divisionName', 'location'], testO);
    console.log(traversationResult);
    traversationResult?.forEach(f=> console.log(f.join(',')));*/
    var f = function () {
        console.log(1);
    };
    var execute = function (f) {
        setTimeout(f, 5000);
    };
    execute(f); // что выведет в консоль и почему
    f = function () {
        console.log(2);
    };
    execute(f); // что выведет в консоль и почему
}
function traverseFind(searchInput, objectToTraverse, rootObject, resultMap) {
    const traverseResult = resultMap !== null && resultMap !== void 0 ? resultMap : new Map();
    if (!searchInput.length) {
        throw Error('Empty query string');
    }
    for (const propertyName in objectToTraverse) {
        console.log(` Prop: ${propertyName}: ${objectToTraverse.hasOwnProperty(propertyName)}`);
        const isPropTraversable = isTraversable(objectToTraverse);
        if (searchInput.includes(propertyName)) {
            console.log(` Found`);
            const valuesByProperty = traverseResult.get(propertyName) || [];
            const foundedValue = objectToTraverse[propertyName];
            const propValueForResult = isPropTraversable ? JSON.stringify(foundedValue) : String(foundedValue);
            valuesByProperty.push(propValueForResult);
            traverseResult.set(propertyName, valuesByProperty);
        }
        if (isPropTraversable) {
            const result = traverseFind(searchInput, objectToTraverse[propertyName], rootObject !== null && rootObject !== void 0 ? rootObject : objectToTraverse, resultMap);
            result === null || result === void 0 ? void 0 : result.forEach((value, key) => {
                console.log(`key add`);
                const r = (resultMap === null || resultMap === void 0 ? void 0 : resultMap.get(key)) || [];
                r.push(...value);
                resultMap === null || resultMap === void 0 ? void 0 : resultMap.set(key, r);
            });
        }
    }
    if (!rootObject)
        resultMap === null || resultMap === void 0 ? void 0 : resultMap.forEach(f => console.log(`Trav result:${f.join(',')}`));
    return resultMap;
}
function isTraversable(objectToTraverseCheck) {
    return objectToTraverseCheck instanceof Object || objectToTraverseCheck instanceof Array;
}
mainHandler();
//# sourceMappingURL=main.js.map