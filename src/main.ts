function mainHandler() {
    console.log('ssss');
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
    traversationResult?.forEach(f=> console.log(f.join(',')));
}

function traverseFind(searchInput: string[], objectToTraverse: any, rootObject?: any, resultMap?: Map<string, string[]>) {
    const traverseResult = resultMap ?? new Map<string, string[]>();
    if(!searchInput.length) {
        throw Error('Empty query string');
    }
    for (const propertyName in objectToTraverse) {
        console.log(` Prop: ${propertyName}: ${objectToTraverse.hasOwnProperty(propertyName)}`);
        const isPropTraversable = isTraversable(objectToTraverse);
        if(searchInput.includes(propertyName)){
            console.log(` Found`);
            const valuesByProperty = traverseResult.get(propertyName) || [];
            const foundedValue = objectToTraverse[propertyName];

            const propValueForResult = isPropTraversable ? JSON.stringify(foundedValue) : String(foundedValue);

            valuesByProperty.push(propValueForResult);
            traverseResult.set(propertyName, valuesByProperty);
        }
        if(isPropTraversable) {
            const result = traverseFind(searchInput, objectToTraverse[propertyName], rootObject ?? objectToTraverse, resultMap );
            result?.forEach((value, key) => {
                console.log(`key add`);
                const r = resultMap?.get(key) || [];
                r.push(...value);
                resultMap?.set(key,r);
            });
        }
    }
    if(!rootObject) resultMap?.forEach(f=> console.log(`Trav result:${f.join(',')}`));
    return resultMap;
}

function isTraversable(objectToTraverseCheck: any) {
    return objectToTraverseCheck instanceof Object || objectToTraverseCheck instanceof Array;
}

mainHandler();